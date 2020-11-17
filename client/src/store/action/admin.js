import axios from "config/axios";
import { LOGIN_ADMIN } from "store/types";

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
