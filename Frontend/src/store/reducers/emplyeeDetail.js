
import actionType from '../actions/actionTypes'

const initialState = {
  loading: false,
  repos_in_reducer_init: [],
  error:null,
  ABN:123,
  profile:false,
  profileDe:[],
}
function profileDetail(state = initialState,action) {
  switch (action.type) {

    case actionType.GET_HISTORY_REQUEST:
      return {
        ...state,
        loading:true
      }

    case actionType.GET_HISTORY_SUCCESS:
      return {
        ...state,
        loading: false,
        repos_in_reducer_init: action.payload
      }

    case actionType.GET_HISTORY_FAILED:
      return {
        ...state,
        loading: false,
        repos_in_reducer_init: [],
        error:action.payload
      }
    
      case actionType.UPDATE_PROFILE_REQUEST:
        return {
          ...state,
          loading:true
        }
  
      case actionType.UPDATE_PROFILE_SUCCESS:
        return {
          ...state,
          loading: false,
          profileDe: action.payload,
          profile: true,
        }
  
      case actionType.UPDATE_PROFILE_FAILED:
        return {
          ...state,
          loading: false,
          profileDe: [],
          error:action.payload
        }
    
    default:
      return state
  }
}

export default profileDetail