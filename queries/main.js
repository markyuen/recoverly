import { insertNewCategory } from "./insertNewCategory";
import { getUserInfo } from "./getUserInfo";
import { getCategoryItems } from "./getCategoryItems";
import { getCategoryIDs } from "./getCategoryIDs";

// Map Queries here so the hook can import the right query
const mapping = {
  insertNewCategory: insertNewCategory,
  getCategoryItems: getCategoryItems,
  getCategoryIDs: getCategoryIDs,
  getUserInfo,
};

export default mapping;
