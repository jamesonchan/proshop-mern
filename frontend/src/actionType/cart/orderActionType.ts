import { Order } from "../../reducers/orderReducers";

export enum OrderActionType {
  ORDER_CREATE_REQUEST = "order_create_request",
  ORDER_CREATE_SUCCESS = "order_create_success",
  ORDER_CREATE_FAIL = "order_create_fail",

  ORDER_DETAIL_REQUEST = "order_detail_request",
  ORDER_DETAIL_SUCCESS = "order_detail_success",
  ORDER_DETAIL_FAIL = "order_detail_fail",

  ORDER_PAY_REQUEST = "order_pay_request",
  ORDER_PAY_SUCCESS = "order_pay_success",
  ORDER_PAY_FAIL = "order_pay_fail",
  ORDER_PAY_RESET = "order_pay_reset",

  ORDER_LIST_MY_REQUEST = "order_list_my_request",
  ORDER_LIST_MY_SUCCESS = "order_list_my_success",
  ORDER_LIST_MY_FAIL = "order_list_my_fail",
  ORDER_LIST_MY_RESET = "order_list_my_reset",
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

interface OrderDetailRequestAction {
  type: OrderActionType.ORDER_DETAIL_REQUEST;
}

interface OrderDetailSuccessAction {
  type: OrderActionType.ORDER_DETAIL_SUCCESS;
  payload: Order;
}

interface OrderDetailFailAction {
  type: OrderActionType.ORDER_DETAIL_FAIL;
  payload: string;
}

interface OrderPayRequestAction {
  type: OrderActionType.ORDER_PAY_REQUEST;
}

interface OrderPaySuccessAction {
  type: OrderActionType.ORDER_PAY_SUCCESS;
}

interface OrderPayFailAction {
  type: OrderActionType.ORDER_PAY_FAIL;
  payload: string;
}

interface OrderPayResetAction {
  type: OrderActionType.ORDER_PAY_RESET;
}

interface OrderListMyRequestAction {
  type: OrderActionType.ORDER_LIST_MY_REQUEST;
}

interface OrderListMySuccessAction {
  type: OrderActionType.ORDER_LIST_MY_SUCCESS;
  payload: Order[];
}

interface OrderListMyFailAction {
  type: OrderActionType.ORDER_LIST_MY_FAIL;
  payload: string;
}

interface OrderListMyResetAction {
  type: OrderActionType.ORDER_LIST_MY_RESET;
}

export type OrderAction =
  | OrderRequestAction
  | OrderSuccessAction
  | OrderFailAction
  | OrderDetailRequestAction
  | OrderDetailSuccessAction
  | OrderDetailFailAction
  | OrderPayRequestAction
  | OrderPaySuccessAction
  | OrderPayFailAction
  | OrderPayResetAction
  | OrderListMyRequestAction
  | OrderListMySuccessAction
  | OrderListMyFailAction
  | OrderListMyResetAction;
