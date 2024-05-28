import React from 'react';
import { useBcToken } from '../fetchBcToken';

type BusinessCentralContextValue = {
  token?: string;
};

const BusinessCentralContext = React.createContext<BusinessCentralContextValue>({ token: '' });

export const useBusinessCentralContext = () => React.useContext(BusinessCentralContext);

export const BusinessCentralContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { data } = useBcToken();

  return (
    <BusinessCentralContext.Provider
      value={{
        token: data?.access_token
      }}>
      {children}
    </BusinessCentralContext.Provider>
  );
};
