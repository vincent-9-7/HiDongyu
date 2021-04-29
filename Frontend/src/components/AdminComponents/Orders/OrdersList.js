import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { makeStyles, Grid, Box } from '@material-ui/core'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { getAllOrersRequest, changeOrder } from '../../../store/actions'
import OrderCard from './OrderCard'
import OrderDetailComponent from '../../OrderComponents/OrderDetailComponent'
import ListPagination from '../ListPagination'
import LoadingIcon from '../LoadingIcon'
import NoDataFound from '../NoDataFound'
import OrderSelectBox from './OrderSelectBox'

const useStyles = makeStyles(() => ({
  left: {
    display: 'flex',
    flexDirection: 'column',
    padding: '15px',
  },
  adminRight: {
    marginTop: '60px',
    padding: 0,
  },
  staffRight: {
    padding: 0,
    marginTop: '10px'
  },
  card: {
    background: '#fff',
    borderLeft: '4px solid #5f647d',
    borderRadius: '3px',
    padding: '10px',
    margin: '10px 0',
    '&:hover': {
      boxShadow: '3px 3px 5px #5f647d'
    }
  },
  styleCancelled: {
    borderLeft: '4px solid #C5554B'
  },
  styleConfirm: {
    borderLeft: '4px solid #89b153'
  },
  styleProgress: {
    borderLeft: '4px solid #0878e6'
  },
  selectWrapper: {
    width: '48%'
  },
  selectBox: {
    width: '100%'
  },
}))

function returnPath(listType) {
  if (listType === 'admin') {
    return '/admin/orders'
  }
  return '/employee-orders'
}

function OrdersLists(props) {
  const classes = useStyles()
  const { pageSize, urlPage, status, listType } = props
  const path = returnPath(listType)
  const history = useHistory()
  const [curCard, setCurCard] = React.useState(0)
  const [prevCard, setPrevCard] = React.useState('unset')
  const [orderStatus, setOrderStatus] = React.useState(status)
  const listPayload = { page: urlPage, pageSize: pageSize, status: orderStatus }
  const matches = useMediaQuery('(max-width:480px)')
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllOrersRequest(listPayload))
  }, [])

  const redux = useSelector(state => state.order)
  const { loading } = redux
  const { error } = redux
  const data = redux.order.result
  const dataCount = redux.order.count
  const returnPage = (totalCount) => {
    if (totalCount < pageSize) {
      return 1
    }
    if (totalCount % pageSize !== 0) {
      return Math.floor(totalCount / listPayload.pageSize) + 1
    }
    return Math.floor(totalCount / listPayload.pageSize)
  }
  const finalPage = returnPage(dataCount)

  function handleSelectOrderCard(row, id, type) {
    if (prevCard === 'unset') {
      setPrevCard(row)
    } else {
      document.getElementById(`orderCard${curCard}`).classList.remove('order-card-select')
      setPrevCard(curCard)
    }
    document.getElementById(`orderCard${row}`).classList.add('order-card-select')
    setCurCard(row)
    dispatch(changeOrder(row))
    if (matches) {
      if (listType === 'admin') {
        history.push(`${path}/${id}?type=${type}`)
      } else {
        history.push(`/order-detail/${id}?type=${type}`)
      }
    }
  }

  function switchCardStyle(cardStatus) {
    switch (cardStatus) {
      case 'in-progress':
        return 'styleProgress'
      case 'cancelled':
        return 'styleCancelled'
      case 'confirmed':
        return 'styleConfirm'
      default:
        return ''
    }
  }

  const selectStatusChange = (event) => {
    setOrderStatus(event.target.value)
    setCurCard(0)
    listPayload.status = event.target.value
    listPayload.page = 1
    dispatch(getAllOrersRequest(listPayload))
    history.push(`/admin/orders/?status=${listPayload.status}`)
  }

  const getPaginationPage = (page) => {
    setCurCard(0)
    listPayload.page = page
    dispatch(getAllOrersRequest(listPayload))
  }

  const refreshPage = () => {
    listPayload.page = 1
    listPayload.status = (listType === 'admin') ? '' : 'confirmed'
    dispatch(getAllOrersRequest(listPayload))
    if (listType === 'admin') {
      setOrderStatus('')
      history.push(`/admin/orders/`)
    } else {
      history.push(`/employee-orders/`)
    }
  }

  return (
    <>
      {loading && <LoadingIcon />}
      {!loading && data !== undefined && data.length > 0 && redux.order.page === "orders" && (
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4} className={classes.left}>
            <div>
              <Grid container direction="row" justify="space-between">
                {(listType === 'admin') && (
                  <OrderSelectBox
                    path={path}
                    orderStatus={orderStatus}
                    selectStatusChange={selectStatusChange}
                  />
                )}
              </Grid>
              {data.map((row, index) => {
                const idName = `orderCard${index}`
                const classToUse = switchCardStyle(row.status.toLowerCase())
                return (
                  <Box
                    id={idName}
                    key={idName}
                    // eslint-disable-next-line no-underscore-dangle
                    onClick={() => handleSelectOrderCard(index, row._id, row.type)}
                    className={`${classes.card} ${classes[classToUse]}`}
                    aria-hidden="true"
                  >
                    <OrderCard
                      title={row.title}
                      price={row.price}
                      address={row.address}
                      startDate={row.startTime}
                      status={row.status}
                      classToUse={classToUse}
                      name={row.firstName}
                    />
                  </Box>
                )
              })}
            </div>
            <ListPagination
              path={path}
              getPaginationPage={getPaginationPage}
              count={finalPage}
            />
          </Grid>
          {!matches && data.length !== 0 && (
            <Grid
              item
              xs={12}
              sm={8}
              className={listType === 'admin' ? classes.adminRight : classes.staffRight}
            >
              <OrderDetailComponent data={data[curCard]} key={curCard} />
            </Grid>
          )}
        </Grid>
      )}
      {!loading && data !== undefined && data.length === 0 &&
        <NoDataFound refreshPage={refreshPage} title="No order found!" />}
      {!loading && error && console.log(error)}
    </>
  )
}
export default OrdersLists