/* eslint-disable */
import actionType from '../actions/actionTypes'

const initialState = {
  loading: false,
  updateing: false,
  loadingNum: 1,
  error: null,
  payment: false,
  order: {
    result: [],
    count: 0,
    page: ''
  },
  test:1,
  row: 0,
  completeinfo: {
    info: localStorage.getItem('Order') ?
      JSON.parse(localStorage.getItem('Order')) : ''
  },
  updateData: 'no update'
}

function orderReducer(state = initialState, action) {
  switch (action.type) {

    case actionType.PAY_ORDER_SUCCESS:
      return {
        ...state,
        payment: true
      }

    case actionType.GET_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      }

    case actionType.GET_ORDER_SUCCESS:
      state.order.result = [action.repos]
      return {
        ...state,
        loading: false,
        row:0,
        order: {result: [action.repos], count:1, page: 'order'}
      }

    case actionType.GET_ORDER_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload
      }

    case actionType.UPDATE_ORDER_REQUEST:
      return {
        ...state,
        loading: true
      }

    case actionType.UPDATE_ORDER_SUCCESS:
      let order = {...state.order.result[state.row], ...action.repos}
      let newResult = [...state.order.result]
      newResult[state.row] = order
      return {
        ...state,
        loading: false,
        updateData: action.repos,
        order:{...state.order, result: newResult}
      }

    case actionType.UPDATE_ORDER_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload
      }

    case actionType.POST_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
        completeinfo: null
      }

    case actionType.POST_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        loadingNum: 2,
        order: action.postInSaga, 
        completeinfo: action.postInSaga 
      }

    case actionType.POST_ORDER_FAILED:
      return {
        ...state,
        loading: false,
        order: [],
        error: action.errorInSaga,
      }

    case actionType.GET_ALL_ORDERS_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case actionType.GET_ALL_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        order: {...action.orders, page: "orders"}
      }
    case actionType.GET_ALL_ORDERS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.message
      }

    case actionType.CHANGE_ORDER:
      return {
        ...state,
        row: action.payload
      }

    case actionType.UPDATE_ASSIGN_REQUEST:
      return {
        ...state,
        loading: true,
      }

    case actionType.UPDATE_ASSIGN_SUCCESS:
      return {
        ...state,
        loading: false,
      }

    case actionType.UPDATE_ASSIGN_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload
      }

    case actionType.GET_ORDERSBYTARGET_REQUEST:
      return {
        ...state,
        loading:true
    }

    case actionType.GET_ORDERSBYTARGET_SUCCESS:
      return {
        ...state,
        loading: false,
        order:{result:action.users, count:action.users.length, page:"orderbytarget"}
      }

    case actionType.GET_ORDERSBYTARGET_FAILED:
      return {
        ...state,
        loading: false,
        error:action.message,
      }    
    default:
      return state
  }
}

export default orderReducer