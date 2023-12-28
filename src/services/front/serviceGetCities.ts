import { feRequest } from "@/utils/apiRequest/feRequest";

interface ICity {
  createdOn: string;
  entity_id: string;
  entity_key: string;
  id: string;
  key: string;
  name: string;
  updatedOn: string;
}

const serviceGetCities = async () => {
  const { data } = await feRequest<ICity[]>("/getCities", "POST");

  return data;
};

export default serviceGetCities;
