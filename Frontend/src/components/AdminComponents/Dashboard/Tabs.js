/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import PropTypes from 'prop-types'
import { AppBar, Box, Tabs, Tab, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Switch } from 'react-router'
import { Link, useLocation } from 'react-router-dom'
import ProtectedRoute from "../../../router/ProtectedRoute"
import AdminDashboardPage from '../../../pages/AdminPage/AdminDashboardPage'
import AdminCustomersListPage from '../../../pages/AdminPage/AdminCustomersListPage'
import AdminStaffsListPage from '../../../pages/AdminPage/AdminStaffsListPage'
import OrderDetailsPage from '../../../pages/OrderPage/OrderDetailsPage'
import AdminStaffsDetailsPage from "../../../pages/AdminPage/AdminStaffDetailsPage"
import AdminCustomersDetailsPage from "../../../pages/AdminPage/AdminCustomersDetailsPage"
import AdminOrdersListPage from "../../../pages/AdminPage/AdminOrdersListPage"
import ScrollToTop from '../ScrollToTop'

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
}

function a11yProps(index) {

  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

function presentIndex(pathname) {
  // eslint-disable-next-line no-nested-ternary
  return pathname.includes("dashboard") ? 0 : pathname.includes("orders")
    ? 1 : pathname.includes("customers") ? 2 : 3
}

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: '#e0e0e0',
    flexGrow: 1,
  },

  AppBar: {
    background: "#f5f5f5",
  },

  Tab: {
    color: 'black',
  }

}))

export default function SimpleTabs() {

  const { pathname } = useLocation()
  const index = presentIndex(pathname)
  const classes = useStyles()
  const [value, setValue] = React.useState(index)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.AppBar} elevation={1}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
          className={classes.Tab}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="OVERVIEW" {...a11yProps(0)} component={Link} to="/admin/dashboard" />
          <Tab label="ORDERS" {...a11yProps(1)} component={Link} to="/admin/orders" />
          <Tab
            label="CUSTOMERS"
            {...a11yProps(2)}
            component={Link}
            to="/admin/customers"
          />
          <Tab label="STAFFS" {...a11yProps(3)} component={Link} to="/admin/staffs" />
        </Tabs>
      </AppBar>
      <ScrollToTop>
        <Switch>
          <ProtectedRoute path="/admin/dashboard" component={AdminDashboardPage} />
          <ProtectedRoute path="/admin/orders" exact component={AdminOrdersListPage} />
          <ProtectedRoute path="/admin/customers" exact component={AdminCustomersListPage} />
          <ProtectedRoute path="/admin/staffs" exact component={AdminStaffsListPage} />
          <ProtectedRoute path="/admin/staffs/:id" exact component={AdminStaffsDetailsPage} />
          <ProtectedRoute path="/admin/customers/:id" exact component={AdminCustomersDetailsPage} />
          <ProtectedRoute path="/admin/orders/:id" exact component={OrderDetailsPage} />
        </Switch>
      </ScrollToTop>
    </div>
  )
}