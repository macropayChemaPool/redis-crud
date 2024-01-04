import { RedisCacheHandler } from "@/classes/utils/redis-cache-handler";
import { ICity } from "@/interfaces";
import serviceGetCities from "@/services/back/serviceGetCities";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

const postUser = async (
  req: NextApiRequest,
  res: NextApiResponse<{ code: number; message: string }>
) => {
  const redisClient = new RedisCacheHandler();

  console.log(req.body);

  try {
    // const redisReply = await redisClient.getRedisState("cities");
    // if (redisReply) {
    //   return res.json(redisReply as ICity[]);
    // }

    // const apiResponse = await axios.get(
    //   "https://sepomex-sahfer.wl.r.appspot.com/api/municipios"
    // );

    // const { entities } = await serviceGetCities(req);
    // console.log(entities);

    // const cities = apiResponse?.data?.entities?.map((item: ICity) => ({
    //   value: item?.id,
    //   label: item?.name,
    // }));

    redisClient.setRedisState({
      // key: "users",
      body: req.body,
    });

    return res.status(200).json({
      code: 200,
      message: "User saved",
    });
  } catch (error: any) {
    console.log(error);
    return res.status(400).json({
      code: 400,
      message: "Error to save",
    });
  }
};

export default postUser;
