import { fetchXentral } from './fetchXentral';

export const getCustomers = async ({ pageNumber = 1, pageSize = 20 }) => {
  const endPoint = `/customers?page[number]=${pageNumber}&page[size]=${pageSize}`;
  console.log('this is the page number', { endPoint });

  return await fetchXentral(`/customers?page[number]=${pageNumber}&page[size]=${pageSize}`);
};
