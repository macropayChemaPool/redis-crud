import { RedisCacheHandler } from "@/classes/utils/redis-cache-handler";
import type { NextApiRequest, NextApiResponse } from "next";

const postUser = async (
  req: NextApiRequest,
  res: NextApiResponse<{ code: number; message: string }>
) => {
  const redisClient = new RedisCacheHandler();

  console.log(req.body);

  try {
    redisClient.setRedisState({
      idApi: "USERS",
      idData: "USER001",
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
