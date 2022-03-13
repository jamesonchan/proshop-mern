import {
  AddtoCartPayload,
  ShippingAddress,
} from "../actionType/cart/cartActionType";
import {
  OrderAction,
  OrderActionType,
} from "../actionType/cart/orderActionType";
import { RootState } from "../store";

export interface Order {
  orderItems: AddtoCartPayload[];
  shippingAddress: ShippingAddress | null;
  paymentMethod: string | null;
  itemsPrice: number | undefined;
  shippingPrice: number | undefined;
  taxPrice: number | undefined;
  totalPrice: string | number | undefined;
  isPaid?: false;
  paidAt?: string;
  isDelivered?: false;
  deliveredAt?: string;
  _id?: string;
  user?: OrderUserInfo;
  createdAt?: string;
}

interface OrderUserInfo {
  _id: string;
  name: string;
  email: string;
}

interface OrderCreateState {
  order?: Order | null;
  loading: boolean;
  success?: boolean;
  error?: string | null;
}

const initialOrderCreateState = {
  order: null,
  loading: false,
  success: false,
  error: null,
};

export const selectOrderCreate = (rootState: RootState) =>
  rootState.orderCreate;

export const orderCreateReducer = (
  state: OrderCreateState = initialOrderCreateState,
  action: OrderAction
): OrderCreateState => {
  switch (action.type) {
    case OrderActionType.ORDER_CREATE_REQUEST:
      return { loading: true };

    case OrderActionType.ORDER_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        order: action.payload,
      };

    case OrderActionType.ORDER_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

interface OrderDetailState {
  order?: Order | null;
  loading: boolean;
  error?: string | null;
}

const initialOrderDetailState: OrderDetailState = {
  order: null,
  loading: true,
  error: null,
};

export const selectOrderDetail = (rootState: RootState) =>
  rootState.orderDetail;

export const orderDetailReducer = (
  state: OrderDetailState = initialOrderDetailState,
  action: OrderAction
): OrderDetailState => {
  switch (action.type) {
    case OrderActionType.ORDER_DETAIL_REQUEST:
      return { loading: true };
    case OrderActionType.ORDER_DETAIL_SUCCESS:
      return { loading: false, order: action.payload };
    case OrderActionType.ORDER_DETAIL_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

interface OrderPayState {
  loading?: boolean;
  success?: boolean;
  error?: string | null;
}

const initialOrderPayState: OrderPayState = {
  loading: false,
  success: false,
  error: null,
};

export const selectOrderPay = (rootState: RootState) => rootState.orderPay;

export const orderPayReducer = (
  state: OrderPayState = initialOrderPayState,
  action: OrderAction
): OrderPayState => {
  switch (action.type) {
    case OrderActionType.ORDER_PAY_REQUEST:
      return { loading: true };
    case OrderActionType.ORDER_PAY_SUCCESS:
      return { loading: false, success: true };
    case OrderActionType.ORDER_PAY_FAIL:
      return { loading: false, error: action.payload };
    case OrderActionType.ORDER_PAY_RESET:
      return {};

    default:
      return state;
  }
};

interface OrderListMyState {
  orders?: Order[];
  loading?: boolean;
  error?: string | null;
}

const initialOrderListMyState: OrderListMyState = {
  orders: [],
  loading: false,
  error: null,
};

export const selectOrderListMy = (rootState: RootState) =>
  rootState.orderListMy;

export const orderListMyReducer = (
  state: OrderListMyState = initialOrderListMyState,
  action: OrderAction
): OrderListMyState => {
  switch (action.type) {
    case OrderActionType.ORDER_LIST_MY_REQUEST:
      return { loading: true };
    case OrderActionType.ORDER_LIST_MY_SUCCESS:
      return { loading: false, orders: action.payload };
    case OrderActionType.ORDER_LIST_MY_FAIL:
      return { loading: false, error: action.payload };
    case OrderActionType.ORDER_LIST_MY_RESET:
      return { orders: [] };
    default:
      return state;
  }
};
