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
