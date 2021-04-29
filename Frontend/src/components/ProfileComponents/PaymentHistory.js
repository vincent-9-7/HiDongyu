/* eslint-disable no-underscore-dangle */
import React,{useEffect} from "react"
import {useSelector,useDispatch} from 'react-redux'
import date from 'date-and-time'
import {Link} from "react-router-dom"
import {Table,TableBody,TableCell,TableContainer,Typography,TableHead,TableRow,Paper,
  Button,TablePagination,makeStyles}
   from "@material-ui/core"
import KingBedIcon from '@material-ui/icons/KingBed'
import BathtubIcon from '@material-ui/icons/Bathtub'
import {getHistoryRequest} from "../../store/actions"

const useStyles = makeStyles((theme) => ({
  tableCell:{
    padding:'8px',
  },
  table: {
    minWidth: 500,
    [theme.breakpoints.down((1550))]:{
      minWidth: 400,
    },
    [theme.breakpoints.down((700))]:{
      minWidth: 300,
    },
    [theme.breakpoints.down((420))]:{
      minWidth: 100,
    },

  },
  price:{
    color:"#007bf5",
  },
  check: {
    display:"inline-block",
    background:"#007bf5",
    color:"white"
  },

  fontSize: {
    font:'25px',
  },
  orderNumber: {
    margin:'0 1px 0 1px',
    align:'center',
    display:'inline'
  },
  bedIconSize:{
    verticalAlign:'-4px'
  },
  bathIconSize:{
    verticalAlign:'-2px'
  },
}
))

function displayTime(time) {
  let result = date.parse(time.split('.')[0], 'YYYY-MM-DD hh:mm:ss')
  result = result.toString().split(" ")
  return `${date.transform(result[4], 'HH:mm:ss', 'hh:mmA')} 
  ${result[2]} ${result[1]},${result[3]}`
}

const GetList = () => {
  const dispatch = useDispatch()
  const repo = useSelector(state => state.employee_in_reducer_index.repos_in_reducer_init)
  useEffect(()=>{
    dispatch(getHistoryRequest())
  },[])
return repo
}

export default function BasicTable() {
  const classes = useStyles()
  const employees = GetList()
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    <TableContainer component={Paper} className={classes.root}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center" className={classes.tableCell}>Order ID</TableCell>
            <TableCell align="center" className={classes.tableCell}>Details</TableCell>
            <TableCell align="center" className={classes.tableCell}>Date</TableCell>
            <TableCell align="center" className={classes.tableCell}>Price</TableCell>
            <TableCell align="center" className={classes.tableCell}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).
          map((employee) => ( 
            <TableRow key={employee._id} vertical-align='middle'>
              <TableCell align="center" className={classes.tableCell}>
                {employee.type}
                {employee.taskID}
              </TableCell>
              <TableCell align='center' className={classes.tableCell}>
                <span>&nbsp;&nbsp;</span>
                <KingBedIcon className={classes.bedIconSize} />
                <Typography className={classes.orderNumber}>
                  ×
                  {employee.bedroomNum}
                  <span>&nbsp;&nbsp;</span>
                </Typography>
                <BathtubIcon className={classes.bathIconSize} />
                <Typography className={classes.orderNumber}>
                  ×
                  {employee.bathroomNum}
                </Typography>
              </TableCell>
              <TableCell align="center" className={classes.tableCell}>
                {displayTime(employee.startTime)}
              </TableCell>
              <TableCell align="center" className={classes.tableCell}>
                <Typography>{employee.price}</Typography>
              </TableCell>
              <TableCell align="center" className={classes.tableCell}>
                <Button
                  variant="contained"
                  className={classes.check}
                  component={Link} 
                  to={`/order-detail/${employee._id}?type=${employee.type==="EC"? "EC":"RC"}`}
                >
                  View
                </Button>
              </TableCell>
            </TableRow>
       ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={employees.length}
        rowsPerPage={rowsPerPage}
        page={page} 
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        align="center"
      />
    </TableContainer>
  )
}
