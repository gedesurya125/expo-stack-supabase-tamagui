const options = {
  method: 'GET',
  headers: {
    accept: 'application/vnd.xentral.default.v1+json',
    authorization: `Bearer ${process.env.EXPO_PUBLIC_XENTRAL_PERSONAL_ACCESS_TOKEN}`,
  },
};

export const fetchXentral = async (endPoint: string) => {
  return await fetch(`${process.env.EXPO_PUBLIC_XENTRAL_API_BASE}${endPoint}`, options)
    .then((response) => response?.json())
    .catch((err) => console.error(err));
};
