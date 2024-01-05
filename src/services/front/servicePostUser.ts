import { ICity, IUserForm } from "@/interfaces";
import { feRequest } from "@/utils/apiRequest/feRequest";

const servicePostUser = async (payload: IUserForm) => {
  const { data } = await feRequest("/postUser", "POST", payload);

  return data;
};

export default servicePostUser;
