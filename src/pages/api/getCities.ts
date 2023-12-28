import { RedisCache } from "@/classes/redis.example";
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
  const redisClient = new RedisCache();

  try {
    const redisReply = await redisClient.getRedisState("cities");
    if (redisReply) {
      return res.json(JSON.parse(redisReply));
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

    redisClient.setRedisState({
      key: "cities",
      body: cities,
    });

    return res.status(200).json(cities);
  } catch (error: any) {
    console.log(error);
    return res.status(400).json([]);
  }
};

export default getCities;
