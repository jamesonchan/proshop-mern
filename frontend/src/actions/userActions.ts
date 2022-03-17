import axios from "axios";
import { ThunkAction } from "redux-thunk";
import {
  OrderAction,
  OrderActionType,
} from "../actionType/cart/orderActionType";
import {
  DetailAction,
  DetailActionType,
} from "../actionType/user/detailActionType";
import {
  ListAction,
  ListActionType,
  UpdateUserInfo,
} from "../actionType/user/listActionType";
import {
  LoginAction,
  LoginActionType,
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
import { RootState } from "../store";

export const login =
  (
    email: string,
    password: string
  ): ThunkAction<Promise<void>, RootState, undefined, LoginAction> =>
  async (dispatch) => {
    try {
      dispatch({ type: LoginActionType.USER_LOGIN_REQUEST });
      const config = {
        headers: {
          "Context-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/users/login",
        { email, password },
        config
      );

      dispatch({ type: LoginActionType.USER_LOGIN_SUCCESS, payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error: any) {
      dispatch({
        type: LoginActionType.USER_LOGIN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const logout =
  (): ThunkAction<
    Promise<void>,
    RootState,
    undefined,
    LoginAction | DetailAction | OrderAction | ListAction
  > =>
  async (dispatch) => {
    localStorage.removeItem("userInfo");
    dispatch({ type: LoginActionType.USER_LOGOUT });
    dispatch({ type: DetailActionType.USER_DETAIL_RESET });
    dispatch({ type: OrderActionType.ORDER_PAY_RESET });
    dispatch({ type: ListActionType.USER_LIST_RESET });
  };

export const register =
  (
    name: string,
    email: string,
    password: string
  ): ThunkAction<
    Promise<void>,
    RootState,
    undefined,
    RegisterAction | LoginAction
  > =>
  async (dispatch) => {
    try {
      dispatch({ type: RegisterActionType.USER_REGISTER_REQUEST });
      const config = {
        headers: {
          "Context-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/users",
        { name, email, password },
        config
      );

      dispatch({
        type: RegisterActionType.USER_REGISTER_SUCCESS,
        payload: data,
      });

      dispatch({ type: LoginActionType.USER_LOGIN_SUCCESS, payload: data });

      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error: any) {
      dispatch({
        type: RegisterActionType.USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getUserDetail =
  (
    id: string
  ): ThunkAction<Promise<void>, RootState, undefined, DetailAction> =>
  async (dispatch, getState) => {
    const {
      userLogin: { userInfo },
    } = getState();
    try {
      dispatch({ type: DetailActionType.USER_DETAIL_REQUEST });
      const config = {
        headers: {
          "Context-Type": "application/json",
          Authorization: `Bearer ${userInfo?.token}`,
        },
      };
      const { data } = await axios.get(`/api/users/${id}`, config);

      dispatch({
        type: DetailActionType.USER_DETAIL_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: DetailActionType.USER_DETAIL_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const updateUserProfile =
  (
    user: UpdateUserProfile
  ): ThunkAction<
    Promise<void>,
    RootState,
    undefined,
    UpdateAction | LoginAction
  > =>
  async (dispatch, getState) => {
    const {
      userLogin: { userInfo },
    } = getState();
    try {
      dispatch({ type: UpdateActionType.USER_UPDATE_REQUEST });
      const config = {
        headers: {
          "Context-Type": "application/json",
          Authorization: `Bearer ${userInfo?.token}`,
        },
      };
      const { data } = await axios.put(`/api/users/profile`, user, config);

      dispatch({
        type: UpdateActionType.USER_UPDATE_SUCCESS,
        payload: data,
      });
      dispatch({
        type: LoginActionType.USER_LOGIN_SUCCESS,
        payload: data,
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error: any) {
      dispatch({
        type: UpdateActionType.USER_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const listUsers =
  (): ThunkAction<Promise<void>, RootState, undefined, ListAction> =>
  async (dispatch, getState) => {
    const {
      userLogin: { userInfo },
    } = getState();
    try {
      dispatch({ type: ListActionType.USER_LIST_REQUEST });
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo?.token}`,
        },
      };
      const { data } = await axios.get(`/api/users`, config);

      dispatch({
        type: ListActionType.USER_LIST_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: ListActionType.USER_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteUser =
  (
    userId: string
  ): ThunkAction<Promise<void>, RootState, undefined, ListAction> =>
  async (dispatch, getState) => {
    const {
      userLogin: { userInfo },
    } = getState();
    try {
      dispatch({ type: ListActionType.USER_DELETE_REQUEST });
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo?.token}`,
        },
      };
      await axios.delete(`/api/users/${userId}`, config);

      dispatch({
        type: ListActionType.USER_DELETE_SUCCESS,
      });
    } catch (error: any) {
      dispatch({
        type: ListActionType.USER_DELETE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const updateUser =
  (
    updateUser: UpdateUserInfo
  ): ThunkAction<
    Promise<void>,
    RootState,
    undefined,
    ListAction | DetailAction
  > =>
  async (dispatch, getState) => {
    const {
      userLogin: { userInfo },
    } = getState();
    try {
      dispatch({ type: ListActionType.USER_UPDATE_REQUEST });
      const config = {
        headers: {
          "Context-Type": "application/json",
          Authorization: `Bearer ${userInfo?.token}`,
        },
      };
      const { data } = await axios.put(
        `/api/users/${updateUser._id}`,
        updateUser,
        config
      );

      dispatch({ type: ListActionType.USER_UPDATE_SUCCESS });

      dispatch({
        type: DetailActionType.USER_DETAIL_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: ListActionType.USER_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
