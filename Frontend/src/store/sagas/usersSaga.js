/* eslint-disable no-unused-vars */
import { put, call, takeEvery } from 'redux-saga/effects'
import axios from 'axios'
import url from "../../api/api"

function* userLogin(action) {
  try {
    const userInfo = 
    yield call(axios.post,`${url}/users/login`, action.payload)
    yield put({ type: 'USER_SIGNIN_SUCCESS', payload: userInfo })
    const info ={data: userInfo.data}
    localStorage.setItem('userInfo', JSON.stringify(info))

    localStorage.setItem("authLevel", "user") 
    document.location.href = '/order'
  } catch (e) {
    yield put({ type: 'USER_SIGNIN_FAIL', payload: e.response.data.error })
  }
}

function* userRegister(action) {
  
  try {
    const userInfo = 
      yield call(axios.post,`${url}/users/registration`, action.payload)
    yield put({ type: 'USER_REGISTER_SUCCESS', payload: userInfo })
    
    const userloginInfo = 
      yield call(axios.post,`${url}/users/login`, action.payload)
    yield put({ type: 'USER_SIGNIN_SUCCESS', payload: userloginInfo })
    localStorage.setItem('userInfo', JSON.stringify(userloginInfo))
    localStorage.setItem("authLevel", "user") 
    document.location.href = '/order'
  } catch (e) {
    yield put({ type: 'USER_REGISTER_FAIL', 
    payload: e.response.data.error})
  }
}

function* userSignout() {
  localStorage.removeItem('userInfo')
  localStorage.removeItem('authLevel')

  yield put({ type: 'USER_SIGNOUT' })
  document.location.href = '/'
}

function* UsersSaga() {
  yield takeEvery('USER_SIGNIN_REQUEST', userLogin)
  yield takeEvery('USER_REGISTER_REQUEST', userRegister)
  yield takeEvery('USER_SIGNOUT_REQUEST', userSignout)
}

export default UsersSaga
