import { RedisCacheHandler } from "@/classes/utils/redis-cache-handler";
import { ICity, ISelectOptions } from "@/interfaces";
import serviceGetCities from "@/services/back/serviceGetCities";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

const getCities = async (
  req: NextApiRequest,
  res: NextApiResponse<ICity[] | ISelectOptions[] | []>
) => {
  const redisClient = new RedisCacheHandler();

  /** @type {*}
   * redisKey is the value on your cookie
   */
  const redisKey =
    "75f9b0d71bba7461ca9b5997d7b5e2846129ee2020dc55820bac1b14855db395";
  try {
    const redisReply = await redisClient.getRedisState<ICity[]>(redisKey);
    if (redisReply) {
      return res.json(redisReply);
    }

    // const apiResponse = await axios.get(
    //   "https://sepomex-sahfer.wl.r.appspot.com/api/municipios"
    // );

    const { entities } = await serviceGetCities(req);

    const cities = entities?.map((item: ICity) => ({
      value: item?.id,
      label: item?.name,
    }));

    /** @type {*} 
     * REDIS_KEY response is the SHA to set on your cookies
     * example:
     * res.setHeader(
      "Set-Cookie",
      `${YOUR_KEY}=${REDIS_KEY}; Secure; HttpOnly; SameSite=Lax; path=/`
    )
    */
    const REDIS_KEY = await redisClient.setRedisState({
      body: cities,
    });

    return res.status(200).json(cities);
  } catch (error: any) {
    console.log(error);
    return res.status(400).json([]);
  }
};

export default getCities;
