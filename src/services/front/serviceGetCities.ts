import { ICity } from "@/interfaces";
import { feRequest } from "@/utils/apiRequest/feRequest";

const serviceGetCities = async () => {
  const { data } = await feRequest<ICity[]>("/getCities", "GET");

  return data;
};

export default serviceGetCities;
