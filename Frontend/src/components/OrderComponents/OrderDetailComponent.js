/* eslint-disable */
import React from "react"
import { makeStyles, Container, Grid } from '@material-ui/core'
import AdminCustomersLeft from "../AdminComponents/AdminCustomersLeft"
import AdminCustomersRight from "../AdminComponents/AdminCustomersRight"
import LoadingIcon from '../AdminComponents/LoadingIcon'


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  bg: {
    [theme.breakpoints.down('sm')]: {
      padding: '0px',
    },

  },
  body: {
    backgroundColor: "white",
    padding: '55px',
    borderRadius: '5px',
    [theme.breakpoints.down('xs')]: {
      padding: '20px',
    },
  },
}))

const data = {
  taskID: "3",
  address: {
    address1: "Room 101",
    address2: "22 Cat Street",
    suburb: "Miao",
    state: "Meme",
    postcode: "1234"
  },
  type: "RCCC",
  status: "finished",
  propertyType: "unknown",
  cabinets: 0,
  fridge: 0,
  oven: 0,
  interiorWindows: 0,
  review: "This is a review. ",
  rating: 2.5,
  title: "This is a title. ",
  bedroomNum: 2,
  bathroomNum: 3,
  price: 1.23,
  startTime: "2021-02-16T13:00:00",
  endTime: "2020-01-01T12:00:00",
  userID: "1234",
  employeeID: "1234",
  firstName: "Adams",
  lastName: "Bob",
}

function displayPage(repo) {

  if (typeof (repo) === 'string') { return <LoadingIcon /> }
  const { startTime, endTime, title, firstName, address, lastName,
    cabinets, fridge, oven, interiorWindows, rating, review, price, status, type, phoneNumber, _id, userDetail, employeeDetail, reviewStatus } = repo

  let employeeFirstName, employeeLastName, employeeObjID = null
  const userFirstName = userDetail[0].name.firstName
  const userLastName = userDetail[0].name.lastName
  const userObjID = userDetail[0]._id
  if (employeeDetail[0] == null) {
    employeeFirstName = 'null'
    employeeLastName = 'null'
    employeeObjID = 'null'
  } else {
    employeeFirstName = employeeDetail[0].name.firstName
    employeeLastName = employeeDetail[0].name.lastName
    employeeObjID = employeeDetail[0]._id
  }
  return (
    <>
      <Grid container spacing={2}>
        <AdminCustomersLeft
          userFirstName={userFirstName}
          userLastName={userLastName}
          employeeFirstName={employeeFirstName}
          employeeLastName={employeeLastName}
          startTime={startTime}
          endTime={endTime}
          orderTitle={title}
          customerFirstName={firstName}
          customerLastName={lastName}
          orderStatus={status}
          phone={phoneNumber}
          location={JSON.stringify(address).replace(/{|}|":"|"address1|"address2|"suburb|"state|"postcode|":/g, '').replace(/",/g, ', ')}
          cab={cabinets}
          fri={fridge}
          ov={oven}
          intWin={interiorWindows}
          rate={rating}
          typeOfOrder={type}
          reviewText={review}
          userObjectID={userObjID}
          employeeObjectID={employeeObjID}
          _id={_id}
          reviewStatus={reviewStatus}
        />
        <AdminCustomersRight orderPrice={price}
          _id={_id}
          orderStatus={status}
          typeOfOrder={type} />
      </Grid>

    </>
  )
}

function OrderDetailComponent(props) {
  const classes = useStyles()
  const { data } = props

  return (
    <>
      <Grid className={classes.bg}>
        <Container maxWidth="md" className={classes.body}>
          {displayPage(data)}
        </Container>
      </Grid>
    </>
  )
}

export default OrderDetailComponent
