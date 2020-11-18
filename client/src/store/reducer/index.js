import { combineReducers } from 'redux'
import queue from './queueReducer'
import customer from './customerReducer'
import outlet from './outletRecuder'
import admin from "./adminReducer";

export default combineReducers({
  queue,
  customer,
  admin,
  outlet
})
