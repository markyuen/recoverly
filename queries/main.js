import { insertNewCategory } from "./insertNewCategory";
import { getUserInfo } from "./getUserInfo";

// Map Queries here so the hook can import the right query
const mapping = {
  insertNewCategory: insertNewCategory,
  getUserInfo: getUserInfo,
};

export default mapping;
