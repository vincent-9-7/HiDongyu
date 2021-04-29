import actionTypes from '../actions/actionTypes'

const initialState = {
  users: [],
  loading: true,
  dataType: '',
  error: null,
}

function users( state = initialState, action){
  switch(action.type){
    case actionTypes.GET_USERS_REQUESTED:
      return{
        ...state,
        loading: true
      }
    case actionTypes.GET_USERS_SUCCESS:
      return{
        ...state,
        loading: false,
        dataType: 'customer',
        users: action.users
      }
    case actionTypes.GET_USERS_FAILED:
      return{
        ...state,
        loading: false,
        error: action.message
      }
    case actionTypes.GET_EMPLOYEES_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case actionTypes.GET_EMPLOYEES_SUCCESS:
      return {
        ...state,
        loading: false,
        dataType: 'staff',
        users: action.users
      }
    case actionTypes.GET_EMPLOYEES_FAILED:
      return {
        ...state,
        loading: false,
        error: action.message
      }
    case actionTypes.DELETED_CUSTOMER_REQUEST:
      return{
        ...state,
        loading: true
      }
    case actionTypes.DELETED_CUSTOMER_SUCCESS:
      return{
        ...state,
        loading: false
      }
    case actionTypes.DELETED_CUSTOMER_FAILED:
      return{
        ...state,
        loading: false,
        error: action.message
      }
    case actionTypes.DELETED_EMPLOYEE_REQUEST:
      return {
        ...state,
        loading: true
      }
    case actionTypes.DELETED_EMPLOYEE_SUCCESS:
      return {
        ...state,
        loading: false,
      }
    case actionTypes.DELETED_EMPLOYEE_FAILED:
      return {
        ...state,
        loading: false,
        error: action.message,
      }
    default:
      return state
  }
}

export default users