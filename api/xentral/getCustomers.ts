import { fetchXentral } from './fetchXentral';

export type CustomerFilter = {
  key: string;
  op: 'contains' | 'equals' | 'notEquals';
  value: string;
};

export type CustomerOrder = {
  field: string;
  direction: 'asc' | 'desc';
};

export const getCustomers = async ({
  pageNumber = 1,
  pageSize = 20,
  ...other
}: {
  pageNumber: number;
  pageSize: number;
  filter?: CustomerFilter;
  order?: CustomerOrder;
}) => {
  let endPoint = `/customers?page[number]=${pageNumber}&page[size]=${pageSize}`;

  if (other?.filter && other?.filter?.key && other?.filter?.op && other?.filter?.value) {
    const { key, op, value } = other.filter;
    endPoint = `${endPoint}&filter[0][key]=${key}&filter[0][op]=${op}&filter[0][value]=${value}`;
  }
  if (other?.order && other?.order?.field && other?.order?.direction) {
    const { field, direction } = other.order;
    endPoint = `${endPoint}&order[0][field]=${field}&order[0][dir]=${direction}`;
  }
  console.log('EXECUTED GET CUSTOMER ENDPOINT: ', endPoint);

  // filter[0][key]=name&filter[0][op]=contains&filter[0][value]=ss
  // &order[0][field]=name&order[0][dir]=asc
  return await fetchXentral(endPoint);
};
