import axios from "axios";
import { ThunkAction } from "redux-thunk";
import {
  ActionType,
  ProductDetailsAction,
  ProductListAction,
} from "../actionType/productActionType";
import { RootState } from "../store";

export const listProducts =
  (): ThunkAction<Promise<void>, RootState, undefined, ProductListAction> =>
  async (dispatch) => {
    try {
      dispatch({ type: ActionType.PRODUCT_LIST_REQUEST });

      const { data } = await axios.get("/api/products");

      dispatch({
        type: ActionType.PRODUCT_LIST_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: ActionType.PRODUCT_LIST_FAIL,
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
  ): ThunkAction<Promise<void>, RootState, undefined, ProductDetailsAction> =>
  async (dispatch) => {
    try {
      dispatch({ type: ActionType.PRODUCT_DETAILS_REQUEST });
      const { data } = await axios.get(`/api/products/${id}`);
      dispatch({
        type: ActionType.PRODUCT_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: ActionType.PRODUCT_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
