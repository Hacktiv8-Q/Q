import { ADD_OUTLET, FETCH_OUTLET_ADMIN, FETCH_OUTLET_ADMIN_BY_ID, FETCH_OUTLET } from "../types";

const initialState = {
  outlets: [],
  outletsCustomer: []
};

export default function adminReducer(state = initialState, { type, payload }) {
  switch (type) {
    case ADD_OUTLET:
      return {
        ...state,
        outlets: [...state.outlets, payload.outlet]
      };
    case FETCH_OUTLET_ADMIN:
      return {
        ...state,
        outlets: payload
      };
    case FETCH_OUTLET_ADMIN_BY_ID:
      return {
        ...state,
        outlets: payload
      };
    case FETCH_OUTLET:
      return {
        ...state,
        outletsCustomer: payload
      };
    default:
      return state;
  }
}
