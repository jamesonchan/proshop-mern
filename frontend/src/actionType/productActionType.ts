import { ProductProp } from "../typings";

export enum ActionType {
  PRODUCT_LIST_REQUEST = "product_list_request",
  PRODUCT_LIST_SUCCESS = "product_list_success",
  PRODUCT_LIST_FAIL = "product_list_fail",
  PRODUCT_DETAILS_REQUEST = "product_details_request",
  PRODUCT_DETAILS_SUCCESS = "product_details_success",
  PRODUCT_DETAILS_FAIL = "product_details_fail",
}

// ProductList Action
export interface RequestProductListAction {
  type: ActionType.PRODUCT_LIST_REQUEST;
}

export interface SuccessProductListAction {
  type: ActionType.PRODUCT_LIST_SUCCESS;
  payload: ProductProp[];
}

export interface FailProductListAction {
  type: ActionType.PRODUCT_LIST_FAIL;
  payload: string;
}

export type ProductListAction =
  | RequestProductListAction
  | SuccessProductListAction
  | FailProductListAction;

// ProductDetails Action
export interface RequestProductDetailsAction {
  type: ActionType.PRODUCT_DETAILS_REQUEST;
}

export interface SuccessProductDetailsAction {
  type: ActionType.PRODUCT_DETAILS_SUCCESS;
  payload: ProductProp | null;
}

export interface FailProductDetailsAction {
  type: ActionType.PRODUCT_DETAILS_FAIL;
  payload: string;
}

export type ProductDetailsAction =
  | RequestProductDetailsAction
  | SuccessProductDetailsAction
  | FailProductDetailsAction;
