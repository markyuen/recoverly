import { insertNewCategory } from "./insertNewCategory";
import { getUserInfo } from "./getUserInfo";
import getCategoryItems from "./getCategoryItems";
import getCategoryNames from "./getCategoryNames";
import getCategoryNamesAndID from "./getCategoryNameAndID";
import { insertNewSeller } from "./insertNewSeller";

// Map Queries here so the hook can import the right query
const mapping = {
  insertNewCategory: insertNewCategory,
  getCategoryItems,
  getCategoryNames,
  getUserInfo,
  getCategoryNamesAndID,
  getUserInfo: getUserInfo,
  insertNewSeller: insertNewSeller,
};

export default mapping;
