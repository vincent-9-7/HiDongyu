/* eslint-disable no-unused-vars */
import { put, call, takeEvery } from 'redux-saga/effects'
import axios from 'axios'
import url from "../../api/api"

function* forgetPassword(action) {
  try {
    const userInfo = 
    yield call(axios.post,`${url}/recover`, action.payload)
    yield put({ type: 'USER_EMAIL_REQUEST_SUCCESS', payload: userInfo })
  } catch (e) {
    yield put({ type: 'USER_EMAIL_REQUEST_FAILED', payload: e.response.data.error })
  }
}
function* forgetPasswordEmployee(action) {
  try {
    const userInfo = 
    yield call(axios.post,`${url}/employees/recover`, action.payload)
    yield put({ type: 'EMPLOYEE_EMAIL_REQUEST_SUCCESS', payload: userInfo })
  } catch (e) {
    yield put({ type: 'EMPLOYEE_EMAIL_REQUEST_FAILED', payload: e.response.data.error })
  }
}

function* resetPassword(action) {
  
  try {
    const userInfo = 
    yield call(axios.post,`${url}/resetPassword`, action.payload)
    yield put({ type: 'USER_RESET_REQUEST_SUCCESS', payload: userInfo })
    document.location.href = 'https://hidongyu.com'


  } catch (e) {
    yield put({ type: 'USER_RESET_REQUEST_FAILED', payload: e.response.data.error})
    console.log(e.response.data.error)
  }
}

function* resetPasswordEmployee(action) {
  
  try {
    const userInfo = 
    yield call(axios.post,`${url}/employees/resetPassword`, action.payload)
    yield put({ type: 'EMPLOYEE_RESET_SUCCESS', payload: userInfo })
    document.location.href = 'https://hidongyu.com'

  } catch (e) {
    yield put({ type: 'EMPLOYEE_RESET_FAILED', payload: e.response.data.error})
    console.log(e.response.data.error)
  }
}


function* forgetPasswordSaga() {
  yield takeEvery('USER_EMAIL_REQUEST', forgetPassword)
  yield takeEvery('EMPLOYEE_EMAIL_REQUEST', forgetPasswordEmployee)
  yield takeEvery('USER_RESET_REQUEST', resetPassword)
  yield takeEvery('EMPLOYEE_RESET_REQUEST', resetPasswordEmployee)
}

export default forgetPasswordSaga
