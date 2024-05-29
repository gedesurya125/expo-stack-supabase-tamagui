import { useFetchBc } from './useFetchBc';
import { BcItem } from './types/item';

export const useBcSingleItem = ({ itemId }: { itemId: string }) => {
  return useFetchBc<BcItemHookResponse>({
    queryKey: ['bc-item', itemId],
    fetchProps: {
      endPoint: `/companies(${process.env.EXPO_PUBLIC_BC_COMPANY_ID})/items(${itemId})?$select=Picture`
    }
  });
};

type BcItemHookResponse = {
  value: BcItem;
};
