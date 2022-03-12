import {
  AddtoCartPayload,
  CartAction,
  CartActionType,
  ShippingAddress,
} from "../actionType/cart/cartActionType";
import { RootState } from "../store";

interface CartState {
  cartItems: AddtoCartPayload[];
  shippingAddress: ShippingAddress | null;
  paymentMethod: string | null;
  itemsPrice?: number;
  shippingPrice?: number;
  taxPrice?: number;
  totalPrice?: number | string;
}

const initailCartState: CartState = {
  cartItems: [],
  shippingAddress: null,
  paymentMethod: null,
  itemsPrice: 0,
  shippingPrice: 0,
  taxPrice: 0,
  totalPrice: 0,
};

export const selectCart = (rootState: RootState) => rootState.cart;

export const cartReducer = (
  state: CartState = initailCartState,
  action: CartAction
): CartState => {
  switch (action.type) {
    case CartActionType.CART_ADD_ITEM:
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.product === item.product);
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    case CartActionType.CART_REMVOE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };

    case CartActionType.CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };

    case CartActionType.CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };

    default:
      return state;
  }
};
