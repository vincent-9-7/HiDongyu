/* eslint-disable no-unused-vars */
import { put, call, takeEvery } from 'redux-saga/effects'
import axios from 'axios'
import url from "../../api/api"

const postAPI = `${url}/employees/login`
 
function* employeeLogin(action) {
  try {
    const userInfo = 
    yield call(axios.post, postAPI, action.payload)
    yield put({ type: 'EMPLOYEE_SIGNIN_SUCCESS', payload: userInfo })
    const info ={data: userInfo.data}
    if(JSON.parse(userInfo.config.data).email === "admin@oz.com"){
      localStorage.setItem('employeeInfo', JSON.stringify(info))
      localStorage.setItem("authLevel", "admin") 
      document.location.href = '/admin'
    }
    else{
      localStorage.setItem('employeeInfo', JSON.stringify(info))
      localStorage.setItem("authLevel", "employee") 
      document.location.href = '/employee-orders'
    }
    
  } catch (e) {
    console.log(e.response.data)
    yield put({ type: 'EMPLOYEE_SIGNIN_FAIL', payload: e.response.data.error })
  }
}


function* employeeRegister(action) {
 
  try {
    const userInfo = 
      yield call(axios.post, `${url}/employees/registration`, action.payload)
    yield put({ type: 'EMPLOYEE_REGISTER_SUCCESS', payload:userInfo })

    if(JSON.parse(userInfo.config.data).email === "admin@oz.com"){
      yield put({ type: 'EMPLOYEE_SIGNIN_SUCCESS', payload:userInfo  })
      localStorage.setItem('employeeInfo', JSON.stringify(userInfo))
      localStorage.setItem("authLevel", "admin") 
      document.location.href = '/admin'
    }
    else{
      const userloginInfo = 
        yield call(axios.post, `${url}/employees/login`, action.payload)
      yield put({ type: 'EMPLOYEE_SIGNIN_SUCCESS', payload:userloginInfo  })// 按照employee进行login操作
      localStorage.setItem('employeeInfo', JSON.stringify(userloginInfo))
      localStorage.setItem("authLevel", "employee") 
      document.location.href = '/employee-orders'
    }
    
  } catch (e) {
    yield put({ type: 'EMPLOYEE_REGISTER_FAIL', 
    payload: e.response.data[Object.keys(e.response.data)[0]]})
  }
}

function* employeeSignout() {
  localStorage.removeItem('employeeInfo')
  localStorage.removeItem('authLevel')

  yield put({ type: 'EMPLOYEE_SIGNOUT' })
  document.location.href = '/'
}

function*  EmployeeCertificationSaga () {
  yield takeEvery('EMPLOYEE_SIGNIN_REQUEST', employeeLogin)
  yield takeEvery('EMPLOYEE_REGISTER_REQUEST', employeeRegister)
  yield takeEvery('EMPLOYEE_SIGNOUT_REQUEST', employeeSignout)
}

export default EmployeeCertificationSaga 

