import { useFetchBc } from './useFetchBc';
import { BcItem } from './types/item';

export const useBcItems = () => {
  return useFetchBc<BcItemHookResponse>({
    queryKey: ['bc-items'],
    fetchProps: {
      endPoint: `/companies(${process.env.EXPO_PUBLIC_BC_COMPANY_ID})/items`
    }
  });
};

type BcItemHookResponse = {
  value: BcItem[];
};
