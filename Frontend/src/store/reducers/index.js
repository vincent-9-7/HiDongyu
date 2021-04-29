
import { combineReducers } from 'redux'
import userslist from './userslist'
import order from './orderReducer'
import CusDetails from "./customersDetail"
import StaffDetails from './staffsDetail'
import stats from "./stats"
import emplyeeReducer from './emplyeeDetail'
import { userRegisterReducer, userSigninReducer } from './userReducer'
import {employeeRegisterReducer,employeeSigninReducer} from './employeeReducer'
import{forgetPasswordReducer,
resetPasswordReducer,forgetPasswordEmployeeReducer,
resetPasswordEmployeeReducer} from './forgetPassword'

const rootReducer = combineReducers({
  order,
  userslist,
  stats,
  cusDetails:CusDetails,
  staffDetails:StaffDetails,
  userRegister: userRegisterReducer,
  userSignin: userSigninReducer,
  employee_in_reducer_index: emplyeeReducer,
  employeeSignin: employeeSigninReducer,
  employeeRegister: employeeRegisterReducer,
  forgetPassword:forgetPasswordReducer,
  resetPassword:resetPasswordReducer,
  forgetpasswordEmployee:forgetPasswordEmployeeReducer,
  resetpasswordEmployee: resetPasswordEmployeeReducer
})
export default rootReducer
