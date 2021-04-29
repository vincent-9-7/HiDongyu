import actionTypes from '../actions/actionTypes'

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.USER_REGISTER_REQUEST:
      return { loading: true }
    case actionTypes.USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload }
    case actionTypes.USER_REGISTER_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const userSigninReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.USER_SIGNIN_REQUEST:
      return { loading: true }
    case actionTypes.USER_SIGNIN_SUCCESS:
      return { loading: false, userInfo: action.payload }
    case actionTypes.USER_SIGNIN_FAIL:
      return { loading: false, error: action.payload }
    case actionTypes.USER_SIGNOUT_REQUEST:
      return {}
    case actionTypes.USER_SIGNOUT:
      return {}
    default:
      return state
  }
}
