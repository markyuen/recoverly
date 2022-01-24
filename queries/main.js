import { insertNewCategory } from "./insertNewCategory";
import { getUserInfo } from "./getUserInfo";
import getCategoryItems from "./getCategoryItems";
import getCategoryNames from "./getCategoryNames";

// Map Queries here so the hook can import the right query
const mapping = {
  insertNewCategory: insertNewCategory,
  getCategoryItems,
  getCategoryNames,
  getUserInfo,
};

export default mapping;
