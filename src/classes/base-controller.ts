import { RedisCacheHandler } from "./utils/redis-cache-handler";

export class BaseController {
  private readonly redisCacheHandler = new RedisCacheHandler()
  onInit() {
    console.log("Method to init")
  }
}
