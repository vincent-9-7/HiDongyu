import { call, put, takeEvery } from 'redux-saga/effects'
import axios from 'axios'
import header from "./header"
import url from "../../api/api"

function* fetchEmployees(action) {
  try {
    const { page, pageSize } = action.payload
    const apiUrl = `${url}/employeeslist?page=${page}&pageSize=${pageSize}`
    const users = yield call(axios.get, apiUrl,header())
    yield put({ type: "GET_EMPLOYEES_SUCCESS", users: users.data })
  } catch (e) {
    yield put({ type: 'GET_EMPLOYEES_FAILED', message: e.message })
  }
}

function* deletedUsers(action) {
  const deletedId = action.payload
  const deletedApi = `${url}/deletedEmployees/${deletedId}`
  try {
    yield call(axios.put, deletedApi,{},header())
    yield put({ type: 'DELETED_EMPLOYEE_SUCCESS' })
    yield put({ type: 'GET_EMPLOYEES_REQUESTED', payload: action.listSize })
  } catch (e) {
    yield put({ type: 'DELETED_EMPLOYEE_FAILED', message: e.message })
  }
} 

function* EmployeesListSaga() {
  yield takeEvery('GET_EMPLOYEES_REQUESTED', fetchEmployees)
  yield takeEvery('DELETED_EMPLOYEE_REQUEST', deletedUsers)
}

export default EmployeesListSaga