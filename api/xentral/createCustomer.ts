import { createXentral } from './fetchXentral';

export type CreateCustomerBody = {
  type: 'company' | 'person';
  general: {
    title?: string | null;
    name: string;
    birthday?: string;
    address: {
      street: string;
      zip: string;
      city: string;
      state: string | null;
      country: string;
      note: string;
    };
  };
  contact: {
    phone?: string | null;
    fax?: string | null;
    mobile?: string | null;
    email: string;
    website?: string | null;
    marketingMails?: boolean;
  };
};

export const createCustomer = async (data: CreateCustomerBody) => {
  const result = await createXentral('/customers', JSON.stringify(data));
  return result;
};
