import {call,put,takeEvery} from 'redux-saga/effects'
import axios from 'axios'
import header from "./header"
import url from "../../api/api"

function* fetchCusDetailUrl(action) {

  try{
    const apiUrl = `${url}/users/${action.payload}`
    const users = yield call(axios.get, apiUrl,header())

    yield put({type:'GET_CUSDETAIL_SUCCESS',users:users.data})
  }
  catch(e) {
    yield put({type:'GET_CUSDETAIL_FAILED',message:e.message})
  }
}

function* CusDetailSaga() {
  yield takeEvery('GET_CUSDETAIL_REQUEST',fetchCusDetailUrl)
}

export default CusDetailSaga