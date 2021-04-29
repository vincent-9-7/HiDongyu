import {call,put,takeEvery} from 'redux-saga/effects'
import axios from 'axios'
import header from "./header"
import url from "../../api/api"

function* fetchStaffDetailUrl(action) {
  try{
    const apiUrl = `${url}/employees/${action.payload}`
    const users = yield call(axios.get, apiUrl,header())
    
    yield put({type:'GET_STAFFDETAIL_SUCCESS',users:users.data})
 
  }
  catch(e) {
    yield put({type:'GET_STAFFDETAIL_FAILED',message:e.message})
  }
}

function* StaffDetailSaga() {
  yield takeEvery('GET_STAFFDETAIL_REQUEST',fetchStaffDetailUrl)
}

export default StaffDetailSaga