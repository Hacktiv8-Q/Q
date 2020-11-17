import { ADD_OUTLET, FETCH_OUTLET_ADMIN } from "../types";

const initialState = {
  outlets: [],
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
    default:
      return state;
  }
}
