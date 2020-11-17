import { combineReducers } from "redux";
import queue from "./queueReducer";
import customer from "./customerReducer";
import admin from "./adminReducer";
import outlet from './outletReducer'

export default combineReducers({
	queue,
	customer,
	admin,
	outlet
});
