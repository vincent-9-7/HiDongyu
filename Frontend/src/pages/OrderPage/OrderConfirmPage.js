import React  from "react"
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import {useSelector} from 'react-redux'
import {useHistory} from "react-router-dom"
import Nav from '../../components/NavBarComponents/NavBar'
import OrderRight from "../../components/OrderComponents/OrderRight"
import Footer from '../../components/FooterComponents/Footer'
import LoadingIcon from "../../components/AdminComponents/LoadingIcon"

const useStyles = makeStyles((theme) => ({
  root: {
    // background: 'white',
    background: '#e3f2fd',
    height: '95vh',
    [theme.breakpoints.down('sm')]: {
      paddingBottom: '5vh',
      paddingTop: '10vh',
    },
    [theme.breakpoints.between('sm', 'md')]: {

    },
    [theme.breakpoints.up('md')]: {
      paddingBottom: '25vh',
      paddingTop: '20vh',
    },
  },

  button: {
    background: theme.palette.primary.main,
    borderRadius: '12px',
    color: theme.palette.primary.contrastText,
    fontSize: '1.4rem',
    paddingInline: '80px',
    [theme.breakpoints.down('sm')]: {
      marginBottom: '5vh',
      marginTop: '5vh',
    },
    [theme.breakpoints.up('md')]: {
      marginTop: '10vh',
    },

    '&:hover': {
      background: theme.palette.primary.hover,
      boxShadow: '0px 2px 10px #888',
    },
  },

  rightradius: {
    borderRadius: '14px',
  }
}))

function OrderConfirm() {
  const classes = useStyles()
  const orderData = useSelector(state => state.order.order)  

  let data = {
    bedroomNum:'',
    bathroomNum:'',
    type:'',
    address:{
      address1:'',
      address2:'',
      suburb:'',
      state:'',
      postcode:''
    },
    startTime:'',
    price:0,
  }


  let load = true 
  if(orderData.type === 'RC' || orderData.type === 'EC') {
    data = orderData
    load = false 
  }

  const {_id} = orderData
  const aa = orderData.type
  const orderUrl = `/order-detail/${_id}?type=${aa}`
  const employeeinfoo = JSON.parse(localStorage.getItem('employeeInfo'))
  const history = useHistory()
  window.onbeforeunload = () => {
    localStorage.removeItem('Order')
  }
  return (
    <>
      {employeeinfoo?history.push("/employee-orders"):''}
      <Nav />
      {load && <LoadingIcon />}
      {!load && (
      <Box className={classes.root}>
        <Container>
          <Grid container spacing={0}>
            <Grid item xs={12} sm={6}>
              <Container maxWidth="sm">
                <Grid container direction="column" alignItems="flex-start">
                  <Grid item>
                    <Typography variant="h4">
                      Your Order has been recieved. 
                      <br />
                      Thank you!
                    </Typography>
                  </Grid>

                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      type="submit"
                      href={orderUrl}
                    >
                      View Order
                    </Button>
                  </Grid>
                </Grid>
              </Container>
            </Grid>

            <Grid item xs={false} sm={1} />

            <Grid item xs={12} sm={5}>
              <Card className={classes.rightradius}>
                <OrderRight data={data} />
              </Card>
            </Grid>
          </Grid>
        </Container>
      
      </Box>
    )}
      <Footer />
    </>
  )
}

export default OrderConfirm