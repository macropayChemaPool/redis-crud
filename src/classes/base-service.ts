import { RedisCacheHandler } from "./utils/redis-cache-handler";

type ServiceWithoutParams<T> = () => Promise<T>;

type ServiceFunction<T, S> = ServiceWithoutParams<T>;

interface IReturnEntity<T> {
  sha: string;
  entities: T;
}

export class BaseService<T, S = unknown> {
  private readonly redisCacheHandler = new RedisCacheHandler<T>();

  constructor(
    private settings: {
      idApi: string;
      idData: string;
      service: ServiceFunction<T, S>;
      encrypted?: boolean;
    }
  ) {}

  async getEntity(): Promise<IReturnEntity<T>> {
    const { idApi, idData } = this.settings;
    try {
      await this.redisCacheHandler.statusHost();
      const { sha, data } = await this.redisCacheHandler.getRedisState<T>(
        idApi,
        idData
      );
      if (data) {
        return {
          sha,
          entities: data,
        };
      }

      const entities = await this.settings.service();
      const REDIS_KEY = await this.redisCacheHandler.setRedisState({
        idApi: this.settings.idApi,
        idData: this.settings.idData,
        body: entities,
        encrypted: this.settings.encrypted,
      });

      return {
        sha: REDIS_KEY,
        entities,
      };
    } catch (error) {
      const entities = await this.settings.service();
      this.redisCacheHandler.killRedis();

      return {
        sha: "",
        entities,
      };
    }
  }
}
