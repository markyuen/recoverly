import { insertNewCategory } from "./insertNewCategory";
import { getUserInfo } from "./getUserInfo";
import getCategoryItems from "./getCategoryItems";
import getCategoryNames from "./getCategoryNames";
import getCategoryNamesAndID from "./getCategoryNameAndID";
import insertNewProduct from "./insertNewProduct";
import getProductStatusList from "./getProductStatusList";
import insertProductInformation from "./insertProductInformation";
import { updateSellerStatus } from "./updateSellerStatus";
import { insertNewSeller } from "./insertNewSeller";
import getVerifiedSellerIDs from "./getVerifiedSellerIDs";
import getMerchantItems from "./getMerchantItems";
import getItemInfo from "./getItemInfo";
import getBrandNames from "./getBrandNames";
import deleteImage from "./deleteImage";
import deletePDFSpecification from "./deletePDFSpecification";
import deleteProduct from "./deleteProduct";
import updateProductAndDeleteCategories from "./updateProductAndDeleteCategories";
import { getUserSellerInfo } from "./getSellerInfo";

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
  updateSellerStatus,
  insertNewSeller,
  getVerifiedSellerIDs,
  getMerchantItems,
  getItemInfo,
  deleteImage,
  deletePDFSpecification,
  deleteProduct,
  updateProductAndDeleteCategories,
  getUserSellerInfo: getUserSellerInfo,
};

export default mapping;
