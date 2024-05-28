import { useFetchBc } from './fetchBc';

export const useBcCompanies = () => {
  return useFetchBc({
    queryKey: ['bc-companies'],
    fetchProps: {
      endPoint: '/companies'
    }
  });
};
