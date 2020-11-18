import axios from "config/axios";
import { REGISTER_CUSTOMER } from "../types/index";

export function register(customer) {
  return {
    type: REGISTER_CUSTOMER,
    payload: customer,
  };
}

export const addRegister = (customer) => {
  return (dispatch) => {
    axios({
      method: "post",
      url: "/customers/register",
      data: customer,
    })
      .then((customer) => {
        dispatch(register(customer));
      })
      .catch((err) => console.log(err));
  };
};

export const registerAdmin = (admin) => {
  return (dispatch) => {
    axios({
      method: "post",
      url: "/admins/register",
      data: admin
    })
      .then((admin) => {
        dispatch(register(admin));
      })
      .catch((err) => console.log(err));
  };
};

export const registerCashier = (admin) => {
  return (dispatch) => {
    axios({
      method: "post",
      url: "/admins/register-cashier",
      data: admin
    })
      .then((admin) => {
        dispatch(register(admin));
      })
      .catch((err) => console.log(err));
  };
};
