import {call,put,takeEvery} from 'redux-saga/effects'
import axios from 'axios'
import header from "./header"
import url from "../../api/api"

function* fetchStats() {
  try{
    const apiUrl = `${url}/getInfoNum`
    const data = yield call(axios.get, apiUrl,header())
    yield put({type:'GET_STATS_SUCCESS',data:data.data})
  }
  catch(e) {
    yield put({type:'GET_STATS_FAILED',message:e.message})
  }
}

function* StatsSaga() {
  yield takeEvery('GET_STATS_REQUEST',fetchStats)
}

export default StatsSaga