import { BaseService } from "@/classes/base-service";
import { ICity, ISelectOptions } from "@/interfaces";
import serviceGetCities from "@/services/back/serviceGetCities";
import type { NextApiRequest, NextApiResponse } from "next";

const getCities = async (
  req: NextApiRequest,
  res: NextApiResponse<ICity[] | ISelectOptions[] | []>
) => {
  const id_api = "API-MP-000";
  const id_data = "USER001";
  try {
    const service = async () => {
      const { entities } = await serviceGetCities(req);

      const cities = entities?.map((item: ICity) => ({
        value: item?.id,
        label: item?.name,
      }));
      return cities;
    };

    const baseService = new BaseService({
      idApi: id_api,
      idData: id_data,
      service,
    });
    const { entities: cities, sha } = await baseService.getEntity();
    console.log(cities);
    console.log(sha);

    return res.status(200).json(cities);
  } catch (error: any) {
    console.log(error);
    return res.status(400).json([]);
  }
};

export default getCities;
