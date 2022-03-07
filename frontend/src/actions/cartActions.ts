import axios from "axios";
import { ThunkAction } from "redux-thunk";
import { CartAction, CartActionType } from "../actionType/cartActionType";
import { RootState } from "../store";

export const addToCart =
  (
    id: string,
    qty: number
  ): ThunkAction<Promise<void>, RootState, undefined, CartAction> =>
  async (dispatch, getState) => {
    const { data } = await axios.get(`/api/products/${id}`);

    dispatch({
      type: CartActionType.CART_ADD_ITEM,
      payload: {
        product: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        qty,
      },
    });
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  };

export const removeFromCart =
  (id: string): ThunkAction<Promise<void>, RootState, undefined, CartAction> =>
  async (dispatch, getState) => {
    dispatch({
      type: CartActionType.CART_REMVOE_ITEM,
      payload: id,
    });

    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  };
