import { REGISTER_CUSTOMER } from "../types/index";

export function register(customer) {
	return {
		type: REGISTER_CUSTOMER,
		payload: customer,
	};
}

export const addRegister = (customer) => {
	return (dispatch) => {
		fetch("http://localhost:3000/customers/register", {
			method: "post",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(customer),
		})
			.then((resp) => resp.json())
			.then((customer) => {
				dispatch(register(customer));
			})
			.catch((err) => console.log(err));
	};
};

export const registerAdmin = (admin) => {
	return (dispatch) => {
		fetch("http://localhost:3000/admins/register", {
			method: "post",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(admin),
		})
			.then((resp) => resp.json())
			.then((admin) => {
				dispatch(register(admin));
			})
			.catch((err) => console.log(err));
	};
};

export const registerCashier = (admin) => {
	return (dispatch) => {
		fetch("http://localhost:3000/admins/register-cashier", {
			method: "post",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(admin),
		})
			.then((resp) => resp.json())
			.then((admin) => {
				dispatch(register(admin));
			})
			.catch((err) => console.log(err));
	};
};
