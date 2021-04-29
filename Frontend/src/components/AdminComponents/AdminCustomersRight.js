/* eslint-disable */
import React, { useEffect } from 'react'
import { Grid, Typography, makeStyles, Card, CardContent, Divider } from '@material-ui/core'
import OrderActionButtons from './Customers/OrderActionButtons'


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    textAlign: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      order: 1,
    },
  },
  card: {
    marginTop: 20,
    marginBottom: 50,
    borderRadius: '5px',
    maxWidth: '200px',
    padding: '20px 20px 40px',
  },
  text: {
  },
  price: {
    color: '#007bf5',
    textAlign: 'center',
    padding: '10px',
    marginTop: '10px',
  },
  button: {
    margin: 'auto',
    marginBottom: 20,
    backgroundColor: '#cc584e',
  },
  cancel: {
    color: theme.palette.secondary.contrastText,
    background: theme.palette.secondary.main,
    borderRadius: '25px',
    marginInline: '25px',
    '&:hover': {
      background: theme.palette.secondary.hover,
      boxShadow: '0px 2px 10px #888888',
    },
  },
  dialog: {
    padding: '40px'
  },
}))

function AdminCustomersRight(props) {
  const classes = useStyles()
  const { orderPrice, orderStatus, _id, typeOfOrder } = props
  const [state] = React.useState({
    status: { orderStatus }
  })



  const authLevel = localStorage.getItem('authLevel')

  return (
    <Grid item xs={12} sm={3} className={classes.root} >
      <div className={classes.card} >
        <Typography className={classes.text} variant="subtitle2" gutterBottom>
          PRICE
            </Typography>
        <Divider />
        <Typography className={classes.price} variant="h4" color="textSecondary">
          $
              {orderPrice}
        </Typography>
      </div>
      <Grid container direction="row"
        justify="center"
        alignItems="center">
        {(authLevel === 'admin') && (<OrderActionButtons cancel={orderStatus === "in-progress" ? "cancel" : ""} finish={orderStatus === "in-progress" ? "finish" : ""} accept='' id={_id} type ={typeOfOrder} />)}
        {(authLevel === 'user') && (<OrderActionButtons cancel={orderStatus === "confirmed" ? "cancel" : ""} finish='' accept='' id={_id} type={typeOfOrder} />)}
        {(authLevel === 'employee') && (<OrderActionButtons cancel='' finish={orderStatus === "in-progress" ? "finish" : ""} accept={orderStatus === "confirmed" ? "accept" : ""} id={_id} type={typeOfOrder} />)}
      </Grid>
    </Grid>
  )
}
export default AdminCustomersRight
