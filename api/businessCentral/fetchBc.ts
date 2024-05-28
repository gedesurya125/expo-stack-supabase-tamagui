import { useQuery } from '@tanstack/react-query';

import { useBusinessCentralContext } from './context/BusinessCentralContext';

interface FetchBcProps {
  token?: string;
  endPoint?: string;
  options?: RequestInit;
}

export const fetchBc = async <T>(props: FetchBcProps): Promise<T | null> => {
  if (!props?.token) {
    console.log('token not exist');
    return null;
  }

  const BASE_API_URL = process.env.EXPO_PUBLIC_BC_BASE_API_URL;
  const TENANT_ID = process.env.EXPO_PUBLIC_TENANT_ID;
  const ENVIRONMENT = process.env.EXPO_PUBLIC_BUSINESS_CENTRAL_ENVIRONMENT;

  const apiUrl = `${BASE_API_URL}/${TENANT_ID}/${ENVIRONMENT}/api/v2.0${props?.endPoint || ''}`;

  const response = await fetch(apiUrl, {
    ...props.options,
    // ? below act as default value
    method: props?.options?.method || 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${props.token}`,
      ...props?.options?.headers
    }
  })
    .then((res) => res?.json())
    .catch((err) => {
      console.log('Error when fetching Business Central', err, props, apiUrl);
    });

  return response || null;
};

type FetchBcHookProps = {
  queryKey: string[];
  fetchProps: Omit<FetchBcProps, 'token'>;
};

export const useFetchBc = <TData>(props: FetchBcHookProps) => {
  const { token } = useBusinessCentralContext();

  const { queryKey } = props;
  return useQuery({
    queryKey,
    queryFn: async () =>
      await fetchBc<TData>({
        token,
        ...props.fetchProps
      })
  });
};
