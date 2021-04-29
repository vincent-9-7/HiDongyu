/* eslint-disable */
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Container, Grid, Typography } from '@material-ui/core'
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd'
import ListTable from '../../components/AdminComponents/ListTable'

const columns = [
  { id: 'name', label: 'Name', minWidth: 160, align: 'center' },
  { id: 'email', label: 'Email', minWidth: 100, align: 'center' },
  { id: 'status', label: 'Status', minWidth: 120, align: 'center' },
  {
    id: 'ongoingOrders',
    label: 'Ongoing',
    minWidth: 50,
    align: 'center',
  },
  {
    id: 'completedOrders',
    label: 'Completed',
    minWidth: 50,
    align: 'center',
  },
  {
    id: 'actions',
    label: 'Actions',
    minWidth: 120,
    align: 'center',
  },
]

const useStyles = makeStyles((theme) => ({
  root: {
    background: '#fff',
    marginTop: '47px',
    padding: '45px 45px 0px',
    [theme.breakpoints.down('xs')]: {
      padding: '35px 20px',
    },
  },

  listIcon: {
    alignItems: 'center',
    display: 'flex',
  },

  icon: {
    fontSize: '3rem',
    marginRight: '10px',
  },

  listTable: {
    alignContent: 'space-between',
    justifyContent: 'center',
    minHeight: '80vh',
  }
}))

function AdminCustomersListPage(match) {
  const classes = useStyles()
  const tableType = 'staff'
  const query = new URLSearchParams(match.location.search)
  const page = parseInt(query.get('page') || '1', 10)
  return (
    <>
      <Container maxWidth="lg" className={classes.root}>
        <Typography variant="h3" component="h1" className={classes.listIcon}>
          <AssignmentIndIcon className={classes.icon} /> 
          Staffs List
        </Typography>
        <Grid container className={classes.listTable}>
          <ListTable
            columns={columns}
            tableType={tableType}
            urlpage={page}
          />
        </Grid>
      </Container>
    </>
  )
}

export default AdminCustomersListPage
