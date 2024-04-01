import { useShopifyProduct } from './shopify';
import { useSingleProduct, useXentralProductExternalReference } from './xentral';
import { XENTRAL_EXTERNAL_REFERENCE_NAME } from './xentral/constants';
import { XentralProductExternalReference } from './xentral/types';

const getShopifyProductId = (externalDataList: XentralProductExternalReference[]) => {
  const selectedReferenceName = XENTRAL_EXTERNAL_REFERENCE_NAME.shopifyproductid;

  return externalDataList.find((data) => data.name === selectedReferenceName)?.number;
};

export const useCombinedSingleProductData = (productId: string) => {
  const singleProduct = useSingleProduct(productId);
  const { data: xentralExternalReferenceData } = useXentralProductExternalReference(productId);

  const shopifyProductNumber = getShopifyProductId(xentralExternalReferenceData?.data || []);
  // todo: query the variant using adming api
  const { data: shopifyProductData } = useShopifyProduct(shopifyProductNumber || '');

  return {
    xentralProductData: singleProduct.data?.data,
    shopifyProductData: shopifyProductData?.data?.product
  };
};
