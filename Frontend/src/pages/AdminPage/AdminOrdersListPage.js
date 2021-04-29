/* eslint-disable */
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Container } from '@material-ui/core'
import OrdersLists from '../../components/AdminComponents/Orders/OrdersList'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '1px',
    padding: '35px',
    [theme.breakpoints.down('xs')]: {
      padding: '25px 10px',
    },
  }
}))

const AdminOrdersListPage = (match) => {
  const classes = useStyles()
  const query = new URLSearchParams(match.location.search)
  const page = parseInt(query.get('page') || '1', 10)
  const status = (query.get('status') || '')
  const listType = 'admin'

  return (
    <Container maxWidth="lg" className={classes.root}>
      <OrdersLists pageSize={7} urlPage={page} status={status} listType={listType} />
    </Container>
  )
}

export default AdminOrdersListPage