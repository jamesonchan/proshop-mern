import axios from "axios";
import { ThunkAction } from "redux-thunk";
import { DetailAction, DetailActionType } from "../actionType/detailActionType";
import { LoginAction, LoginActionType } from "../actionType/loginActionType";
import {
  RegisterAction,
  RegisterActionType,
} from "../actionType/registerActionType";
import { UpdateAction, UpdateActionType } from "../actionType/updateActionType";
import { RootState } from "../store";
import { UpdateUserProfile, UserInfo } from "../typings";

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
  (): ThunkAction<Promise<void>, RootState, undefined, LoginAction> =>
  async (dispatch) => {
    localStorage.removeItem("userInfo");
    dispatch({ type: LoginActionType.USER_LOGOUT });
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
  ): ThunkAction<Promise<void>, RootState, undefined, UpdateAction> =>
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
