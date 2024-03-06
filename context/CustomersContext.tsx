import React, { Dispatch, SetStateAction } from 'react';
import { CustomerFilter, CustomerOrder, getCustomers } from '~/api/xentral';
import { XentralCustomer } from '~/types';

type CustomersContextValue = {
  customers: XentralCustomer[];
  nameFilter: string;
  setNameFilter: Dispatch<SetStateAction<string>>;
  setCustomers: Dispatch<SetStateAction<XentralCustomer[]>>;
  fetchNextPage: () => Promise<void>;
  page: number;
};

const CustomerContext = React.createContext<CustomersContextValue>({
  customers: [],
  nameFilter: '',
  setNameFilter: () => null,
  setCustomers: () => null,
  fetchNextPage: async () => {},
  page: 0
});

const PAGE_SIZE = 14;

export const ExistingCustomerContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [customers, setCustomers] = React.useState<XentralCustomer[]>([]);
  const [nameFilter, setNameFilter] = React.useState('');
  const [page, setPage] = React.useState(0);
  const [isLast, setIsLast] = React.useState(false);

  const filterValue: CustomerFilter = {
    key: 'name',
    op: 'contains',
    value: nameFilter
  };

  const orderValue: CustomerOrder = {
    field: 'name',
    direction: 'asc'
  };

  // ? reset the page to 1 when name filter change
  React.useEffect(() => {
    const fetchCustomer = async () => {
      const newCustomer = await getCustomers({
        pageNumber: 1,
        pageSize: PAGE_SIZE,
        filter: filterValue,
        order: orderValue
      });
      setCustomers(newCustomer?.data);

      if (newCustomer?.data?.length && newCustomer?.data?.length < PAGE_SIZE) {
        setIsLast(true);
      } else {
        setIsLast(false);
      }
      setPage(1);
    };

    fetchCustomer();
  }, [nameFilter]);

  const fetchNextPage = async () => {
    if (isLast || page === 0) return;
    const nextPageCustomers = await getCustomers({
      pageNumber: page + 1,
      pageSize: PAGE_SIZE,
      filter: filterValue,
      order: orderValue
    });
    // if (nextPageCustomers?.data?.length > 0) {
    setCustomers((state) => [...state, ...nextPageCustomers?.data]);
    setPage((state) => state + 1);
    // }
    if (nextPageCustomers?.data?.length && nextPageCustomers?.data?.length < PAGE_SIZE) {
      console.log('from trigger true');

      setIsLast(true);
    }
  };

  return (
    <CustomerContext.Provider
      value={{
        customers,
        nameFilter,
        setCustomers,
        setNameFilter,
        fetchNextPage,
        page
      }}>
      {children}
    </CustomerContext.Provider>
  );
};

export const useCustomerContext = () => React.useContext(CustomerContext);
