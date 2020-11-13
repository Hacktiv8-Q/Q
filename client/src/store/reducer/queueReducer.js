import { FETCH_QUEUE } from '../types'

const initialState = {
  queue: []
}

export default function queueReducer(state = initialState, { type, payload }) {
  switch (type) {
    case FETCH_QUEUE:
      return {
        ...state,
        queue: payload
      }

    default:
      return state
  }
}

