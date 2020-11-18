import { combineReducers } from 'redux'
import queue from './queueReducer'
import customer from './customerReducer'
import outlet from './outletReducer'
import admin from "./adminReducer";
import queueCashier from "./queueCashierReducer";

export default combineReducers({
  queue,
  customer,
  admin,
  queueCashier,
  outlet,
});
