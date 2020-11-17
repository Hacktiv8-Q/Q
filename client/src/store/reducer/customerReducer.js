import { LOGIN_CUSTOMER } from '../types/index'

const initialState = {
  token: ""
}

export default function customerReducer(state = initialState, { type, payload }) {
  switch (type) {
    case LOGIN_CUSTOMER:
      return {
        ...state,
        token: payload
      }

    default:
      return state
  }
}