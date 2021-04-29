import actionTypes from '../actions/actionTypes'

export const employeeRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.EMPLOYEE_REGISTER_REQUEST:
      return { loading: true }
    case actionTypes.EMPLOYEE_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload }
    case actionTypes.EMPLOYEE_REGISTER_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const employeeSigninReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.EMPLOYEE_SIGNIN_REQUEST:
      return { loading: true }
    case actionTypes.EMPLOYEE_SIGNIN_SUCCESS:
      return { loading: false, userInfo: action.payload }
    case actionTypes.EMPLOYEE_SIGNIN_FAIL:
      return { loading: false, error: action.payload }
    case actionTypes.EMPLOYEE_SIGNOUT_REQUEST:
      return {}
    case actionTypes.EMPLOYEE_SIGNOUT:
      return {}
    default:
      return state
  }
}
