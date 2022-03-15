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

export const getOrderDetail =
  (
    id: string | null
  ): ThunkAction<Promise<void>, RootState, undefined, OrderAction> =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: OrderActionType.ORDER_DETAIL_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo?.token}`,
        },
      };
      const { data } = await axios.get(`/api/orders/${id}`, config);
      dispatch({ type: OrderActionType.ORDER_DETAIL_SUCCESS, payload: data });
    } catch (error: any) {
      dispatch({
        type: OrderActionType.ORDER_DETAIL_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const payOrder =
  (
    orderId: string,
    paymentResult: any
  ): ThunkAction<Promise<void>, RootState, undefined, OrderAction> =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: OrderActionType.ORDER_PAY_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo?.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/orders/${orderId}/pay`,
        paymentResult,
        config
      );

      dispatch({ type: OrderActionType.ORDER_PAY_SUCCESS });
    } catch (error: any) {
      dispatch({
        type: OrderActionType.ORDER_PAY_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const listMyOrder =
  (): ThunkAction<Promise<void>, RootState, undefined, OrderAction> =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: OrderActionType.ORDER_LIST_MY_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo?.token}`,
        },
      };

      const { data } = await axios.get(`/api/orders/myorders`, config);

      dispatch({ type: OrderActionType.ORDER_LIST_MY_SUCCESS, payload: data });
    } catch (error: any) {
      dispatch({
        type: OrderActionType.ORDER_LIST_MY_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getAllOrder =
  (): ThunkAction<Promise<void>, RootState, undefined, OrderAction> =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: OrderActionType.ORDER_ALL_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo?.token}`,
        },
      };

      const { data } = await axios.get(`/api/orders`, config);

      dispatch({ type: OrderActionType.ORDER_ALL_SUCCESS, payload: data });
    } catch (error: any) {
      dispatch({
        type: OrderActionType.ORDER_ALL_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deliverOrder =
  (
    order: Order
  ): ThunkAction<Promise<void>, RootState, undefined, OrderAction> =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: OrderActionType.ORDER_DELIVER_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo?.token}`,
        },
      };

      await axios.put(`/api/orders/${order._id}/deliver`, {}, config);

      dispatch({ type: OrderActionType.ORDER_DELIVER_SUCCESS });
    } catch (error: any) {
      dispatch({
        type: OrderActionType.ORDER_DELIVER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
