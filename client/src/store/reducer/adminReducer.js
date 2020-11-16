import { LOGIN_ADMIN } from '../types/index'

const initialState = {
  token: ''
}

export default function adminReducer(state = initialState, { type, payload }) {
  switch (type) {
    case LOGIN_ADMIN:
      return {
        ...state,
        token: payload
      }
    default:
      return state
  }
}