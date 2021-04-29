import './App.css'
import React from 'react'
import { Redirect, Route, Switch } from 'react-router'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import ProtectedRoute from './router/ProtectedRoute'
import HomePage from './pages/HomePage/HomePage'
import Order from './pages/OrderPage/OrderPage'
import ProfilePage from './pages/ProfilePage/ProfilePage'
import OrderConfirmPage from './pages/OrderPage/OrderConfirmPage'
import OrderDetailsPage from './pages/OrderPage/OrderDetailsPage'
import ErrorPage from './pages/ErrorPage/ErrorPage'
import theme from './styles/theme'
import AdminIndexPage from "./pages/AdminPage/AdminIndexPage"
import OrderCusDetailPage from "./pages/OrderPage/CustomersDetails"
import OrderStaffDetailPage from "./pages/OrderPage/StaffDetails"
import EmployeeOrderList from './pages/OrderPage/EmployeeOrderList'
import ForgetPassword from "./components/SignUpComponents/ForgetPassword"
import ResetPassword from './components/SignUpComponents/ResetPassword'
import ForgetPasswordEmployee from './components/SignUpComponents/ForgetPasswordEmployee'
import ResetPasswordEmployee from './components/SignUpComponents/ResetPasswordEmployee'

function App() {

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Switch>
        {/* 1 首页 */}
        <Route path="/" exact component={HomePage} />
        {/* 2 user下订单Booking */}
        <ProtectedRoute path="/order" exact component={Order} />
        {/* 3 user下订单后展示 */}
        <ProtectedRoute path="/order/confirm" exact component={OrderConfirmPage} />
        {/* 4 user和employee的profile */}
        <ProtectedRoute path="/profile" exact component={ProfilePage} />
        {/* 5 user的Navbar My order按钮 */}
        <ProtectedRoute path="/users/:id" exact component={OrderCusDetailPage} />
        {/* 6 employee的Navbar My order按钮 */}
        <ProtectedRoute path="/employees/:id" exact component={OrderStaffDetailPage} />
        {/* 7 employee接单大厅Browse Task */}
        <ProtectedRoute path="/employee-orders" exact component={EmployeeOrderList} />
        {/* 8 user/employee myorder里面的子页链接 */}
        <ProtectedRoute path="/order-detail/:id" exact component={OrderDetailsPage} />
     
        {/* 9 admin页面 */}
        <Redirect exact from="/admin" to="/admin/dashboard" />
        <ProtectedRoute path="/admin" component={AdminIndexPage} />
        {/* 10 找回密码页面 */}
        <Route path="/forgetpassword" exact component={ForgetPassword} />
        <Route path="/forgetpassword/resetpassword" exact component={ResetPassword} />
        <Route path="/forgetpassword/employee" exact component={ForgetPasswordEmployee} />
        <Route path="/resetpassword/employee" exact component={ResetPasswordEmployee} />
        <Route component={ErrorPage} />
      </Switch>
    </ThemeProvider>
  )
}

export default App
