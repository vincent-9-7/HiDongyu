import actionType from '../actions/actionTypes'

const initialState = {
  staffDetails: [],
  loading: false,
  error:null
}

function staffDetailReducer(state = initialState,action) {
  switch (action.type) {

    case actionType.GET_STAFFDETAIL_REQUEST:
      return {
        ...state,
        loading:true
      }

    case actionType.GET_STAFFDETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        staffDetails: action.users
      }

    case actionType.GET_STAFFDETAIL_FAILED:
      return {
        ...state,
        loading: false,
        error:action.message,
      }

    default:
      return state
  }
}

export default staffDetailReducer