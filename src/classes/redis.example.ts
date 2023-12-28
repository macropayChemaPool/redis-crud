import { createClient } from "redis";

interface ISetRedisStateParams {
  key: string | Buffer;
  body: number | string | Buffer;
}

export class RedisCache {
  private readonly REDIS_HOST = process.env.REDIS_HOST;
  private readonly REDIS_PORT = process.env.REDIS_PORT;

  private initClient = createClient({
    socket: {
      host: this.REDIS_HOST,
      port: this.REDIS_PORT,
    },
  });

  public getRedisState(key: string) {
    console.log("get Redis");
    this.initClient.connect();
    return this.initClient.get(key);
  }

  public setRedisState({ key, body }: ISetRedisStateParams) {
    console.log("set Redis");
    this.initClient.connect();
    return this.initClient.set(key, JSON.stringify(body), { EX: 60 });
  }
}
