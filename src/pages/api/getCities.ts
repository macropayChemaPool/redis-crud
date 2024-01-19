import { BaseService } from "@/classes/base-service";
import { ICity, ISelectOptions } from "@/interfaces";
import serviceGetCities from "@/services/back/serviceGetCities";
import type { NextApiRequest, NextApiResponse } from "next";

const getCities = async (
  req: NextApiRequest,
  res: NextApiResponse<ICity[] | ISelectOptions[] | []>
) => {
  try {
    const cookieKey = `cities`;
    /** @type {*}
     * redisKey is the value on your cookie
     */
    const redisKey = req.cookies[cookieKey] ?? "";
    const service = async () => {
      const { entities } = await serviceGetCities(req);

      const cities = entities?.map((item: ICity) => ({
        value: item?.id,
        label: item?.name,
      }));
      return cities;
    };

    const baseService = new BaseService(service);
    const { entities: cities, sha } = await baseService.getEntity(redisKey);
    console.log(sha);
    res.setHeader("Set-Cookie", `${cookieKey}=${sha}`);

    return res.status(200).json(cities);
  } catch (error: any) {
    console.log(error);
    return res.status(400).json([]);
  }
};

export default getCities;
