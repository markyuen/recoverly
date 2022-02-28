export const convertCentToDollar = (cents: number) => {
  // Convert to 2.d.p
  const parsedFloat = cents.toFixed(2);
  return (parseFloat(parsedFloat) / 100).toFixed(2);
};

export const roundTo2dp = (num) => {
  var m = Number((Math.abs(num) * 100).toPrecision(15));
  return (Math.round(m) / 100) * Math.sign(num);
};

export const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
