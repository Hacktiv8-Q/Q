import axios from "config/axios";
import { LOGIN_ADMIN, LOGIN_CASHIER } from "store/types";

export const login = (dataLogin) => (dispatch) => {
	axios({
		method: "post",
		url: "http://localhost:3000/admins/login",
		data: { email: dataLogin.email, password: dataLogin.password },
	})
		.then(({ data }) => {
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
		url: "http://localhost:3000/admins/login-cashier",
		data: { email: dataLogin.email, password: dataLogin.password },
	})
		.then(({ data }) => {
			dispatch({
				type: LOGIN_CASHIER,
				payload: data.token,
			});
		})
		.catch(console.log);
};
