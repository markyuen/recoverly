export const capitalizeFirstLetter = (s) => {
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export const capitaliseFirstLetterOfString = (s) => {
  if (!s) return "";
  return s
    .split(" ")
    .map((item) => capitalizeFirstLetter(item))
    .join(" ");
};

export const lowercaseAllLetter = (s) => {
  return s.map((item) => item.toLowerCase()).join("-");
};

export const generateItemSlugLink = (itemTitle) => {
  return itemTitle
    .split(" ")
    .map((item) => item.toLowerCase())
    .join("-");
};

export const decodeItemSlug = (slug) => {
  return decodeURIComponent(
    slug
      .split("-")
      .map((item) => capitalizeFirstLetter(item))
      .join(" ")
  );
};
