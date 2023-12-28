import { createClient } from "redis";
import { EncryptionHandler } from "./utils/encryption-handler";

interface ISetRedisStateParams {
  key: string | Buffer;
  body: number | string | Buffer;
}

export class RedisCache extends EncryptionHandler {
  private readonly REDIS_HOST = process.env.REDIS_HOST;
  private readonly REDIS_PORT = process.env.REDIS_PORT;

  private initClient = createClient({
    socket: {
      host: this.REDIS_HOST,
      port: this.REDIS_PORT,
    },
  });

  constructor() {
    super()
    this.initClient.connect();
  }

  public async getRedisState(key: string) {
    console.log("get Redis");
    
    const SHA = this.generateSHA(key)
    const f = await this.initClient.get(SHA);
    if (f === null) return
    const d = await this.decrypt(f)
    return d;
  }

  public async setRedisState({ key, body }: ISetRedisStateParams) {
    console.log("set Redis");
    const SHA = this.generateSHA(key.toString())
    const encryptBody = await this.encrypt(body)
    return this.initClient.set(SHA, encryptBody, { EX: 60 });
    
  }
}
