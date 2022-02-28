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
import getParentCategories from "./getParentCategories";
import { getUserSellerInfo } from "./getUserSellerInfo";
import { updateSellerInfo } from "./updateSellerInfo";
import getProductIDs from "./getProductIDs";
import getProductInformation from "./getProductInformation";
import insertNewCartProduct from "./insertNewCartProduct";
import updateCartProduct from "./updateCartProduct";
import { getUserCartProducts } from "./getUserCartProducts";
import { deleteCartProduct } from "./deleteCartProduct";
import getAboutInformation from "./getAboutInformation";
import { getSellerFees } from "./getSellerFees";
<<<<<<< HEAD
import updateCustomerQueryStatus from "./updateCustomerQueryStatus";
import InsertCustomerQuery from "./insertCustomerQuery";
=======
>>>>>>> main
import { insertNewOrder } from "./insertNewOrder";
import { getUserOrders } from "./getUserOrders";
import { updateUserOrderStatus } from "./updateUserOrderStatus";
import { getProductVariation } from "./getProductVariation";
import { updateProductCount } from "./updateProductCount";
import { getSellerOrders } from "./getSellerOrders";
import { updateOrderProductStatus } from "./updateOrderProductStatus";
import { getOrderProductStatuses } from "./getOrderProductStatuses";
import { updateOrderStatus } from "./updateOrderStatus";
import { updateOrderSellerStatus } from "./updateOrderSellerStatus";

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
  getUserSellerInfo,
  updateSellerInfo,
  getParentCategories,
  getProductIDs,
  getProductInformation,
  getUserCartProducts,
  insertNewCartProduct,
  updateCartProduct,
  deleteCartProduct,
  getAboutInformation,
  getSellerFees,
  InsertCustomerQuery,
  updateCustomerQueryStatus,
  insertNewOrder,
  getUserOrders,
  updateUserOrderStatus,
  getProductVariation,
  updateProductCount,
  getSellerOrders,
  updateOrderProductStatus,
  getOrderProductStatuses,
  updateOrderStatus,
  updateOrderSellerStatus,
};

export default mapping;
