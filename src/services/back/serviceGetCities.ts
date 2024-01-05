import { ICity } from "@/interfaces";
import { beRequest } from "@/utils/apiRequest/beRequest";
import type { NextApiRequest } from "next";

const serviceGetCities = async (req: NextApiRequest) => {
  const { data } = await beRequest<{
    cursor: string;
    empty: boolean;
    entities: ICity[];
  }>(
    "https://sepomex-sahfer.wl.r.appspot.com/api/municipios",
    "GET",
    undefined
  );

  return data;
};

export default serviceGetCities;
