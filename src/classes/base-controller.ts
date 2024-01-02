import { RedisCacheHandler } from "./utils/redis-cache-handler";

export class BaseController extends RedisCacheHandler<string> {
  onInit() {
    console.log("Method to init")
  }
}
