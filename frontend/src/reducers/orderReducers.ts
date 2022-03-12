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
  isDelivered?: false;
  _id?: string;
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
