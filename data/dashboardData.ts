import { imagePlaceholder } from '~/images/placeholder';

export const dashboardData = {
  specialDeals: {
    title: 'Special deals',
    list: [
      { imageUri: imagePlaceholder },
      { imageUri: imagePlaceholder },
      { imageUri: imagePlaceholder },
      { imageUri: imagePlaceholder }
    ]
  },
  achievements: {
    current: 2000,
    target: 3500,
    targetMessage: 'Earn {{remaining}}points to get Hammer',
    rewardLink: {
      label: 'Get your rewareds',
      to: '/'
    }
  }
};
