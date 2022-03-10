import { UserInfo } from "../typings";
import { LoginAction, LoginActionType } from "../actionType/loginActionType";
import { RootState } from "../store";

interface LoginState {
  userInfo?: UserInfo | null;
  loading?: boolean;
  error?: string | null;
}

const initialLoginState: LoginState = {
  userInfo: null,
  loading: false,
  error: null,
};

export const selectUserLogin = (rootState: RootState) => rootState.userLogin;

export const userLoginReducer = (
  state: LoginState = initialLoginState,
  action: LoginAction
): LoginState => {
  switch (action.type) {
    case LoginActionType.USER_LOGIN_REQUEST:
      return { ...state, loading: true };
    case LoginActionType.USER_LOGIN_SUCCESS:
      return { ...state, loading: false, userInfo: action.payload };
    case LoginActionType.USER_LOGIN_FAIL:
      return { ...state, loading: false, error: action.payload };
    case LoginActionType.USER_LOGOUT:
      return {};

    default:
      return state;
  }
};
