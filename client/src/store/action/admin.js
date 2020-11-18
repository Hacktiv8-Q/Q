import axios from "config/axios";
import { LOGIN_ADMIN } from "store/types";

export const loginAdmin = (dataLogin) => (dispatch) => {
  axios({
    method: "post",
    url: "/admins/login",
    data: { email: dataLogin.email, password: dataLogin.password },
  })
    .then(({ data }) => {
      localStorage.setItem("tokenAdmin", data.token);
      dispatch({
        type: LOGIN_ADMIN,
        payload: data.token,
      });
    })
    .catch(console.log);
};

export const loginCashier = (dataLogin) => (dispatch) => {
  axios({
    method: "post",
    url: "/admins/login-cashier",
    data: { email: dataLogin.email, password: dataLogin.password },
  })
    .then(({ data }) => {
      localStorage.setItem("tokenCashier", data.token);
      localStorage.setItem("outletId", data.payload.OutletId);
      dispatch({
        type: LOGIN_ADMIN,
        payload: data.token,
      });
    })
    .catch(console.log);
};
