import { RedisCache } from "./redis.example";

export class BaseController extends RedisCache {
  onInit() {
    console.log("Method to init")
  }
}
