/* eslint-disable no-underscore-dangle */
import React, {useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {  withStyles,makeStyles} from "@material-ui/core/styles"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import Typography from "@material-ui/core/Typography"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"
import Button from '@material-ui/core/Button'
import TablePagination from '@material-ui/core/TablePagination'
import date from 'date-and-time'
import { Link } from 'react-router-dom'
import{ Alert} from '@material-ui/lab'
import { amber } from '@material-ui/core/colors'
import {getOrderByTargetRequest, updateOrderRequest, changeOrder} from "../../../../store/actions"
import { GreenStatus ,RedStatus,
  YellowStatus,GreyStatus,BlueStatus} from '../../../UIComponents/Status'

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(amber[500]),
    backgroundColor: amber[500],
    '&:hover': {
      backgroundColor: amber[700],
    },
  },
}))(Button)

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },

  status: {
    background: "green",
    borderRadius: "25px",
    color: "white",
  },

  btn: {
    color: "white",
    margin: " 3% 6%",
    minWidth: "120px",
  },
})

function displayTime(time) {
  let result = date.parse(time.split('.')[0], 'YYYY-MM-DD hh:mm:ss')
  result = result.toString().split(" ")
  return `${date.transform(result[4], 'HH:mm:ss', 'hh:mmA')} 
  ${result[2]} ${result[1]},${result[3]}`
}


function isButton(words) {
  if(words.status==='confirmed') {
    return <GreenStatus>Confirmed</GreenStatus>
  }
  if(words.status==='cancelled'){
    return <RedStatus>Cancelled</RedStatus>
  }
  if(words.status==='in-progress'){
    return <BlueStatus>In Progress</BlueStatus>
  }
  if(words.status==='finished'){
    return <GreyStatus>Finished</GreyStatus>
  }
  if(words.status==='reviewed'){
    return <YellowStatus>Reviewed</YellowStatus>
  }
  return <GreyStatus>{words.status}</GreyStatus>
}

function isCancel(user,classes,handleAction, index) {
  if(user.status==='confirmed') {
    return  (
      <Button 
        variant="contained"
        className={classes.btn}
        color="secondary"
        id={user.type}
        value={user._id}
        onClick={() => handleAction(user._id, user.type, "cancelled", index, user.status)}
      >
        Cancel
      </Button>
)
  }
  return (
    <Button 
      variant="contained"
      className={classes.btn}
      color="secondary"
      disabled
    >
      Cancel
    </Button>
)
  
}

function isComment(user,classes) {
  const level = localStorage.getItem('authLevel')
  if(level==="admin"){
    if(user.reviewStatus||user.status!=="finished"){
      return(
        <Button 
          variant="contained"
          className={classes.btn}
          color="primary"
          component={Link} 
          to={`/admin/orders/${user._id}?type=${user.type}`}
        >
          View
        </Button>
      )
    }
    return(
      <Button 
        variant="contained"
        className={classes.btn}
        color="primary"
        component={Link} 
        to={`/admin/orders/${user._id}?type=${user.type}`}
      >
        View
      </Button>
    )
  }
  if(user.reviewStatus||user.status!=="finished"){
    return(
      <Button 
        variant="contained"
        className={classes.btn}
        color="primary"
        component={Link} 
        to={`/order-detail/${user._id}?type=${user.type}`}
      >
        View
      </Button>
    )
  }
  return(
    <ColorButton 
      variant="contained"
      className={classes.btn}
      component={Link} 
      to={`/order-detail/${user._id}?type=${user.type}`}
    >
      Review
    </ColorButton>
  )
  
  
}

const BasicTable=(props)=> {
  const {data, type}=props
  
  const classes = useStyles()
  const dispatch=useDispatch()
  const redux = useSelector(state => state.order)
  const users = redux.order.result
  const {loading} = redux

  const dispatchRequested=()=>{
    dispatch(getOrderByTargetRequest({id:data, type:type}))
  }

  useEffect(()=>{
    dispatchRequested()
},[])

  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

const handleAction = (id, ordertype, status, index) => {
    
  dispatch(changeOrder(page * rowsPerPage + index))
  const body={id:id, update:{status:status}, type:ordertype}
  dispatch(updateOrderRequest(body))
  
}


  return (
    <>
      {loading&&<p>Loading...</p>}
      {!loading && redux.order.page === "orderbytarget" && (
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Order ID</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Recevier</TableCell>
              <TableCell align="center">StartTime</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.slice(page * rowsPerPage, 
            page * rowsPerPage + rowsPerPage).map((user,index) => ( 
              <TableRow key={user._id}>
                <TableCell align="center">{user.type+user.taskID}</TableCell>
                <TableCell align="center">
                  {isButton(user)}      
                </TableCell>
                <TableCell align="center">
                  <Typography>
                    {user.firstName}
                    {' '}
                    {user.lastName}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  {displayTime(user.startTime)}
                </TableCell>
                <TableCell align="center">
                  {isComment(user,classes)}
                  {isCancel(user,classes,handleAction, index)}
                </TableCell>

              </TableRow>
       ))}
                  
          </TableBody>
        
     
        </Table>
        <TablePagination 
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          align="center"
        />
      </TableContainer>
)}
      {users.length===0&&!loading&&( 
      <Alert severity="info">No orders available! — check it out!</Alert>
)}
    </>
  )
}
export default BasicTable
