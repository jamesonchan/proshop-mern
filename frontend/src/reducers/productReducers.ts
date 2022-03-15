import {
  ProductAction,
  ProductActionType,
  ProductProp,
} from "../actionType/product/productActionType";
import { RootState } from "../store";

interface ProductListState {
  products: ProductProp[];
  loading: boolean;
  error: string | null;
}

const initialProductListState: ProductListState = {
  products: [],
  loading: false,
  error: null,
};

export const selectProductList = (rootState: RootState) =>
  rootState.productList;

export const productListReducer = (
  state: ProductListState = initialProductListState,
  action: ProductAction
): ProductListState => {
  switch (action.type) {
    case ProductActionType.PRODUCT_LIST_REQUEST:
      return { ...state, loading: true };

    case ProductActionType.PRODUCT_LIST_SUCCESS:
      return { ...state, products: action.payload, loading: false };

    case ProductActionType.PRODUCT_LIST_FAIL:
      return { ...state, error: action.payload, loading: false };

    default:
      return state;
  }
};

interface ProductDetailsState {
  singleProduct: ProductProp | null;
  loading: boolean;
  error: string | null;
}

const initialProductDetailsState: ProductDetailsState = {
  singleProduct: null,
  loading: false,
  error: null,
};

export const selectProductDetails = (rootState: RootState) =>
  rootState.productDetails;

export const productDetailsReducer = (
  state: ProductDetailsState = initialProductDetailsState,
  action: ProductAction
): ProductDetailsState => {
  switch (action.type) {
    case ProductActionType.PRODUCT_DETAILS_REQUEST:
      return { ...state, loading: true };

    case ProductActionType.PRODUCT_DETAILS_SUCCESS:
      return { ...state, loading: false, singleProduct: action.payload };

    case ProductActionType.PRODUCT_DETAILS_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

interface ProductDeleteState {
  success?: boolean;
  loading?: boolean;
  error?: string | null;
}

const initialProductDeleteState: ProductDeleteState = {
  success: false,
  loading: false,
  error: null,
};

export const selectProductDelete = (rootState: RootState) =>
  rootState.productDelete;

export const productDeleteReducer = (
  state: ProductDeleteState = initialProductDeleteState,
  action: ProductAction
): ProductDeleteState => {
  switch (action.type) {
    case ProductActionType.PRODUCT_DELETE_REQUEST:
      return { loading: true };

    case ProductActionType.PRODUCT_DELETE_SUCCESS:
      return { loading: false, success: true };

    case ProductActionType.PRODUCT_DELETE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

interface ProductCreateState {
  product?: ProductProp | null;
  success?: boolean;
  loading?: boolean;
  error?: string | null;
}

const initialProductCreateState = {
  product: null,
  success: false,
  loading: false,
  error: null,
};

export const selectProductCreate = (rooState: RootState) =>
  rooState.productCreate;

export const productCreateReducer = (
  state: ProductCreateState = initialProductCreateState,
  action: ProductAction
): ProductCreateState => {
  switch (action.type) {
    case ProductActionType.PRODUCT_CREATE_REQUEST:
      return { loading: true };

    case ProductActionType.PRODUCT_CREATE_SUCCESS:
      return { loading: false, success: true, product: action.payload };

    case ProductActionType.PRODUCT_CREATE_FAIL:
      return { loading: false, error: action.payload };

    case ProductActionType.PRODUCT_CREATE_RESET:
      return { product: null };

    default:
      return state;
  }
};

interface ProductUpdateState {
  success?: boolean;
  loading?: boolean;
  error?: string | null;
}

const initialProductUpdateState: ProductUpdateState = {
  success: false,
  loading: false,
  error: null,
};

export const selectProductUpdate = (rootState: RootState) =>
  rootState.productUpdate;

export const productUpdateReducer = (
  state: ProductUpdateState = initialProductUpdateState,
  action: ProductAction
): ProductUpdateState => {
  switch (action.type) {
    case ProductActionType.PRODUCT_UPDATE_REQUEST:
      return { loading: true };

    case ProductActionType.PRODUCT_UPDATE_SUCCESS:
      return { loading: false, success: true };

    case ProductActionType.PRODUCT_UPDATE_FAIL:
      return { loading: false, error: action.payload };

    case ProductActionType.PRODUCT_UPDATE_RESET:
      return {};

    default:
      return state;
  }
};

interface ProductReviewCreateState {
  success?: boolean;
  loading?: boolean;
  error?: string | null;
}

const initialProductReviewCreateState: ProductReviewCreateState = {
  success: false,
  loading: false,
  error: null,
};

export const selectProductReview = (rootState: RootState) =>
  rootState.productReviewCreate;

export const productReviewCreateReducer = (
  state: ProductReviewCreateState = initialProductReviewCreateState,
  action: ProductAction
): ProductReviewCreateState => {
  switch (action.type) {
    case ProductActionType.PRODUCT_CREATE_REVIEW_REQUEST:
      return { loading: true };

    case ProductActionType.PRODUCT_CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true };

    case ProductActionType.PRODUCT_CREATE_REVIEW_FAIL:
      return { loading: false, error: action.payload };

    case ProductActionType.PRODUCT_CREATE_REVIEW_RESET:
      return {};

    default:
      return state;
  }
};
