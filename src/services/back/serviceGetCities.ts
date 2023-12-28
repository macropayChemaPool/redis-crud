import { beRequest } from "@/utils/apiRequest/beRequest";
import type { NextApiRequest } from "next";
// import { API_URL_BACK } from "src/constants/enviroments";
// import { beRequest } from "src/utils/apiRequest/beRequest";
// import { getCustomHeaders } from "src/utils/apiRequest/getCustomHeaders";

const serviceGetCities = async (req: NextApiRequest) => {
  //   const headers = await getCustomHeaders(req);

  const { data } = await beRequest<{
    cursor: string;
    empty: boolean;
    entities: [];
  }>(
    "https://sepomex-sahfer.wl.r.appspot.com/api/municipios",
    "GET",
    undefined
    // headers
  );

  console.log(data);
  return data;
};

export default serviceGetCities;
