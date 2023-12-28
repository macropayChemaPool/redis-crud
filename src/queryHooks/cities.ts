import serviceGetCities from "@/services/front/serviceGetCities";
import { useQuery } from "@tanstack/react-query";

export const useCities = <TRes>() => {
  const result = useQuery({
    queryKey: ["useCampaigns"],
    queryFn: serviceGetCities,
  });
  return {
    isLoadingCities: result?.isPending,
    cities: result?.data ?? [],
  };
};
