import { combineReducers } from 'redux'
import queue from './queueReducer'
import customer from './customerReducer'

export default combineReducers({
  queue,
  customer
})
