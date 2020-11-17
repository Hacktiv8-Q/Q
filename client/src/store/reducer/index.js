import { combineReducers } from 'redux'
import queue from './queueReducer'
import customer from './customerReducer'
import outlet from './outletRecuder'

export default combineReducers({
  queue,
  customer,
  outlet
})
