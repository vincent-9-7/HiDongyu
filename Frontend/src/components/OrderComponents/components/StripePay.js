/* eslint-disable max-len */
/* eslint-disable react/react-in-jsx-scope */
import React, { useState, useEffect } from "react"
import {
  CardElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js"
import axios from 'axios'
import {useHistory} from "react-router-dom"
import Grid from '@material-ui/core/Grid'
import date from 'date-and-time'
import {useDispatch} from 'react-redux'
import {payOrderRequest, postOrderRequest } from '../../../store/actions'
import url from '../../../api/api'


const cardStyle = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: 'Arial, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#32325d"
      }
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a"
    }
  }
}

export default function CheckoutForm({price,paystatus,data}) {
  const dispatch = useDispatch()
  const stripe = useStripe()
  const elements = useElements()

  const [succeeded, setSucceeded] = useState(false)
  const [error, setError] = useState(null)
  const [processing, setProcessing] = useState('')
  const [disabled, setDisabled] = useState(true)
  const [clientSecret, setClientSecret] = useState('')
  const postApi = `${url}/pay`


  const payapi = async() => {
    const paydata = {
      items: [{ id: "cleaning fee" }],
      price:price
    }
    const level = localStorage.getItem('authLevel')
    const person = level === 'user' ? 'user':'employee'
    const {token} = JSON.parse(localStorage.getItem(`${person}Info`)).data
    const Header = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': token
    }
    const res = await axios.post(postApi,paydata,{headers:Header})
    await setClientSecret(res.data.clientSecret) // 🌟必须有这个
  }
  
  useEffect(() => {
    payapi()
  }, [])

  const handleChange = async (event) => {
    setDisabled(event.empty)
    setError(event.error ? event.error.message : "")
  }

  const paySubmit = async (event) => {
    event.preventDefault()
    setProcessing(true)

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)
      }
    })
 
    if (payload.error) {
      setError(`${payload.error.message}`)
      setProcessing(false)
    } else {
      setError(null)
      setProcessing(false)
      setSucceeded(true)
      dispatch(payOrderRequest()) 
    }
  }

  const postData = {      
    address: {
      address1: "",
      address2: "",
      suburb: "",
      state: "",
      postcode: ""
    },
    type: "",
    status: "confirmed",
    propertyType: "unknown",
    cabinets: 0,
    fridge: 0,
    oven: 0,
    interiorWindows: 0,
    review: "",
    rating: "",
    title: "",
    bedroomNum: 0,
    bathroomNum: 0,
    price: 0,
    startTime: "", 
    endTime: "",
    userID: "",
    employeeID: "",
    firstName: "",
    lastName: "",
    phoneNumber: '',
  }

  if(paystatus === true) {
    const{otherdata} = data
    const{extra} = data
    const{bedRoomNum} = data
    const{bathRoomNum} = data
    const{type} = data

    const pickDate = date.format(otherdata.date, 'YYYY-MM-DD') 
    const pickTime = date.format(otherdata.time, 'HH:mm:ss') 
    const datedate = `${pickDate}T${pickTime}Z`
    
    let propertyType = ''
    if(otherdata.propertyType === '') {
      propertyType = 'unknown'
    }else {
      propertyType = otherdata.propertyType
    }
  
    const user = JSON.parse(localStorage.getItem('userInfo'))
    const userObjectId = user.data.objectID
    const userid = user.data.ID
    const postTitle = `${type} Bedroom x ${bedRoomNum} Bathroom x ${bathRoomNum}`
    const newData = {
      ...postData,
      ...extra,
      bedroomNum:bedRoomNum,
      bathroomNum:bathRoomNum,
      type:type,
      address:{
        ...postData.address,
        postcode:otherdata.postcode,
        address1:otherdata.address1,
        address2:otherdata.address2,
        suburb:otherdata.suburb,
        state:otherdata.state,
      },
      title:postTitle,
      startTime:datedate,
      firstName:otherdata.firstName,
      lastName:otherdata.lastName,
      phoneNumber:otherdata.phoneNumber,
      price:price,
      propertyType:propertyType,
      userDetail:userObjectId,
      userID:userid
    }
    dispatch(postOrderRequest(newData)) 
  }


  const history = useHistory()
  if(paystatus) {
    history.push("/order/confirm")
  }


  return (
    <>

      <Grid container direction="column" alignItems="center">

        <Grid item>     
          <form id="payment-form" onSubmit={paySubmit}>
            <CardElement 
              id="card-element"
              options={cardStyle}
              onChange={handleChange}
            />
            <button
              className="paybutton"
              type='submit'
              disabled={processing || disabled || succeeded}
              id="submit"
            >
              <span id="button-text">
                {processing ? (
                  <div className="spinner" id="spinner" />
                ) : (
                  "Pay now"
                )}
              </span>
            </button>
            
            {error && (
            <div className="card-error" role="alert">
              {error}
            </div>
            )}


            <p className={succeeded ? "result-message" : "result-message hidden"}>
              Payment succeeded
            </p>
          </form>
        </Grid>
      </Grid>
    </>
  )
}
