import {
  ProductActionType,
  ProductDetailsAction,
  ProductListAction,
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
  action: ProductListAction
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
  action: ProductDetailsAction
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
