export type XentralCustomer = {
  id: string;
  type: string;
  general: {
    number: string;
    title: string;
    name: string;
    birthday: string;
    email: string;
    phone: string;
    address: {
      street: string;
      zip: string;
      city: string;
      state: string;
      country: string;
      note: string;
    };
  };
  tags: any[];
};
