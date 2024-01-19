// import type { NextApiRequest } from 'next';
import { RedisCacheHandler } from "./utils/redis-cache-handler";

type ServiceWithoutParams<T> = () => Promise<T>;
// type ServiceWithRequest<T> = (req: NextApiRequest) => Promise<T>;
// type ServiceWithRequestParams<T, S> = (
//   req: NextApiRequest,
//   params?: S
// ) => Promise<T>;

type ServiceFunction<T, S> = ServiceWithoutParams<T>;
// | ServiceWithRequestParams<T, S>
// | ServiceWithRequest<T>;

interface IReturnEntity<T> {
  /**
   * sha (`SHA`) response is the key to set on your cookies
   *
   * ***Example***
   * ```js
   * res.setHeader("Set-Cookie",`${YOUR_KEY}=${REDIS_KEY}; Secure; HttpOnly; SameSite=Lax; path=/`)
   * ```
   */
  sha: string;
  entities: T;
}

export class BaseService<T, S = unknown> {
  private readonly redisCacheHandler = new RedisCacheHandler<T>();

  constructor(private service: ServiceFunction<T, S>) {}

  async getEntity(key: string): Promise<IReturnEntity<T>> {
    try {
      await this.redisCacheHandler.statusHost();
      const reply = await this.redisCacheHandler.getRedisState<T>(key);
      if (reply) {
        return {
          sha: key,
          entities: reply,
        };
      }

      const entities = await this.service();
      const REDIS_KEY = await this.redisCacheHandler.setRedisState({
        body: entities,
      });

      return {
        sha: REDIS_KEY,
        entities,
      };
    } catch (error) {
      const entities = await this.service();
      this.redisCacheHandler.killRedis();

      return {
        sha: "",
        entities,
      };
    }
  }
}
