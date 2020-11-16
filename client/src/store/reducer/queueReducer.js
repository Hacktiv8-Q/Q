import { FETCH_QUEUE, ADD_QUEUE } from '../types'

const initialState = {
  queue: [],
  newQueue: {} //OutletId, CustomerId, status, uniqueCode 
}

export default function queueReducer(state = initialState, { type, payload }) {
  switch (type) {
    case FETCH_QUEUE:
      return {
        ...state,
        queue: payload
      }
    case ADD_QUEUE:
      return {
        ...state,
        newQueue: payload
      }
    default:
      return state
  }
}

