import { createClient } from "redis";
import { EncryptionHandler } from "./encryption-handler";

interface ISetRedisStateParams<T> {
  body: T;
  encrypted?: boolean;
}

interface IRedisSubNodeData<T> {
  [x: string]: T;
}

export class RedisCacheHandler<T> extends EncryptionHandler {
  private readonly REDIS_HOST = process.env.REDIS_HOST;
  private readonly REDIS_PORT = process.env.REDIS_PORT;
  private readonly REDIS_PASS = process.env.REDIS_PASS;

  private readonly initClient = createClient({
    password: this.REDIS_PASS,
    socket: {
      host: this.REDIS_HOST,
      port: this.REDIS_PORT,
    },
  });

  constructor() {
    super();
    this.initClient.connect();
  }

  private getRootNode(key: string) {
    return this.initClient.get(key);
  }

  private async getEntryPoint(key: string) {
    try {
      const entryPoint = await this.getRootNode(key);
      return entryPoint;
    } catch (error) {
      throw new Error("Not found entry point");
    }
  }

  private setEntryPoint(key: string, data: T | string) {
    const value = typeof data === "string" ? data : JSON.stringify(data);
    this.initClient.set(key, value, { EX: 60 * 60 });
  }

  private getSubNode(key: string, entryPoint: IRedisSubNodeData<T>) {
    if (!(key in entryPoint)) return null;
    return entryPoint[key];
  }

  private setSubNode(key: string, entryPoint: IRedisSubNodeData<T>, body: T) {
    const object = { ...entryPoint };
    if (!(key in object)) {
      object[key] = body;
    }
    return object;
  }

  public async getRedisState<T>(key: string): Promise<T> {
    const entryPoint = await this.getEntryPoint(key);
    const isEncrypted = await this.isEncrypted(entryPoint);

    if (isEncrypted) {
      const result = await this.decrypt<T>(entryPoint ?? "");
      return result;
    }
    return JSON.parse(entryPoint as string) as T;
  }

  public async setRedisState({
    body,
    encrypted = false,
  }: ISetRedisStateParams<T>): Promise<string> {
    const SHA = this.generateSHA(body);
    if (encrypted) {
      const encryptBody = await this.encrypt(body);
      this.setEntryPoint(SHA, encryptBody);
      return SHA;
    }

    this.setEntryPoint(SHA, body);
    return SHA;
  }

  public async statusHost<T>(): Promise<T> {
    return new Promise((resolve, reject) => {
      this.initClient.on("error", (err) => {
        this.killRedis();
        reject(err);
      });
      this.initClient.on("connect", () => {
        resolve("success" as T);
      });
    });
  }

  public killRedis() {
    this.initClient.disconnect();
  }

  public deleteKey(key: string) {
    this.initClient.del(key);
  }
}
