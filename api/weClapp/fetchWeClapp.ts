const defaultHeader = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  AuthenticationToken: process.env.EXPO_PUBLIC_WE_CLAPP_API_TOKEN || ''
};

const fetchWeClapp = async <T>(endPoint: string, options: RequestInit): Promise<T> => {
  return await fetch(`${process.env.EXPO_PUBLIC_WE_CLAPP_API_BASE_URL}${endPoint}`, {
    headers: {
      ...defaultHeader
    },
    ...options
  })
    .then((response) => response?.json())
    .catch((err: any) => {
      console.log('error fetching weclap', err);
    });
};

export const weClappAPI = {
  GET: async <T>(endPoint: string, options?: RequestInit): Promise<T> =>
    await fetchWeClapp(endPoint, { method: 'GET', ...options }),
  POST: async <T>(endPoint: string, options: RequestInit): Promise<T> =>
    await fetchWeClapp(endPoint, { method: 'POST', ...options }),
  PUT: async <T>(endPoint: string, options: RequestInit): Promise<T> =>
    await fetchWeClapp(endPoint, { method: 'PUT', ...options }),
  DELETE: async <T>(endPoint: string, options: RequestInit): Promise<T> =>
    await fetchWeClapp(endPoint, { method: 'DELETE', ...options })
};
