import React from 'react'
import { makeStyles, InputLabel, Select, MenuItem } from '@material-ui/core'
import { Route } from 'react-router-dom'

const useStyles = makeStyles(() => ({
  selectBox: {
    width: '100%'
  },
  selectWrapper: {
    width: '50%',
  }
}))

const SelectStyle = {
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "left"
  },
  transformOrigin: {
    vertical: "top",
    horizontal: "left"
  },
  getContentAnchorEl: null
}

const OrderSelectBox = (props) => {
  const classes = useStyles()
  const { path, orderStatus, selectStatusChange } = props

  return(
    <div className={classes.selectWrapper}>
      <InputLabel id="orderStatusLabel">Order Status:</InputLabel>
      <Route path={path}>
        <Select
          className={classes.selectBox}
          labelId="orderStatusLabel"
          value={orderStatus}
          displayEmpty
          onChange={(e) => selectStatusChange(e)}
          inputProps={{ 'aria-label': 'Without label' }}
          MenuProps={SelectStyle}
        >
          <MenuItem value="">All Status</MenuItem>
          <MenuItem value="confirmed">Confirmed</MenuItem>
          <MenuItem value="in-progress">In Progress</MenuItem>
          <MenuItem value="finished">Finished</MenuItem>
          <MenuItem value="cancelled">Cancelled</MenuItem>
        </Select>
      </Route>
    </div>
  )
}

export default OrderSelectBox