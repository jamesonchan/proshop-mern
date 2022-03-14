import { UserInfo } from "./loginActionType";

export enum ListActionType {
  USER_LIST_REQUEST = "user_list_request",
  USER_LIST_SUCCESS = "user_list_success",
  USER_LIST_FAIL = "user_list_fail",
  USER_LIST_RESET = "user_list_reset",

  USER_DELETE_REQUEST = "user_delete_request",
  USER_DELETE_SUCCESS = "user_delete_success",
  USER_DELETE_FAIL = "user_delete_fail",

  USER_UPDATE_REQUEST = "user_update_request",
  USER_UPDATE_SUCCESS = "user_update_success",
  USER_UPDATE_FAIL = "user_update_fail",
  USER_UPDATE_RESET = "user_update_reset",
}

export interface UpdateUserInfo {
  _id: string;
  name?: string;
  email?: string;
  isAdmin: boolean;
}

interface UserListRequestAction {
  type: ListActionType.USER_LIST_REQUEST;
}

interface UserListSuccessAction {
  type: ListActionType.USER_LIST_SUCCESS;
  payload: UserInfo[];
}

interface UserListFailAction {
  type: ListActionType.USER_LIST_FAIL;
  payload: string;
}

interface UserListResetAction {
  type: ListActionType.USER_LIST_RESET;
}

interface UserDeleteReuqestAction {
  type: ListActionType.USER_DELETE_REQUEST;
}

interface UserDeleteSuccessAction {
  type: ListActionType.USER_DELETE_SUCCESS;
}

interface UserDeleteFailAction {
  type: ListActionType.USER_DELETE_FAIL;
  payload: string;
}

interface UserUpdateRequestAction {
  type: ListActionType.USER_UPDATE_REQUEST;
}

interface UserUpdateSuccessAction {
  type: ListActionType.USER_UPDATE_SUCCESS;
}

interface UserUpdateFailAction {
  type: ListActionType.USER_UPDATE_FAIL;
  payload: string;
}

interface UserUpdateResetAction {
  type: ListActionType.USER_UPDATE_RESET;
}
export type ListAction =
  | UserListRequestAction
  | UserListSuccessAction
  | UserListFailAction
  | UserListResetAction
  | UserDeleteReuqestAction
  | UserDeleteSuccessAction
  | UserDeleteFailAction
  | UserUpdateRequestAction
  | UserUpdateSuccessAction
  | UserUpdateFailAction
  | UserUpdateResetAction;
