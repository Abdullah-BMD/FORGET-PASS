import { combineReducers } from "redux";

import { adminReducer } from "store/redux/slices/adminSlice";
// Web3 Connect

import { modelReducer } from "./slices/helperSlices/modelSlice";
import { loginDataRedcuer } from "store/redux/slices/loginDataSlice";
import { resetPasswordRedcuer } from "store/redux/slices/resetPasswordSlice"


const parentReducer = combineReducers({
  model: modelReducer,
  admin : adminReducer  , 
  login: loginDataRedcuer,
  resetPass : resetPasswordRedcuer , 
 })

export default parentReducer;
