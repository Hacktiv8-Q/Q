import { FETCH_QUEUE, ADD_QUEUE, FETCH_QUEUE_DETAIL, CLEAR_QUEUE } from '../types'

const initialState = {
  queue: [],
  newQueue: {},
  queueDetail: []
}

export default function queueReducer(state = initialState, { type, payload }) {
  switch (type) {
    case FETCH_QUEUE:
      return {
        ...state,
        queue: payload
      }
    case FETCH_QUEUE_DETAIL:
      return {
        ...state,
        queueDetail: state.queueDetail.concat(payload)
      }
    case ADD_QUEUE:
      return {
        ...state,
        newQueue: payload
      }
    case CLEAR_QUEUE:
      return {
        ...state,
        queue: [],
        queueDetail: []
      }
    default:
      return state
  }
}

