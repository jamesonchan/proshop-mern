import axios from "axios";
import { ThunkAction } from "redux-thunk";
import {
  ProductAction,
  ProductActionType,
  ProductProp,
} from "../actionType/product/productActionType";
import { RootState } from "../store";

export const listProducts =
  (): ThunkAction<Promise<void>, RootState, undefined, ProductAction> =>
  async (dispatch) => {
    try {
      dispatch({ type: ProductActionType.PRODUCT_LIST_REQUEST });

      const { data } = await axios.get("/api/products");

      dispatch({
        type: ProductActionType.PRODUCT_LIST_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: ProductActionType.PRODUCT_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const productDetails =
  (
    id: string | undefined
  ): ThunkAction<Promise<void>, RootState, undefined, ProductAction> =>
  async (dispatch) => {
    try {
      dispatch({ type: ProductActionType.PRODUCT_DETAILS_REQUEST });
      const { data } = await axios.get(`/api/products/${id}`);
      dispatch({
        type: ProductActionType.PRODUCT_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: ProductActionType.PRODUCT_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteProduct =
  (
    productId: string
  ): ThunkAction<Promise<void>, RootState, undefined, ProductAction> =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: ProductActionType.PRODUCT_DELETE_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo?.token}`,
        },
      };

      await axios.delete(`/api/products/${productId}`, config);

      dispatch({ type: ProductActionType.PRODUCT_DELETE_SUCCESS });
    } catch (error: any) {
      dispatch({
        type: ProductActionType.PRODUCT_DELETE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const createProduct =
  (): ThunkAction<Promise<void>, RootState, undefined, ProductAction> =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: ProductActionType.PRODUCT_CREATE_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Context-Type": "application/json",
          Authorization: `Bearer ${userInfo?.token}`,
        },
      };

      const { data } = await axios.post(`/api/products`, {}, config);

      dispatch({
        type: ProductActionType.PRODUCT_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: ProductActionType.PRODUCT_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const updateProduct =
  (
    product: ProductProp
  ): ThunkAction<Promise<void>, RootState, undefined, ProductAction> =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: ProductActionType.PRODUCT_UPDATE_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Context-Type": "application/json",
          Authorization: `Bearer ${userInfo?.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/products/${product._id}`,
        product,
        config
      );

      dispatch({
        type: ProductActionType.PRODUCT_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: ProductActionType.PRODUCT_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
