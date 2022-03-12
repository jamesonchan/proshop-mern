import axios from "axios";
import { ThunkAction } from "redux-thunk";
import {
  OrderAction,
  OrderActionType,
} from "../actionType/cart/orderActionType";
import { Order } from "../reducers/orderReducers";
import { RootState } from "../store";

export const createOrder =
  (
    order: Order
  ): ThunkAction<Promise<void>, RootState, undefined, OrderAction> =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: OrderActionType.ORDER_CREATE_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo?.token}`,
        },
      };
      const { data } = await axios.post("/api/orders", order, config);
      dispatch({ type: OrderActionType.ORDER_CREATE_SUCCESS, payload: data });
    } catch (error: any) {
      dispatch({
        type: OrderActionType.ORDER_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
