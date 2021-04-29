import React from 'react'
import { Link } from 'react-router-dom'
import { TableRow, TableCell, IconButton,makeStyles } from '@material-ui/core/'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'
import VisibilityIcon from '@material-ui/icons/Visibility'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'
import GetAvatar from "../Avatar/AvatarSmallSize"

const useStyle = makeStyles((theme) => ({
  root: {
    borderBottom: '1px solid #cacaca',
    '&:nth-of-type(even)': {
      backgroundColor: "#f0f0f0",
    },
  },
  avatar: {
    margin: '0 10px' 
  },
  actionBtn: {
    margin: '0 10px',
    width: '120px',
    [theme.breakpoints.down('xs')]: {
      margin: '0 5px',
    },
  },
  nameBox: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: '18%',
    [theme.breakpoints.down('xs')]: {
      paddingLeft: '10px',
    },
  },
  redBg: {
    fontSize: '15px',
    marginRight: '8px',
    color: '#C5554B'
  },
  greenBg:{
    fontSize: '15px',
    marginRight: '8px',
    color: '#89B153'
  },
  viewIcon: {
    '&::after': {
      height: '28px',
      position: 'absolute',
      width: '1px',
      background: '#bbbbbb',
      content: '""',
      right: 0
    },
    [theme.breakpoints.down('xs')]: {
      padding: '8px',
    },
  },
}))

function StatusDisplay(tableType, status, classes) {
  if (tableType === 'customer') {
    return null
  }
  return (status === 'available') ? 
    (
      <TableCell align="center" className={classes.status}>
        <FiberManualRecordIcon className={classes.greenBg} />
        Available
      </TableCell>
  ) : 
    (
      <TableCell align="center" className={classes.status}>
        <FiberManualRecordIcon className={classes.redBg} />
        Unavailable
      </TableCell>
  )
}

function ListTableRow(props) {
  const classes = useStyle()
  const { index, id, firstName, lastName, email, status } = props
  const { ongoingOrder, completedOrder, tableType, openDeletedModal } = props
  const path = `/admin/${tableType}s/${id}`
  return (
    <TableRow role="checkbox" tabIndex={-1} key={id} className={classes.root}>
      <TableCell align="center">
        <div className={classes.nameBox}>
          <div className={classes.avatar}>
            <GetAvatar />
          </div>
          {firstName}
          {' '}
          {lastName}
        </div>
      </TableCell>
      <TableCell align="center">
        {email}
      </TableCell>
      {StatusDisplay(tableType, status, classes)}
      <TableCell align="center">
        {ongoingOrder}
        {' '}
        Order(s)
      </TableCell>
      <TableCell align="center">
        {completedOrder}
        {' '}
        Order(s)
      </TableCell>
      <TableCell align="center">
        <IconButton 
          className={classes.viewIcon}
          color="primary"
          component={Link}
          to={path}
          aria-label="View"
        >
          <VisibilityIcon />
        </IconButton>
        <IconButton 
          className={classes.deleteIcon}
          color="secondary"
          onClick={() => openDeletedModal(id, index)}
          aria-label="Deleted"
        >
          <DeleteOutlineIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  )
}

export default ListTableRow