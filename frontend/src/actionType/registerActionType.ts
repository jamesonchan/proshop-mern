import { UserInfo } from "../typings";

export enum RegisterActionType {
  USER_REGISTER_REQUEST = "user_register_request",
  USER_REGISTER_SUCCESS = "user_register_success",
  USER_REGISTER_FAIL = "user_register_fail",
}

export interface RegisterRequestAction {
  type: RegisterActionType.USER_REGISTER_REQUEST;
}

export interface RegisterSuccessAction {
  type: RegisterActionType.USER_REGISTER_SUCCESS;
  payload: UserInfo;
}

export interface RegisterFailAction {
  type: RegisterActionType.USER_REGISTER_FAIL;
  payload: string;
}

export type RegisterAction =
  | RegisterRequestAction
  | RegisterSuccessAction
  | RegisterFailAction;
