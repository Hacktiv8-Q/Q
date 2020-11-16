import { LOGIN } from '../types'

const initialState = {
  token: ""
}

export default function customerReducer(state = initialState, { type, payload }) {
  switch (type) {
    case LOGIN:
      return {
        ...state,
        token: payload
      }

    default:
      return state
  }
}