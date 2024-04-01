import { XentralPrice } from '~/api/xentral/types';

export const formatPrice = (xentralPrice: XentralPrice) =>
  Number(xentralPrice?.amount).toLocaleString('de-DE', {
    style: 'currency',
    currency: xentralPrice?.currency
  });
