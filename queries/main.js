import { insertNewCategory } from "./insertNewCategory";
import { getUserInfo } from "./getUserInfo";
import getCategoryItems from "./getCategoryItems";
import getCategoryNames from "./getCategoryNames";
import getCategoryNamesAndID from "./getCategoryNameAndID";
import insertNewProduct from "./insertNewProduct";
import getProductStatusList from "./getProductStatusList";
import insertProductInformation from "./insertProductInformation";
import getVerifiedSellerIDs from "./getVerifiedSellerIDs";
import getMerchantItems from "./getMerchantItems";
import getItemInfo from "./getItemInfo";
import getBrandNames from "./getBrandNames";
import deleteImage from "./deleteImage";
import deletePDFSpecification from "./deletePDFSpecification";
import deleteProduct from "./deleteProduct";
import updateProductAndDeleteCategories from "./updateProductAndDeleteCategories";

// Map Queries here so the hook can import the right query
const mapping = {
  insertNewCategory,
  getBrandNames,
  getCategoryItems,
  getCategoryNames,
  getUserInfo,
  getCategoryNamesAndID,
  insertNewProduct,
  getProductStatusList,
  insertProductInformation,
  getVerifiedSellerIDs,
  getMerchantItems,
  getItemInfo,
  deleteImage,
  deletePDFSpecification,
  deleteProduct,
  updateProductAndDeleteCategories,
};

export default mapping;
