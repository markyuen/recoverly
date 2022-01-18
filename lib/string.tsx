export const capitalizeFirstLetter = (s) => {
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export const capitaliseFirstLetterOfString = (s) => {
  return s
    .split(" ")
    .map((item) => capitalizeFirstLetter(item))
    .join(" ");
};

export const lowercaseAllLetter = (s) => {
  return s.map((item) => item.toLowerCase()).join("-");
};

export const generateItemSlugLink = (itemTitle) => {
  return lowercaseAllLetter(itemTitle.split(" "));
};
