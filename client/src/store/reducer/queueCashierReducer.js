import { FETCH_CASHIER_QUEUE } from '../types'

const initialState = {
  queues: []
}

export default function queueCashierReducer(state = initialState, { type, payload }) {
  switch (type) {
    case FETCH_CASHIER_QUEUE:
      return {
        ...state,
        queues: payload
      }
    default:
      return state
  }
}

