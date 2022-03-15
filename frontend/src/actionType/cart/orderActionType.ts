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

  ORDER_ALL_REQUEST = "order_all_request",
  ORDER_ALL_SUCCESS = "order_all_success",
  ORDER_ALL_FAIL = "order_all_fail",
  ORDER_ALL_RESET = "order_all_reset",

  ORDER_DELIVER_REQUEST = "order_deliver_request",
  ORDER_DELIVER_SUCCESS = "order_deliver_success",
  ORDER_DELIVER_FAIL = "order_deliver_fail",
  ORDER_DELIVER_RESET = "order_deliver_reset",
}

// create order action
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

// order detail action
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

// order pay action
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

// user get order list action
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

// admin get all orders action
interface OrderAllRequestAction {
  type: OrderActionType.ORDER_ALL_REQUEST;
}

interface OrderAllSuccessAction {
  type: OrderActionType.ORDER_ALL_SUCCESS;
  payload: Order[];
}

interface OrderAllFailAction {
  type: OrderActionType.ORDER_ALL_FAIL;
  payload: string;
}

interface OrderAllResetAction {
  type: OrderActionType.ORDER_ALL_RESET;
}

// admin update order to delivered
interface OrderDeliverRequestAction {
  type: OrderActionType.ORDER_DELIVER_REQUEST;
}

interface OrderDeliverSuccessAction {
  type: OrderActionType.ORDER_DELIVER_SUCCESS;
}

interface OrderDeliverFailAction {
  type: OrderActionType.ORDER_DELIVER_FAIL;
  payload: string;
}

interface OrderDeliverResetAction {
  type: OrderActionType.ORDER_DELIVER_RESET;
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
  | OrderListMyResetAction
  | OrderAllRequestAction
  | OrderAllSuccessAction
  | OrderAllFailAction
  | OrderAllResetAction
  | OrderDeliverRequestAction
  | OrderDeliverSuccessAction
  | OrderDeliverFailAction
  | OrderDeliverResetAction;
