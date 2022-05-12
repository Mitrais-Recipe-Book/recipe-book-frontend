import { combineReducers } from "redux";
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import tagSlice from "./tagReducer";

const rootReducer = combineReducers({
  user: userReducer,
  tags: tagSlice,
  auth: authReducer
});

export default rootReducer;
