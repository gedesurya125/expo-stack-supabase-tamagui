// TODO: THIS CONTEXT IS NOT USED ANYMORE BECAUSE WE HAVE SelectedCustomerContext
import React, { Dispatch, SetStateAction } from 'react';
import { useWeClapCustomers } from '~/api/weClapp';
import { CustomerFilter, CustomerOrder, getCustomers } from '~/api/xentral';
import { XentralCustomer } from '~/types';

type CustomersContextValue = {
  customers: XentralCustomer[];
  nameFilter: string;
  setNameFilter: Dispatch<SetStateAction<string>>;
  setCustomers: Dispatch<SetStateAction<XentralCustomer[]>>;
  fetchNextPage?: () => Promise<void>;
  clearExistingCustomer: () => void;
  page: number;
};

const CustomerContext = React.createContext<CustomersContextValue>({
  customers: [],
  nameFilter: '',
  setNameFilter: () => null,
  setCustomers: () => null,
  fetchNextPage: async () => {},
  clearExistingCustomer: () => {},
  page: 0
});

const PAGE_SIZE = 14;

export const ExistingCustomerContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [customers, setCustomers] = React.useState<XentralCustomer[]>([]);
  const [nameFilter, setNameFilter] = React.useState('');
  const [page, setPage] = React.useState(0);

  // const { data } = useWeClapCustomers();

  // const filterValue: CustomerFilter = {
  //   key: 'name',
  //   op: 'contains',
  //   value: nameFilter
  // };

  // const orderValue: CustomerOrder = {
  //   field: 'name',
  //   direction: 'asc'
  // };

  // ? reset the page to 1 when name filter change
  // React.useEffect(() => {
  //   const fetchCustomer = async () => {
  //     const newCustomer = await getCustomers({
  //       pageNumber: 1,
  //       pageSize: PAGE_SIZE,
  //       filter: filterValue,
  //       order: orderValue
  //     });
  //     if (newCustomer?.data?.length > 0) {
  //       setCustomers(newCustomer?.data);
  //       setPage(1);
  //     }
  //   };

  //   fetchCustomer();
  // }, [nameFilter]);

  // const fetchNextPage = async () => {
  //   const nextPageCustomers = await getCustomers({
  //     pageNumber: page + 1,
  //     pageSize: PAGE_SIZE,
  //     filter: filterValue,
  //     order: orderValue
  //   });
  //   if (nextPageCustomers?.data?.length > 0) {
  //     setCustomers((state) => [...state, ...nextPageCustomers?.data]);
  //     setPage((state) => state + 1);
  //   }
  // };

  const clearExistingCustomer = () => {
    setPage(0);
    setCustomers([]);
  };
  return (
    <CustomerContext.Provider
      value={{
        customers,
        nameFilter,
        setCustomers,
        setNameFilter,
        // fetchNextPage,
        clearExistingCustomer,
        page
      }}>
      {children}
    </CustomerContext.Provider>
  );
};

export const useCustomerContext = () => React.useContext(CustomerContext);

// TODO: REMOVE THIS
