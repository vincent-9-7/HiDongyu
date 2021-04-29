import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles, TableContainer, Table, TableBody } from '@material-ui/core'
import { getAllUserListRequest, getAllEmployeeListRequest,
  deletedCustomerRequest, deletedEmployeeRequest } from '../../store/actions'
import ListTableHead from './ListTableHead'
import ListTableRow from './ListTableRow'
import LoadingIcon from './LoadingIcon'
import ListPagination from './ListPagination'
import NoDataFound from './NoDataFound'
import DialogPopup from './DialogPopup'

const useStyle = makeStyles(() => ({
  root: {
    marginBottom: '20px'
  },
}))

function ListCustomerTable(props) {
  const classes = useStyle()
  const { columns, urlpage, tableType } = props
  const pageSize = 15
  const listSize = { page: urlpage, pageSize: pageSize}
  const dispatch = useDispatch()
  const [deletedId, setDeletedId] = React.useState(0)
  const [deletedIndex, setdeletedIndex] = React.useState(0)
  const [open, setOpen] = React.useState(false)
  const dispatchRequest = (tableType === 'customer') 
  const usersData = useSelector(state => state.userslist.users.result)
  const usersCount = useSelector(state => state.userslist.users.count)
  const loading = useSelector(state => state.userslist.loading)
  const dataType = useSelector(state => state.userslist.dataType)
  const error = useSelector(state => state.userslist.error)
  const path = dispatchRequest ? '/admin/customers' : '/admin/staffs'
  
  const returnPage = (usersCountNum) => {
    if (usersCountNum < pageSize) {
      return 1
    } 
    if (usersCountNum % pageSize !== 0) {
      return Math.floor(usersCountNum / listSize.pageSize) + 1
    } 
    return Math.floor(usersCountNum / listSize.pageSize)
  }

  const finalPage = returnPage(usersCount)

  const dispatchRequested = () => {
    if (dispatchRequest) {
      dispatch(getAllUserListRequest(listSize))
    } else {
      dispatch(getAllEmployeeListRequest(listSize))
    }
  }

  useEffect(() => {
    dispatchRequested()
  }, [])

  const getPaginationPage = (page) => {
    listSize.page = page
    dispatchRequested(listSize)
  }

  const openDeletedModal = (id, index) =>{
    setdeletedIndex(index)
    setDeletedId(id)
    setOpen(true)
  }
  
  const handleAlertClose = () => {
    setOpen(false)
  }

  const handleAlertConfirm = ()=>{
    if (dispatchRequest) {
      dispatch(deletedCustomerRequest(deletedId, listSize)) 
    } else {
      dispatch(deletedEmployeeRequest(deletedId, listSize)) 
    }
    setOpen(false)
  }

  const refreshPage = () => {
    listSize.page = 1
    dispatchRequested(listSize)
  }

  return (
    <>
      {(loading || dataType !== tableType) && <LoadingIcon />}
      {!loading && dataType === tableType && usersData.length > 0 && (
        <>
          <TableContainer className={classes.root}>
            <Table aria-label="simple table">
              <ListTableHead columns={columns} />
              <TableBody>
                {usersData.map((row,index) => {
                  const { _id: userObjId } = row
                  return(
                    <ListTableRow
                      key={row.ID}
                      index={index}
                      id={userObjId}
                      firstName={row.name.firstName}
                      lastName={row.name.lastName}
                      email={row.email}
                      status={row.employmentStatus}
                      ongoingOrder={row.numberOfOnGoingOrder}
                      completedOrder={row.numberOfOrderFinished}
                      tableType={tableType}
                      openDeletedModal={openDeletedModal}
                    />
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <ListPagination 
            path={path} 
            getPaginationPage={getPaginationPage}
            count={finalPage}
          />
          <DialogPopup 
            open={open} 
            handleAlertClose={handleAlertClose} 
            handleAlertConfirm={handleAlertConfirm} 
            userdata={usersData[deletedIndex]} 
          />
        </>
      )}
      {usersData !== undefined && usersData.length === 0 &&
        !loading &&
        <NoDataFound refreshPage={refreshPage} title={`No ${tableType} found!`} />}
      {error && !loading}
    </>
  )
}

export default ListCustomerTable