import type { NextApiRequest, NextApiResponse } from "next";

const controller = async (
  req: NextApiRequest,
  res: NextApiResponse<any[] | []>
) => {
  try {
    return res.status(200).json([]);
  } catch (error: any) {
    console.log(error);
    return res.status(400).json([]);
  }
};

export default controller;
