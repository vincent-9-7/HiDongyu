
import {call,put,takeEvery} from 'redux-saga/effects'
import axios from 'axios'
import actionTypes from "../actions/actionTypes"
import header from "./header"
import url from "../../api/api"


let getApi = ''
let updateAPI =''

function* fetchRegularUrl()   {
  const level = localStorage.getItem('authLevel') 
  const info = JSON.parse(localStorage.getItem(`${level}Info`))
  const ID = info.data.objectID
  const person = level === 'user'? 'users' : 'employees'
  getApi = `${url}/${person}/alltask/${ID}`
  try{
    const data = yield call(axios.get, getApi,header())
    yield put({type:actionTypes.GET_HISTORY_SUCCESS,payload:data.data})
  }
  catch(e) {
    console.log(e)
    yield put({type:actionTypes.GET_HISTORY_FAILED,payload:e})
  }
}

function* updateEmployeeProfile(action) {
  const level = localStorage.getItem('authLevel') 
  const info = JSON.parse(localStorage.getItem(`${level}Info`))
  const ID = info.data.objectID
  const person = level === 'user'? 'users' : 'employees'
  updateAPI=`${url}/${person}/${ID}`
  try{
    const data = yield call(axios.put, updateAPI ,action.payload,header())
    yield put({type:'UPDATE_PROFILE_SUCCESS',payload:data})
    const {lastName} = JSON.parse(data.config.data).name
    info.data.lastName = lastName
    localStorage.setItem(`${level}Info`, JSON.stringify(info))
  }
  catch(e) {
    console.log(e)
    yield put({type:'UPDATE_PROFILE_FAILED',payload:e})
  }
}

function* WatchEmployeeSaga() {
  yield takeEvery(actionTypes.GET_HISTORY_REQUEST,fetchRegularUrl)
  yield takeEvery(actionTypes.UPDATE_PROFILE_REQUEST,updateEmployeeProfile)
}

export default WatchEmployeeSaga