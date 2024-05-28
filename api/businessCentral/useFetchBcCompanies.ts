import { useFetchBc } from './fetchBc';

export const useFetchBcCompanies = () => {
  return useFetchBc({
    queryKey: ['bc-companies'],
    fetchProps: {
      endPoint: '/companies'
    }
  });
};
