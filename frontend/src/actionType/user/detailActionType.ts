import { UserInfo } from "./loginActionType";

export enum DetailActionType {
  USER_DETAIL_REQUEST = "user_detail_request",
  USER_DETAIL_SUCCESS = "user_detail_success",
  USER_DETAIL_FAIL = "user_detail_fail",
  USER_DETAIL_RESET = "user_detail_reset",
}

interface DetailRequestAction {
  type: DetailActionType.USER_DETAIL_REQUEST;
}

interface DetailSuccessAction {
  type: DetailActionType.USER_DETAIL_SUCCESS;
  payload: UserInfo;
}

interface DetailFailAction {
  type: DetailActionType.USER_DETAIL_FAIL;
  payload: string;
}

interface DetailResetAction {
  type: DetailActionType.USER_DETAIL_RESET;
}

export type DetailAction =
  | DetailRequestAction
  | DetailSuccessAction
  | DetailFailAction
  | DetailResetAction;
