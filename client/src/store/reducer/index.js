import { combineReducers } from "redux";
import queue from "./queueReducer";
import customer from "./customerReducer";
import admin from "./adminReducer";

export default combineReducers({
	queue,
	customer,
});
