import { FETCH_OUTLET } from '../types'

const initialState = {
  outlet: [],
}

export default function outletReducer(state = initialState, { type, payload }) {
  switch (type) {
    case FETCH_OUTLET:
      return {
        ...state,
        outlet: payload
      }

    default:
      return state
  }
}