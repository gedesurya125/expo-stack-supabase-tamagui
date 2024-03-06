const fetchOption = {
  method: 'GET',
  headers: {
    accept: 'application/vnd.xentral.default.v1+json',
    authorization: `Bearer ${process.env.EXPO_PUBLIC_XENTRAL_PERSONAL_ACCESS_TOKEN}`
  }
};

export const fetchXentral = async (endPoint: string) => {
  return await fetch(`${process.env.EXPO_PUBLIC_XENTRAL_API_BASE}${endPoint}`, fetchOption)
    .then((response) => response?.json())
    .catch((err) => console.error(err));
};

const createOptions = {
  method: 'POST',
  headers: {
    accept: 'text/html',
    'content-type': 'application/vnd.xentral.default.v1+json',
    authorization: `Bearer ${process.env.EXPO_PUBLIC_XENTRAL_PERSONAL_ACCESS_TOKEN}`
  }
};

export const createXentral = async (endPoint: string, body: string) => {
  return await fetch(`${process.env.EXPO_PUBLIC_XENTRAL_API_BASE}${endPoint}`, {
    ...createOptions,
    body: body
  })
    .then((response) => response)
    .catch((err) => console.error(err));
};
