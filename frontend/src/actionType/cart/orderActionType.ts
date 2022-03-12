import { Order } from "../../reducers/orderReducers";

export enum OrderActionType {
  ORDER_CREATE_REQUEST = "order_create_request",
  ORDER_CREATE_SUCCESS = "order_create_success",
  ORDER_CREATE_FAIL = "order_create_fail",
}


interface OrderRequestAction {
  type: OrderActionType.ORDER_CREATE_REQUEST;
}

interface OrderSuccessAction {
  type: OrderActionType.ORDER_CREATE_SUCCESS;
  payload: Order;
}

interface OrderFailAction {
  type: OrderActionType.ORDER_CREATE_FAIL;
  payload: string;
}

export type OrderAction =
  | OrderRequestAction
  | OrderSuccessAction
  | OrderFailAction;
