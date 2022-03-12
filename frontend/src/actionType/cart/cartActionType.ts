export enum CartActionType {
  CART_ADD_ITEM = "cart_add_item",
  CART_REMVOE_ITEM = "cart_remove_item",
  CART_SAVE_SHIPPING_ADDRESS = " cart_save_shipping_address",
  CART_SAVE_PAYMENT_METHOD = " cart_save_payment_method",
}

export interface AddtoCartPayload {
  product: string;
  name: string;
  image: string;
  price: number;
  countInStock: number;
  qty: number;
}

export interface ShippingAddress {
  address: string | undefined;
  city: string | undefined;
  postalCode: string | undefined;
  country: string | undefined;
}


export interface AddToCartAction {
  type: CartActionType.CART_ADD_ITEM;
  payload: AddtoCartPayload;
}

export interface RemoveCartAction {
  type: CartActionType.CART_REMVOE_ITEM;
  payload: string;
}

export interface SaveShippingAction {
  type: CartActionType.CART_SAVE_SHIPPING_ADDRESS;
  payload: ShippingAddress;
}

export interface SavePaymentMethodAction {
  type: CartActionType.CART_SAVE_PAYMENT_METHOD;
  payload: string;
}

export type CartAction =
  | AddToCartAction
  | RemoveCartAction
  | SaveShippingAction
  | SavePaymentMethodAction;
