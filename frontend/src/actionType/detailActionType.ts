import { UserInfo } from "../typings";

export enum DetailActionType {
  USER_DETAIL_REQUEST = "user_detail_request",
  USER_DETAIL_SUCCESS = "user_detail_success",
  USER_DETAIL_FAIL = "user_detail_fail",
}

export interface DetailRequestAction {
  type: DetailActionType.USER_DETAIL_REQUEST;
}

export interface DetailSuccessAction {
  type: DetailActionType.USER_DETAIL_SUCCESS;
  payload: UserInfo;
}

export interface DetailFailAction {
  type: DetailActionType.USER_DETAIL_FAIL;
  payload: string;
}

export type DetailAction =
  | DetailRequestAction
  | DetailSuccessAction
  | DetailFailAction;
