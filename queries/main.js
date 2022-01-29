import { insertNewCategory } from "./insertNewCategory";
import { getUserInfo } from "./getUserInfo";
import getCategoryItems from "./getCategoryItems";
import getCategoryNames from "./getCategoryNames";
import getCategoryNamesAndID from "./getCategoryNameAndID";
import insertNewProduct from "./insertNewProduct";
import getProductStatusList from "./getProductStatusList";
import insertProductInformation from "./insertProductInformation";
import getVerifiedSellerIDs from "./getVerifiedSellerIDs";

// Map Queries here so the hook can import the right query
const mapping = {
  insertNewCategory: insertNewCategory,
  getCategoryItems,
  getCategoryNames,
  getUserInfo,
  getCategoryNamesAndID,
  insertNewProduct,
  getProductStatusList,
  insertProductInformation,
  getVerifiedSellerIDs,
};

export default mapping;
