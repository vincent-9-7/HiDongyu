import actionTypes from '../actions/actionTypes'

export const resetPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.USER_RESET_REQUEST:
      return { loading: true }
    case actionTypes.USER_RESET_REQUEST_SUCCESS:
      return { loading: false, userInfo: action.payload }
    case actionTypes.USER_RESET_REQUEST_FAILED:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}


export const resetPasswordEmployeeReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.EMPLOYEE_RESET_REQUEST:
      return { loading: true }
    case actionTypes.EMPLOYEE_RESET_SUCCESS:
      return { loading: false, userInfo: action.payload }
    case actionTypes.EMPLOYEE_RESET_FAILED:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}


export const forgetPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.USER_EMAIL_REQUEST:
      return { loading: true }
    case actionTypes.USER_EMAIL_REQUEST_SUCCESS:
      return { loading: false, userInfo: action.payload }
    case actionTypes.USER_EMAIL_REQUEST_FAILED:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}


export const forgetPasswordEmployeeReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.EMPLOYEE_EMAIL_REQUEST:
      return { loading: true }
    case actionTypes.EMPLOYEE_EMAIL_REQUEST_SUCCESS:
      return { loading: false, userInfo: action.payload }
    case actionTypes.EMPLOYEE_EMAIL_REQUEST_FAILED:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
