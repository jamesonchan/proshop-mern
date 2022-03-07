import {
  AddtoCartPayload,
  CartAction,
  CartActionType,
} from "../actionType/cartActionType";
import { RootState } from "../store";

interface CartState {
  cartItems: AddtoCartPayload[];
}

const initailCartState: CartState = {
  cartItems: [],
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

    default:
      return state;
  }
};
