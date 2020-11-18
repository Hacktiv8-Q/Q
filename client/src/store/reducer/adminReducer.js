import { LOGIN_ADMIN, LOGIN_CASHIER } from "../types";

const initialState = {
	token: "",
};

export default function adminReducer(state = initialState, { type, payload }) {
	switch (type) {
		case LOGIN_ADMIN:
			return {
				...state,
				token: payload,
			};
		case LOGIN_CASHIER:
			return {
				...state,
				token: payload,
			};
		default:
			return state;
	}
}
