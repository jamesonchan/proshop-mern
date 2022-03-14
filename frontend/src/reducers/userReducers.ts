import { RootState } from "../store";
import {
  DetailAction,
  DetailActionType,
} from "../actionType/user/detailActionType";
import {
  LoginAction,
  LoginActionType,
  UserInfo,
} from "../actionType/user/loginActionType";
import {
  RegisterAction,
  RegisterActionType,
} from "../actionType/user/registerActionType";
import {
  UpdateAction,
  UpdateActionType,
  UpdateUserProfile,
} from "../actionType/user/updateActionType";
import { ListAction, ListActionType } from "../actionType/user/listActionType";

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

interface RegisterState {
  userInfo?: UserInfo | null;
  loading?: boolean;
  error?: string | null;
}

const initialRegisterState: RegisterState = {
  userInfo: null,
  loading: false,
  error: null,
};

export const selectRegister = (rootState: RootState) => rootState.userRegister;

export const userRegisterReducer = (
  state: RegisterState = initialRegisterState,
  action: RegisterAction
): RegisterState => {
  switch (action.type) {
    case RegisterActionType.USER_REGISTER_REQUEST:
      return { loading: true };
    case RegisterActionType.USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case RegisterActionType.USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

interface DetailState {
  user?: UserInfo | null;
  loading?: boolean;
  error?: string | null;
}

const initialDetailState: DetailState = {
  user: null,
  loading: false,
  error: null,
};

export const selectUserDetail = (rootState: RootState) => rootState.userDetail;

export const userDetailReducer = (
  state: DetailState = initialDetailState,
  action: DetailAction
): DetailState => {
  switch (action.type) {
    case DetailActionType.USER_DETAIL_REQUEST:
      return { ...state, loading: true };
    case DetailActionType.USER_DETAIL_SUCCESS:
      return { loading: false, user: action.payload };
    case DetailActionType.USER_DETAIL_FAIL:
      return { loading: false, error: action.payload };
    case DetailActionType.USER_DETAIL_RESET:
      return { user: null };

    default:
      return state;
  }
};

interface UpdateState {
  userInfo?: UpdateUserProfile | null;
  success?: boolean;
  loading?: boolean;
  error?: string | null;
}

const initialUpdateState: UpdateState = {
  userInfo: null,
  success: false,
  loading: false,
  error: null,
};

export const selectUpdateProfile = (rootState: RootState) =>
  rootState.userUpdateProfile;

export const userUpdateProfileReducer = (
  state: UpdateState = initialUpdateState,
  action: UpdateAction
): UpdateState => {
  switch (action.type) {
    case UpdateActionType.USER_UPDATE_REQUEST:
      return { loading: true };
    case UpdateActionType.USER_UPDATE_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload };
    case UpdateActionType.USER_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case UpdateActionType.USER_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

interface UserListState {
  users?: UserInfo[];
  loading?: boolean;
  error?: string | null;
}

const initialUserListState: UserListState = {
  users: [],
  loading: false,
  error: null,
};

export const selectUserList = (rootState: RootState) => rootState.userList;

export const userListReducer = (
  state: UserListState = initialUserListState,
  action: ListAction
): UserListState => {
  switch (action.type) {
    case ListActionType.USER_LIST_REQUEST:
      return { loading: true };
    case ListActionType.USER_LIST_SUCCESS:
      return { loading: false, users: action.payload };
    case ListActionType.USER_LIST_FAIL:
      return { loading: false, error: action.payload };
    case ListActionType.USER_LIST_RESET:
      return { users: [] };

    default:
      return state;
  }
};

interface UserDeleteState {
  loading: boolean;
  success?: boolean;
  error?: string | null;
}

const initialUserDeleteState: UserDeleteState = {
  loading: false,
  success: false,
  error: null,
};

export const selectUserDelete = (rootState: RootState) => rootState.userDelete;

export const userDeleteReducer = (
  state: UserDeleteState = initialUserDeleteState,
  action: ListAction
): UserDeleteState => {
  switch (action.type) {
    case ListActionType.USER_DELETE_REQUEST:
      return { loading: true };
    case ListActionType.USER_DELETE_SUCCESS:
      return { loading: false, success: true };
    case ListActionType.USER_DELETE_FAIL:
      return { loading: false, error: action.payload, success: false };

    default:
      return state;
  }
};

interface UserUpdateState {
  success?: boolean;
  loading?: boolean;
  error?: string | null;
}

const initialUserUpdateState: UserUpdateState = {
  success: false,
  loading: false,
  error: null,
};

export const selectUserUpdate = (rootState: RootState) => rootState.userUpdate;

export const userUpdateReducer = (
  state: UserUpdateState = initialUserUpdateState,
  action: ListAction
): UserUpdateState => {
  switch (action.type) {
    case ListActionType.USER_UPDATE_REQUEST:
      return { loading: true };
    case ListActionType.USER_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case ListActionType.USER_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case ListActionType.USER_UPDATE_RESET:
      return {};

    default:
      return state;
  }
};
