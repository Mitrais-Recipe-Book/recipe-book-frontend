import { combineReducers } from "redux";
import userReducer from "./userReducer";
import tagSlice from "./tagReducer";

const rootReducer = combineReducers({
  user: userReducer,
  tags: tagSlice,
});

export default rootReducer;
