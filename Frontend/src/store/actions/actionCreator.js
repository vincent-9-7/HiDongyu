/* eslint-disable import/prefer-default-export */
import actionTypes from "./actionTypes"


export const loadOrdersSucceeded = res => ({
  type: actionTypes.LOAD_ORDER_SUCCEEDED,
  data: res
})

export const loadOrdersFailed = err => ({
  type: actionTypes.LOAD_ORDER_FAILED,
  data: { err }
})


export const getOrderRequest = (datalist) => ({
  type: actionTypes.GET_ORDER_REQUEST,
  payload: datalist,
})
export const getOrderSuccess = (datalist) => ({
  type: actionTypes.GET_ORDER_SUCCESS,
  payload: datalist,
})
export const getOrderFaild = (err) => ({
  type: actionTypes.GET_ORDER_FAILED,
  payload: err,
})


export const postOrderRequest = (obj) => ({
  type: actionTypes.POST_ORDER_REQUEST,
  payload: obj, 
})
export const postOrderSuccess = (obj) => ({
  type: actionTypes.POST_ORDER_SUCCESS,
  payload: obj,
})
export function postOrderFaild(obj) {
  return {
    type: actionTypes.POST_ORDER_FAILED,
    payload: obj,
  }
}

export const payOrderRequest = (obj) => ({
  type: actionTypes.PAY_ORDER_REQUEST,
  payload: obj,
})
export const payOrderSuccess = (obj) => ({
  type: actionTypes.PAY_ORDER_SUCCESS,
  payload: obj,
})

export const updateOrderRequest = (obj) => ({
  type: actionTypes.UPDATE_ORDER_REQUEST,
  payload: obj, 
})
export const updateOrderSuccess = (obj) => ({
  type: actionTypes.UPDATE_ORDER_SUCCESS,
  payload: obj,
})
export const updateOrderFaild = (obj) => ({
  type: actionTypes.UPDATE_ORDER_FAILED,
  payload: obj,
})

export const updateAssignRequest = (obj) => ({
  type: actionTypes.UPDATE_ASSIGN_REQUEST,
  payload: obj, 
})
export const updateAssignSuccess = (obj) => ({
  type: actionTypes.UPDATE_ASSIGN_SUCCESS,
  payload: obj,
})
export const updateAssignFaild = (obj) => ({
  type: actionTypes.UPDATE_ASSIGN_FAILED,
  payload: obj,
})

export const getAllUserListRequest = users => ({
  type: actionTypes.GET_USERS_REQUESTED,
  payload: users,
})

export const getAllEmployeeListRequest = employees => ({
  type: actionTypes.GET_EMPLOYEES_REQUESTED,
  payload: employees,
})



export const getHistoryRequest = (datalist) => ({
  type: actionTypes.GET_HISTORY_REQUEST,
  payload: datalist,
})

export const getHistorySuccess = (datalist) => ({
  type: actionTypes.GET_HISTORY_SUCCESS,
  payload: datalist,
})
export const getHistoryFailed = (err) => ({
  type: actionTypes.GET_HISTORY_FAILED,
  payload: err,
})

export const updateProfileRequest = (datalist) => ({
  type: actionTypes.UPDATE_PROFILE_REQUEST,
  payload: datalist,
})

export const updateProfileSuccess = (datalist) => ({
  type: actionTypes.UPDATE_PROFILE_SUCCESS,
  payload: datalist,
})
export const updateProfileFailed = (err) => ({
  type: actionTypes.UPDATE_PROFILE_FAILED,
  payload: err,
})


export const getSTAFFDETAILRequest = (users) => ({
  type: actionTypes.GET_STAFFDETAIL_REQUEST,
  payload: users,
})

export const getSTAFFDETAILTABLERequest = (users) => ({
  type: actionTypes.GET_STAFFDETAILTABLE_REQUEST,
  payload: users,
})

export const getCUSDETAILRequest = (users) => ({
  type: actionTypes.GET_CUSDETAIL_REQUEST,
  payload: users,
})

export const getOrderByTargetRequest = (users) => ({
  type: actionTypes.GET_ORDERSBYTARGET_REQUEST,
  payload: users,
})


export const signin = (payload) => ({
  type: actionTypes.USER_SIGNIN_REQUEST,
  payload,
})

export const register = (payload) => ({
  type: actionTypes.USER_REGISTER_REQUEST,
  payload,
})

export const signout = () => ({
  type: actionTypes.USER_SIGNOUT_REQUEST,
})


export const signinEmployee = (payload) => ({
  type: actionTypes.EMPLOYEE_SIGNIN_REQUEST,
  payload,
})

export const registerEmployee = (payload) => ({
  type: actionTypes.EMPLOYEE_REGISTER_REQUEST,
  payload,
})

export const signoutEmployee = () => ({
  type: actionTypes.EMPLOYEE_SIGNOUT_REQUEST,
})

export const getAllOrersRequest = orders => ({
  type: actionTypes.GET_ALL_ORDERS_REQUESTED,
  payload: orders
})

export const forgetpassword = (payload) => ({
  type: actionTypes.USER_EMAIL_REQUEST,
  payload,
})

export const forgetpasswordEmployee = (payload) => ({
  type: actionTypes.EMPLOYEE_EMAIL_REQUEST,
  payload,
})


export const resetpassword = (payload) => ({
  type: actionTypes.USER_RESET_REQUEST,
  payload,
})


export const resetpasswordEmployee = (payload) => ({
  type: actionTypes.EMPLOYEE_RESET_REQUEST,
  payload,
})

export const deletedCustomerRequest = (users, listSize) => ({
  type: actionTypes.DELETED_CUSTOMER_REQUEST,
  payload: users,
  listSize: listSize
})

export const deletedEmployeeRequest = (users, listSize) => ({
  type: actionTypes.DELETED_EMPLOYEE_REQUEST,
  payload: users,
  listSize: listSize
})

export const deletedUserRefetch = num => ({
  type: actionTypes.DELETED_USER_ACTION,
  payload: num
})

export const changeOrder = num => ({
  type: actionTypes.CHANGE_ORDER,
  payload: num
})

export const getStatsRequest = () => ({
  type: actionTypes.GET_STATS_REQUEST,
})

export const getStatsSuccess = (data) => ({
  type: actionTypes.GET_STATS_SUCCESS,
  payload:data
})

export const getStatsFaild = (err) => ({
  type: actionTypes.GET_STATS_FAILED,
  payload: err,
})

