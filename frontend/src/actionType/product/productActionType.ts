export enum ProductActionType {
  PRODUCT_LIST_REQUEST = "product_list_request",
  PRODUCT_LIST_SUCCESS = "product_list_success",
  PRODUCT_LIST_FAIL = "product_list_fail",

  PRODUCT_DETAILS_REQUEST = "product_details_request",
  PRODUCT_DETAILS_SUCCESS = "product_details_success",
  PRODUCT_DETAILS_FAIL = "product_details_fail",

  PRODUCT_DELETE_REQUEST = "product_delete_request",
  PRODUCT_DELETE_SUCCESS = "product_delete_success",
  PRODUCT_DELETE_FAIL = "product_delete_fail",

  PRODUCT_CREATE_REQUEST = "product_create_request",
  PRODUCT_CREATE_SUCCESS = "product_create_success",
  PRODUCT_CREATE_FAIL = "product_create_fail",
  PRODUCT_CREATE_RESET = "product_create_reset",

  PRODUCT_UPDATE_REQUEST = "product_update_request",
  PRODUCT_UPDATE_SUCCESS = "product_update_success",
  PRODUCT_UPDATE_FAIL = "product_update_fail",
  PRODUCT_UPDATE_RESET = "product_update_reset",

  PRODUCT_CREATE_REVIEW_REQUEST = "product_create_review_request",
  PRODUCT_CREATE_REVIEW_SUCCESS = "product_create_review_success",
  PRODUCT_CREATE_REVIEW_FAIL = "product_create_review_fail",
  PRODUCT_CREATE_REVIEW_RESET = "product_create_review_reset",
}

export interface ProductProp {
  _id: string;
  name: string;
  image: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  countInStock: number;
  rating?: number;
  numReviews?: number;
  reviews?: Reviews[];
}

export interface Reviews {
  _id?: string;
  name?: string;
  rating: number;
  comment: string;
  createdAt?: string;
}

// ProductList Action
interface RequestProductListAction {
  type: ProductActionType.PRODUCT_LIST_REQUEST;
}

interface SuccessProductListAction {
  type: ProductActionType.PRODUCT_LIST_SUCCESS;
  payload: {
    products: ProductProp[];
    page: string;
    pages: number;
  };
}

interface FailProductListAction {
  type: ProductActionType.PRODUCT_LIST_FAIL;
  payload: string;
}

// ProductDetails Action
interface RequestProductDetailsAction {
  type: ProductActionType.PRODUCT_DETAILS_REQUEST;
}

interface SuccessProductDetailsAction {
  type: ProductActionType.PRODUCT_DETAILS_SUCCESS;
  payload: ProductProp | null;
}

interface FailProductDetailsAction {
  type: ProductActionType.PRODUCT_DETAILS_FAIL;
  payload: string;
}

// product delete
interface ProductDeleteRequestAction {
  type: ProductActionType.PRODUCT_DELETE_REQUEST;
}

interface ProductDeleteSuccessAction {
  type: ProductActionType.PRODUCT_DELETE_SUCCESS;
}

interface ProductDeleteFailAction {
  type: ProductActionType.PRODUCT_DELETE_FAIL;
  payload: string;
}

// create product
interface ProductCreateRequestAction {
  type: ProductActionType.PRODUCT_CREATE_REQUEST;
}

interface ProductCreateSuccessAction {
  type: ProductActionType.PRODUCT_CREATE_SUCCESS;
  payload: ProductProp;
}

interface ProductCreateFailAction {
  type: ProductActionType.PRODUCT_CREATE_FAIL;
  payload: string;
}

interface ProductCreateResetAction {
  type: ProductActionType.PRODUCT_CREATE_RESET;
}

// update product
interface ProductUpdateRequestAction {
  type: ProductActionType.PRODUCT_UPDATE_REQUEST;
}

interface ProductUpdateSuccessAction {
  type: ProductActionType.PRODUCT_UPDATE_SUCCESS;
  payload: ProductProp;
}

interface ProductUpdateFailAction {
  type: ProductActionType.PRODUCT_UPDATE_FAIL;
  payload: string;
}

interface ProductUpdateResetAction {
  type: ProductActionType.PRODUCT_UPDATE_RESET;
}

// create review action
interface ProductCreateReviewReuqestAction {
  type: ProductActionType.PRODUCT_CREATE_REVIEW_REQUEST;
}

interface ProductCreateReviewSuccessAction {
  type: ProductActionType.PRODUCT_CREATE_REVIEW_SUCCESS;
}

interface ProductCreateReviewFailAction {
  type: ProductActionType.PRODUCT_CREATE_REVIEW_FAIL;
  payload: string;
}

interface ProductCreateReviewResetAction {
  type: ProductActionType.PRODUCT_CREATE_REVIEW_RESET;
}

export type ProductAction =
  | RequestProductDetailsAction
  | SuccessProductDetailsAction
  | FailProductDetailsAction
  | RequestProductListAction
  | SuccessProductListAction
  | FailProductListAction
  | ProductDeleteRequestAction
  | ProductDeleteSuccessAction
  | ProductDeleteFailAction
  | ProductCreateRequestAction
  | ProductCreateSuccessAction
  | ProductCreateFailAction
  | ProductCreateResetAction
  | ProductUpdateRequestAction
  | ProductUpdateSuccessAction
  | ProductUpdateFailAction
  | ProductUpdateResetAction
  | ProductCreateReviewReuqestAction
  | ProductCreateReviewSuccessAction
  | ProductCreateReviewFailAction
  | ProductCreateReviewResetAction;
