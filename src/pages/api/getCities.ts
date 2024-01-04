import { RedisCacheHandler } from "@/classes/utils/redis-cache-handler";
import serviceGetCities from "@/services/back/serviceGetCities";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

interface ICity {
  createdOn: string;
  entity_id: string;
  entity_key: string;
  id: string;
  key: string;
  name: string;
  updatedOn: string;
}

const getCities = async (
  req: NextApiRequest,
  res: NextApiResponse<ICity[] | []>
) => {
  const redisClient = new RedisCacheHandler();
  const redisKey = "75f9b0d71bba7461ca9b5997d7b5e2846129ee2020dc55820bac1b14855db395";
  try {
    const redisReply = await redisClient.getRedisState<ICity[]>(redisKey);
    if (redisReply) {
      return res.json(redisReply as ICity[]);
    }

    const apiResponse = await axios.get(
      "https://sepomex-sahfer.wl.r.appspot.com/api/municipios"
    );

    // const { entities } = await serviceGetCities(req);
    // console.log(entities);

    const cities = apiResponse?.data?.entities?.map((item: ICity) => ({
      value: item?.id,
      label: item?.name,
    }));

    const REDIS_KEY = await redisClient.setRedisState({
      body: cities,
      // body: cities,
      encrypted: true,
    });

    return res.status(200).json(cities as ICity[]);
  } catch (error: any) {
    console.log(error);
    return res.status(400).json([]);
  }
};

export default getCities;
