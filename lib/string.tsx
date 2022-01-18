export const capitalizeFirstLetter = (s) => {
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export const capitaliseFirstLetterOfString = (s) => {
  return s
    .split(" ")
    .map((item) => capitalizeFirstLetter(item))
    .join(" ");
};
