import {all} from 'redux-saga/effects'
import OrderSaga from './OrderSaga'
import UserListSaga from './userListSaga'
import EmployeesListSaga from './employeesListSaga'
import CusDetailSaga from './customersDetail'
import StaffDetailSaga from './staffsDetail'
import UsersSaga from './usersSaga'
import EmployeeSaga from './emplyeeDetail'
import EmployeeCertificationSaga from './employeeSaga'
import forgetPasswordSaga from './forgetPasswordSaga'
import statsSaga from "./statsSaga"

export default function* rootSaga() {
  yield all([
    OrderSaga(),
    UserListSaga(),
    EmployeesListSaga(),
    CusDetailSaga(),
    StaffDetailSaga(),
    statsSaga(),
    EmployeeSaga(),
    UsersSaga(),
    EmployeeCertificationSaga(),
    forgetPasswordSaga()
  ])
}