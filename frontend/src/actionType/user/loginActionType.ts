export enum LoginActionType {
  USER_LOGIN_REQUEST = "user_login_request",
  USER_LOGIN_SUCCESS = "user_login_success",
  USER_LOGIN_FAIL = "user_login_fail",
  USER_LOGOUT = "user_logout",
}

export interface UserInfo {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  token: string;
}

export interface LoginRequestAction {
  type: LoginActionType.USER_LOGIN_REQUEST;
}

export interface LoginSuccessAction {
  type: LoginActionType.USER_LOGIN_SUCCESS;
  payload: UserInfo;
}

export interface LoginFailAction {
  type: LoginActionType.USER_LOGIN_FAIL;
  payload: string;
}

export interface LogoutAction {
  type: LoginActionType.USER_LOGOUT;
}

export type LoginAction =
  | LoginRequestAction
  | LoginSuccessAction
  | LoginFailAction
  | LogoutAction;
