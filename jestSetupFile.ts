const path = require('node:path');
require('@expo/env').load(path.normalize('./'));

// mocking the expo-linking https://github.com/expo/expo/issues/18742
jest.mock('expo-linking', () => {
  const module: typeof import('expo-linking') = {
    ...jest.requireActual('expo-linking'),
    createURL: jest.fn()
  };

  return module;
});
