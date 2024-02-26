import { fetchXentral } from './fetchXentral';

export const getCustomers = async ({
  pageNumber = 1,
  pageSize = 20,
  ...other
}: {
  pageNumber: number;
  pageSize: number;
  filter?: {
    key: string;
    op: 'contains' | 'equals' | 'notEquals';
    value: string;
  };
}) => {
  let endPoint = `/customers?page[number]=${pageNumber}&page[size]=${pageSize}`;

  if (other?.filter && other?.filter?.key && other?.filter?.op && other?.filter?.value) {
    const { key, op, value } = other.filter;
    endPoint = `${endPoint}&filter[0][key]=${key}&filter[0][op]=${op}&filter[0][value]=${value}`;
  }
  console.log('this is the endpoint', endPoint);

  // filter[0][key]=name&filter[0][op]=contains&filter[0][value]=ss
  return await fetchXentral(endPoint);
};
