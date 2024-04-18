export type WeClappCustomer = {
  id: string;
  createdDate: number;
  lastModifiedDate: number;
  version: string;
  customAttributes: [
    {
      attributeDefinitionId: string;
      booleanValue: boolean;
      dateValue: number;
      entityId: string;
      entityReferences: [
        {
          entityId: string;
          entityName: string;
        }
      ];
      numberValue: string;
      selectedValueId: string;
      selectedValues: [
        {
          id: string;
        }
      ];
      stringValue: string;
    }
  ];
  addresses: [
    {
      id: string;
      createdDate: number;
      lastModifiedDate: number;
      version: string;
      city: string;
      company: string;
      company2: string;
      countryCode: string;
      deliveryAddress: boolean;
      firstName: string;
      globalLocationNumber: string;
      invoiceAddress: boolean;
      lastName: string;
      phoneNumber: string;
      postOfficeBoxCity: string;
      postOfficeBoxNumber: string;
      postOfficeBoxZipCode: string;
      primeAddress: boolean;
      salutation: string;
      state: string;
      street1: string;
      street2: string;
      title: string;
      titleId: string;
      zipcode: string;
    }
  ];
  birthDate: number;
  company: string;
  company2: string;
  deliveryAddressId: string;
  email: string;
  fax: string;
  firstName: string;
  invoiceAddressId: string;
  lastName: string;
  middleName: string;
  mobilePhone1: string;
  onlineAccounts: [
    {
      id: string;
      createdDate: number;
      lastModifiedDate: number;
      version: string;
      accountName: string;
      accountType: string;
      url: string;
    }
  ];
  partyType: string;
  personCompany: string;
  personDepartmentId: string;
  personRoleId: string;
  phone: string;
  primaryAddressId: string;
  salutation: string;
  tags: [string];
  title: string;
  titleId: string;
  website: string;
  commercialLanguageId: string;
  contacts: [
    {
      id: string;
      createdDate: number;
      lastModifiedDate: number;
      version: string;
      customAttributes: [
        {
          attributeDefinitionId: string;
          booleanValue: boolean;
          dateValue: number;
          entityId: string;
          entityReferences: [
            {
              entityId: string;
              entityName: string;
            }
          ];
          numberValue: string;
          selectedValueId: string;
          selectedValues: [
            {
              id: string;
            }
          ];
          stringValue: string;
        }
      ];
      addresses: [
        {
          id: string;
          createdDate: number;
          lastModifiedDate: number;
          version: string;
          city: string;
          company: string;
          company2: string;
          countryCode: string;
          deliveryAddress: boolean;
          firstName: string;
          globalLocationNumber: string;
          invoiceAddress: boolean;
          lastName: string;
          phoneNumber: string;
          postOfficeBoxCity: string;
          postOfficeBoxNumber: string;
          postOfficeBoxZipCode: string;
          primeAddress: boolean;
          salutation: string;
          state: string;
          street1: string;
          street2: string;
          title: string;
          titleId: string;
          zipcode: string;
        }
      ];
      birthDate: number;
      company: string;
      company2: string;
      deliveryAddressId: string;
      email: string;
      fax: string;
      firstName: string;
      invoiceAddressId: string;
      lastName: string;
      middleName: string;
      mobilePhone1: string;
      onlineAccounts: [
        {
          id: string;
          createdDate: number;
          lastModifiedDate: number;
          version: string;
          accountName: string;
          accountType: string;
          url: string;
        }
      ];
      partyType: string;
      personCompany: string;
      personDepartmentId: string;
      personRoleId: string;
      phone: string;
      primaryAddressId: string;
      salutation: string;
      tags: [string];
      title: string;
      titleId: string;
      website: string;
      customerCategoryId: string;
      customerCategoryName: string;
      description: string;
      fixPhone2: string;
      mobilePhone2: string;
      optIn: boolean;
      optInLetter: boolean;
      optInPhone: boolean;
      optInSms: boolean;
      phoneHome: string;
    }
  ];
  currencyId: string;
  currencyName: string;
  primaryContactId: string;
  sectorId: string;
  sectorName: string;
  annualRevenue: string;
  companySizeId: string;
  companySizeName: string;
  customerCategoryId: string;
  customerCategoryName: string;
  parentPartyId: string;
  paymentMethodId: string;
  paymentMethodName: string;
  responsibleUserId: string;
  responsibleUserUsername: string;
  shipmentMethodId: string;
  shipmentMethodName: string;
  termOfPaymentId: string;
  termOfPaymentName: string;
  vatRegistrationNumber: string;
  amountInsured: string;
  bankAccounts: [
    {
      id: string;
      createdDate: number;
      lastModifiedDate: number;
      version: string;
      accountHolder: string;
      accountNumber: string;
      bankCode: string;
      creditInstitute: string;
      partyId: string;
      primary: boolean;
    }
  ];
  blockNotice: string;
  blocked: boolean;
  commissionSalesPartners: [
    {
      id: string;
      createdDate: number;
      lastModifiedDate: number;
      version: string;
      commissionFix: string;
      commissionPercentage: string;
      commissionType: 'FIX';
      salesPartnerSupplierId: string;
      salesPartnerSupplierNumber: string;
    }
  ];
  creditLimit: string;
  customerNumber: string;
  customerRatingId: string;
  customerRatingName: string;
  customerSupplierNumber: string;
  customerTopics: [
    {
      id: string;
      name: string;
    }
  ];
  defaultHeaderDiscount: string;
  defaultHeaderSurcharge: string;
  deliveryBlock: boolean;
  description: string;
  insolvent: boolean;
  insured: boolean;
  invoiceBlock: boolean;
  invoiceRecipientId: string;
  leadSourceId: string;
  leadSourceName: string;
  lossDescription: string;
  lossReasonId: string;
  lossReasonName: string;
  nonStandardTaxId: string;
  oldCustomerNumber: string;
  optIn: boolean;
  optInLetter: boolean;
  optInPhone: boolean;
  optInSms: boolean;
  referenceNumber: string;
  responsibleUserFixed: boolean;
  salesChannel: string;
  salesStageId: string;
  salesStageName: string;
  satisfaction: string;
  useCustomsTariffNumber: boolean;
};
