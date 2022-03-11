import { UpdateUserProfile } from "../typings";

export enum UpdateActionType {
  USER_UPDATE_REQUEST = "user_update_request",
  USER_UPDATE_SUCCESS = "user_update_success",
  USER_UPDATE_FAIL = "user_update_fail",
  USER_UPDATE_RESET = "user_update_reset",
}

export interface UpdateRequestAction {
  type: UpdateActionType.USER_UPDATE_REQUEST;
}

export interface UpdateSuccessAction {
  type: UpdateActionType.USER_UPDATE_SUCCESS;
  payload: UpdateUserProfile;
}

export interface UpdateFailAction {
  type: UpdateActionType.USER_UPDATE_FAIL;
  payload: string;
}

export interface UpdateResetAction {
  type: UpdateActionType.USER_UPDATE_RESET;
}

export type UpdateAction =
  | UpdateRequestAction
  | UpdateSuccessAction
  | UpdateFailAction
  | UpdateResetAction;
