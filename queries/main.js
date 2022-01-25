import { insertNewCategory } from "./insertNewCategory";
import { getUserInfo } from "./getUserInfo";
import { insertNewSeller } from "./insertNewSeller";

// Map Queries here so the hook can import the right query
const mapping = {
  insertNewCategory: insertNewCategory,
  getUserInfo: getUserInfo,
  insertNewSeller: insertNewSeller,
};

export default mapping;
