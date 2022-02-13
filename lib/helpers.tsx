export const convertCentToDollar = (cents: number) => {
  return parseFloat(cents / 100).toFixed(2);
};
