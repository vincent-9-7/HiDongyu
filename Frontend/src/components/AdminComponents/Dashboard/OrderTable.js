import React from 'react'
import {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    makeStyles
} from '@material-ui/core'
import OrderTableRow from './OrderTableRow'

const useStyles = makeStyles((theme) => ({
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
}
))


function OrderTable(props) {
    const classes = useStyles()
    const { columns, UserData } = props

    return (
      <>
        <TableContainer>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
           
                    {column.label}
              
                  </TableCell>
                            ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {UserData.map((data, key) => (
                <OrderTableRow 
                  // eslint-disable-next-line react/no-array-index-key
                  key={`card${key}`}
                  taskID={data.taskID}
                  type={data.type}
                  bedroomNum={data.bedroomNum}
                  bathroomNum={data.bathroomNum}
                  startTime={data.startTime}
                  endTime={data.endTime}
                  status={data.status}
                  employeeDetail={data.employeeDetail}
                />
                        ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    )
}

export default OrderTable