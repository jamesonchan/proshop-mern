import { ProductProp } from "../typings";

export enum CartActionType {
  CART_ADD_ITEM = "cart_add_item",
  CART_REMVOE_ITEM = "cart_remove_item",
}

export interface AddtoCartPayload {
  product: string;
  name: string;
  image: string;
  price: number;
  countInStock: number;
  qty: number;
}

export interface AddToCartAction {
  type: CartActionType.CART_ADD_ITEM;
  payload: AddtoCartPayload;
}

export interface RemoveCartAction {
  type: CartActionType.CART_REMVOE_ITEM;
  payload: string;
}

export type CartAction = AddToCartAction | RemoveCartAction;
