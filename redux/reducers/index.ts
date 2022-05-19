import { combineReducers } from "redux";
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import queryReducer from "./queryReducer";

const rootReducer = combineReducers({
  user: userReducer,
  query: queryReducer,
  auth: authReducer
});

export default rootReducer;
