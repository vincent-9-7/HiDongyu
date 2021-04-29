import { call, put, takeEvery } from 'redux-saga/effects'
import axios from 'axios'
import header from "./header"
import url from "../../api/api"

function* fetchUsers(action) {
  try {
    const { page, pageSize } = action.payload
    const apiUrl = `${url}/userslist?page=${page}&pageSize=${pageSize}`
    const users = yield call(axios.get, apiUrl,header())
    yield put({ type: "GET_USERS_SUCCESS", users: users.data })
  } catch (e) {
    yield put({ type: 'GET_USERS_FAILED', message: e.message })
  }  
}

function* deletedUsers(action) {
  const deletedId = action.payload
  const deletedApi = `${url}/deletedUsers/${deletedId}`
  try {
    yield call(axios.put, deletedApi,{},header())
    yield put({ type: 'DELETED_CUSTOMER_SUCCESS'})
    yield put({ type: 'GET_USERS_REQUESTED', payload: action.listSize})
  } catch (e) {
    yield put({ type: 'DELETED_CUSTOMER_FAILED', message: e.message })
  }
} 

function* UserListSaga() {
  yield takeEvery('GET_USERS_REQUESTED', fetchUsers)
  yield takeEvery('DELETED_CUSTOMER_REQUEST', deletedUsers)
}

export default UserListSaga