export enum ProductActionType {
  PRODUCT_LIST_REQUEST = "product_list_request",
  PRODUCT_LIST_SUCCESS = "product_list_success",
  PRODUCT_LIST_FAIL = "product_list_fail",
  PRODUCT_DETAILS_REQUEST = "product_details_request",
  PRODUCT_DETAILS_SUCCESS = "product_details_success",
  PRODUCT_DETAILS_FAIL = "product_details_fail",
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
  rating: number;
  numReviews: number;
  reviews: string[];
}

// ProductList Action
export interface RequestProductListAction {
  type: ProductActionType.PRODUCT_LIST_REQUEST;
}

export interface SuccessProductListAction {
  type: ProductActionType.PRODUCT_LIST_SUCCESS;
  payload: ProductProp[];
}

export interface FailProductListAction {
  type: ProductActionType.PRODUCT_LIST_FAIL;
  payload: string;
}

export type ProductListAction =
  | RequestProductListAction
  | SuccessProductListAction
  | FailProductListAction;

// ProductDetails Action
export interface RequestProductDetailsAction {
  type: ProductActionType.PRODUCT_DETAILS_REQUEST;
}

export interface SuccessProductDetailsAction {
  type: ProductActionType.PRODUCT_DETAILS_SUCCESS;
  payload: ProductProp | null;
}

export interface FailProductDetailsAction {
  type: ProductActionType.PRODUCT_DETAILS_FAIL;
  payload: string;
}

export type ProductDetailsAction =
  | RequestProductDetailsAction
  | SuccessProductDetailsAction
  | FailProductDetailsAction;
