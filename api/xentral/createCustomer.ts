import { createXentral } from './fetchXentral';

export type CompanyGeneralInformation = {
  name: string;
  address: {
    street: string;
    zip: string;
    city: string;
    state?: string;
    country: string;
    note: string;
  };
};

export type GeneralInformation = {
  title?: string;
  name: string;
  birthday?: string;
  address: {
    street: string;
    zip: string;
    city: string;
    state?: string;
    country: string;
    note: string;
  };
};

export type CreateCustomerBody = {
  type: 'company' | 'person';
  general: GeneralInformation;
  contact: {
    phone?: string;
    fax?: string;
    mobile?: string;
    email: string;
    website?: string;
    marketingMails?: boolean;
    trackingMails?: boolean;
  };
};

export const createCustomer = async (data: CreateCustomerBody) => {
  let dataToSend = data;

  if (data.type === 'company') {
    delete dataToSend.general.title;
    delete dataToSend.general.birthday;
  }
  if (dataToSend.type === 'person') {
    const birthday = new Date(dataToSend?.general?.birthday as string);
    const validBirthDayDate = `${birthday.getFullYear()}-${birthday.getMonth() + 1}-${birthday.getDate()}`;
    dataToSend = {
      ...data,
      general: {
        ...data?.general,
        birthday: validBirthDayDate
      }
    };
  }

  console.log('CREATE CUSTOMER DATA TO SEND:', JSON.stringify(dataToSend));

  const result = await createXentral('/customers', JSON.stringify(dataToSend));
  return result;
};
