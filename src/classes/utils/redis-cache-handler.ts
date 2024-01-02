import { createClient } from 'redis';
import { EncryptionHandler } from './encryption-handler';

type RedisCacheKey = string;

interface ISetRedisStateParams {
  key: RedisCacheKey;
  body: number | string;
}

interface IRedisSubNodeData<T> {
  [x: string]: T | unknown
}

export class RedisCacheHandler<T> extends EncryptionHandler {
  private readonly REDIS_HOST = process.env.REDIS_HOST;
  private readonly REDIS_PORT = process.env.REDIS_PORT;

  private readonly initClient = createClient({
    socket: {
      host: this.REDIS_HOST,
      port: this.REDIS_PORT,
    },
  });

  constructor() {
    super();
    this.initClient.connect();
  }

  private getRootNode(key: RedisCacheKey) {
    return this.initClient.get(key);
  }

  private getSHA() {
    const SHA = "53f25148803d5a4f7fc46a7094a4bb787db5751299eb3f201d7a95d0f6d7b55b"
    return SHA;
  }

  private jsonParse(value: string | null): IRedisSubNodeData<T> {
    try {
      const parsed = JSON.parse(value ?? '')
      return parsed;
    } catch (error) {
      return {}
    }
  }

  private async getEntryPoint() {
    try {
      const SHA = this.getSHA();
      const entryPoint = await this.getRootNode(SHA);
      return this.jsonParse(entryPoint);
    } catch (error) {
      throw new Error('Not found entry point');
    }
  }

  private setEntryPoint(nodes: IRedisSubNodeData<T>) {
    const SHA = this.getSHA();
    const value = JSON.stringify(nodes)
    this.initClient.set(SHA, value, { EX: 60 * 60 })
  }

  private getSubNode(key: RedisCacheKey, entryPoint: IRedisSubNodeData<T>) {
    if (!(key in entryPoint)) return null;
    return entryPoint[key] as T;
  }

  private setSubNode(key: RedisCacheKey, entryPoint: IRedisSubNodeData<T>, body: number | string) {
    if (!(key in entryPoint)) {
      entryPoint[key] = body
    }
    return entryPoint;
  }

  public async getRedisState(key: RedisCacheKey) {
    const entryPoint = await this.getEntryPoint();
    const node = this.getSubNode(key, entryPoint);
    return node;
  }

  public async setRedisState({ key, body }: ISetRedisStateParams) {
    const entryPoint = await this.getEntryPoint();
    // const encryptBody = await this.encrypt(body);
    const nodes = this.setSubNode(key, entryPoint, body);
    this.setEntryPoint(nodes)
  }
}
