import React from 'react'
import {
  makeStyles,
  TableHead,
  TableRow,
  TableCell,
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    background: '#dadada',
    borderBottom: '2px solid darkgrey',
  },
  tableHead: {
    padding: '20px 15px',
    [theme.breakpoints.down('xs')]: {
      padding: '15px 10px',
    },
  }
}))

function ListTableHead(props){ 
  const { columns } = props
  const classes = useStyles()
  return(
    <TableHead className={classes.root}>
      <TableRow>
        {columns.map((column) => (
          <TableCell
            key={column.id}
            align={column.align}
            style={{ minWidth: column.minWidth }}
            className={classes.tableHead}
          >
            {column.label}
          </TableCell>
          ))}
      </TableRow>
    </TableHead> 
  )
}

export default ListTableHead