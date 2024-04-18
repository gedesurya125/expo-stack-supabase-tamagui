export type ArticleType = {
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
  articleNumber: string;
  description: string;
  ean: string;
  fixedPurchaseQuantity: string;
  internalNote: string;
  manufacturerPartNumber: string;
  matchCode: string;
  minimumPurchaseQuantity: string;
  name: string;
  shortDescription1: string;
  shortDescription2: string;
  taxRateType: string;
  unitId: string;
  unitName: string;
  accountId: string;
  accountNumber: string;
  accountingCodeId: string;
  active: boolean;
  applyCashDiscount: boolean;
  articleAlternativeQuantities: [
    {
      id: string;
      createdDate: number;
      lastModifiedDate: number;
      version: string;
      minimumOrderQuantity: string;
      minimumStockQuantity: string;
      targetStockQuantity: string;
      warehouseId: string;
      warehouseName: string;
    }
  ];
  articleCalculationPrices: [
    {
      id: string;
      createdDate: number;
      lastModifiedDate: number;
      version: string;
      articleCalculationPriceType: string;
      endDate: number;
      positionNumber: number;
      price: string;
      salesChannel: string;
      startDate: number;
    }
  ];
  articleCategoryId: string;
  articleGrossWeight: string;
  articleHeight: string;
  articleImages: [
    {
      id: string;
      createdDate: number;
      lastModifiedDate: number;
      version: string;
      fileName: string;
      mainImage: boolean;
    }
  ];
  articleLength: string;
  articleNetWeight: string;
  articlePrices: [
    {
      id: string;
      createdDate: number;
      lastModifiedDate: number;
      version: string;
      currencyId: string;
      currencyName: string;
      customerId: string;
      description: string;
      endDate: number;
      lastModifiedByUserId: string;
      positionNumber: number;
      price: string;
      priceScaleType: string;
      priceScaleValue: string;
      reductionAdditions: [
        {
          id: string;
          createdDate: number;
          lastModifiedDate: number;
          version: string;
          name: string;
          type: string;
          value: string;
        }
      ];
      startDate: number;
      salesChannel: string;
    }
  ];
  articleType: string;
  articleWidth: string;
  availableForSalesChannels: string[];
  availableInSale: boolean;
  averageDeliveryTime: number;
  barcode: string;
  batchNumberRequired: boolean;
  billOfMaterialPartDeliveryPossible: boolean;
  catalogCode: string;
  commissionRate: string;
  contractBillingCycle: string;
  contractBillingMode: string;
  countryOfOriginCode: string;
  customerArticleNumbers: [
    {
      id: string;
      createdDate: number;
      lastModifiedDate: number;
      version: string;
      customerArticleNumber: string;
      customerId: string;
    }
  ];
  customsDescription: string;
  customsTariffNumber: string;
  customsTariffNumberId: string;
  defaultLoadingEquipmentIdentifierId: string;
  defaultPriceCalculationType: string;
  defaultStoragePlaces: [
    {
      id: string;
    }
  ];
  defineIndividualTaskTemplates: boolean;
  expenseAccountId: string;
  expenseAccountNumber: string;
  expirationDays: number;
  invoicingType: string;
  launchDate: number;
  loadingEquipmentArticleId: string;
  longText: string;
  lowLevelCode: number;
  manufacturerId: string;
  manufacturerName: string;
  marginCalculationPriceType: string;
  minimumStockQuantity: string;
  packagingQuantity: number;
  packagingUnitBaseArticleId: string;
  packagingUnitParentArticleId: string;
  plannedWorkingTimePerUnit: number;
  priceCalculationParameters: [
    {
      id: string;
      createdDate: number;
      lastModifiedDate: number;
      version: string;
      fixSurcharge: string;
      fromScale: string;
      lowerPurchasePriceBound: string;
      margin: string;
      percentSurcharge: string;
      profit: string;
      salesChannel: string;
    }
  ];
  primarySupplySourceId: string;
  procurementLeadDays: number;
  producerType: string;
  productionArticle: boolean;
  productionBillOfMaterialItems: [
    {
      id: string;
      createdDate: number;
      lastModifiedDate: number;
      version: string;
      articleId: string;
      articleNumber: string;
      positionNumber: number;
      quantity: string;
    }
  ];
  purchaseCostCenterId: string;
  purchaseCostCenterNumber: string;
  quantityConversions: [
    {
      id: string;
      createdDate: number;
      lastModifiedDate: number;
      version: string;
      conversionQuantity: string;
      createdUserId: string;
      lastEditedUserId: string;
      oppositeDirection: boolean;
      unitId: string;
    }
  ];
  ratingId: string;
  ratingName: string;
  recordItemGroupName: string;
  safetyStockDays: number;
  salesBillOfMaterialItems: [
    {
      id: string;
      createdDate: number;
      lastModifiedDate: number;
      version: string;
      articleId: string;
      articleNumber: string;
      positionNumber: number;
      quantity: string;
    }
  ];
  salesCostCenterId: string;
  salesCostCenterNumber: string;
  sellByDate: number;
  sellFromDate: number;
  serialNumberRequired: boolean;
  showOnDeliveryNote: boolean;
  statusId: string;
  supplySources: [
    {
      id: string;
      createdDate: number;
      lastModifiedDate: number;
      version: string;
      articleSupplySourceId: string;
      positionNumber: number;
    }
  ];
  supportUntilDate: number;
  systemCode: string;
  tags: string[];
  targetStockQuantity: string;
  useAvailableForSalesChannels: boolean;
  useSalesBillOfMaterialItemPrices: boolean;
  useSalesBillOfMaterialItemPricesForPurchase: boolean;
};

export type ArticleAdditionalProperties = {
  currentSalesPrice: [
    {
      articleUnitPrice: string;
      currencyId: string;
      endDate: number;
      quantity: string;
      reductionAdditionItems: [
        {
          position: number;
          source: string;
          specialPriceReduction: boolean;
          title: string;
          type: string;
          value: string;
        }
      ];
      startDate: number;
    }
  ];
  pickableStockQuantity: [
    [
      {
        quantity: string;
        warehouseId: string;
      }
    ]
  ];
  reservedStockQuantity: [
    [
      {
        quantity: string;
        warehouseId: string;
      }
    ]
  ];
  totalStockQuantity: [
    [
      {
        quantity: string;
        warehouseId: string;
      }
    ]
  ];
};
