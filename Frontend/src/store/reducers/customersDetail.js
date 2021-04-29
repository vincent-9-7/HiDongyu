import actionType from '../actions/actionTypes'

const initialState = {
  cusDetails: [],
  loading: false,
  error:null
}

function cusDetailReducer(state = initialState,action) {
  switch (action.type) {

    case actionType.GET_CUSDETAIL_REQUEST:
      return {
        ...state,
        loading:true
      }

    case actionType.GET_CUSDETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        cusDetails: action.users
      }

    case actionType.GET_CUSDETAIL_FAILED:
      return {
        ...state,
        loading: false,
        error:action.message,
      }

    default:
      return state
  }
}

export default cusDetailReducer