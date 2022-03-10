import axios from "axios";
import { ThunkAction } from "redux-thunk";
import { LoginAction, LoginActionType } from "../actionType/loginActionType";
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
  (): ThunkAction<Promise<void>, RootState, undefined, LoginAction> =>
  async (dispatch) => {
    localStorage.removeItem("userInfo");
    dispatch({ type: LoginActionType.USER_LOGOUT });
  };
