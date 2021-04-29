/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
import React,{useState} from 'react'
import { useForm,Controller } from "react-hook-form"
import Grid from '@material-ui/core/Grid'
import { Container , Box } from '@material-ui/core'
import { makeStyles,useTheme } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Dialog from '@material-ui/core/Dialog'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import SwipeableViews from 'react-swipeable-views'
import {useHistory} from "react-router-dom"
import LoginDetails from '../../SignUpComponents/LoginForm'
import EmployeeLoginDetails from '../../SignUpComponents/EmployeeLoginForm'

import {buttonStyle} from '../../../styles/styles'
import HomeComponentStyle from '../styles/HomeComponentStyle'

const useStyles = makeStyles((theme) => ({
  mobile: {
    [theme.breakpoints.between('xs','sm')]: {
      marginLeft: '10px',
    },
  },

  pickerPosition: {
    paddingTop: '4vh',
  },

  buttonPosition: {
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      marginLeft: '30px',
      paddingTop: '15vh',
    },
    [theme.breakpoints.between('sm','md')]: {
      paddingTop: '15vh',
    },
    [theme.breakpoints.up('md')]: {
      paddingTop: '10vh',
    }
  },

  selected: {
    '&$selected': {
      backgroundColor: 'white',

      '&:hover': {
        backgroundColor: '#67a9ff',

      }
    },
  }

}))


function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={2}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  }
}


const SelectStyle = { 
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "left"
  },
  transformOrigin: {
    vertical: "top",
    horizontal: "left"
  },
  getContentAnchorEl: null
}



export default function HomeSelectForm() {
  const classes = useStyles()
  const cssstyle = HomeComponentStyle()
  const buttonstyle = buttonStyle()
  const {  handleSubmit,control } = useForm()

  const theme = useTheme()
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(0)
  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  const handleChangeIndex = (index) => {
    setValue(index)
  }


  const userinfoo = JSON.parse(localStorage.getItem('userInfo'))
  const employeeinfoo = JSON.parse(localStorage.getItem('employeeInfo'))
  const history = useHistory()
  const onSubmit = data => {
    const newData = {
      bedroomNum:data.bedRoomNum,
      bathroomNum:data.bathRoomNum,
      contact:data.number,
      propertyType:data.propertyType,
      postcode:data.postcode,
    }
    localStorage.setItem('homeOrderData',JSON.stringify(newData)) 

    if(userinfoo){     
      history.push("/order")
    }
    else if(employeeinfoo) {
      history.push("/employee-orders")
    }
    else{
      handleClickOpen()
    }
  } 

  return ( 
    <Box>
      <Container maxWidth="lg" className={classes.pickerPosition}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3} className={classes.mobile}>
            <Grid item xs={12} md={3}>
              <FormControl className={cssstyle.Picker}>
                <InputLabel className={cssstyle.Picker}>
                  Bedroom *
                </InputLabel>

                <Controller
                  as={(
                    <Select MenuProps={SelectStyle}>
                      <MenuItem className={classes.selected} value="0">0</MenuItem>
                      <MenuItem className={classes.selected} value="1">1</MenuItem>
                      <MenuItem className={classes.selected} value="2">2</MenuItem>
                      <MenuItem className={classes.selected} value="3">3</MenuItem>
                      <MenuItem className={classes.selected} value="4">4</MenuItem>
                    </Select>
                )}
                  name="bedRoomNum"
                  required
                  control={control}
                  defaultValue=""
                />
              </FormControl>
            </Grid> 

            <Grid item xs={12} md={3}>
              <FormControl className={cssstyle.Picker}>
                <InputLabel className={cssstyle.Picker}>
                  Bathroom *
                </InputLabel>

                <Controller
                  as={(
                    <Select MenuProps={SelectStyle}>
                      <MenuItem className={classes.selected} value="0">0</MenuItem>
                      <MenuItem className={classes.selected} value="1">1</MenuItem>
                      <MenuItem className={classes.selected} value="2">2</MenuItem>
                      <MenuItem className={classes.selected} value="3">3</MenuItem>
                      <MenuItem className={classes.selected} value="4">4</MenuItem>
                    </Select>
                )}
                  name="bathRoomNum"
                  required
                  control={control}
                  defaultValue=""
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={3}>
              <FormControl className={cssstyle.Picker}>
                <InputLabel className={cssstyle.Picker}>
                  Property Type
                </InputLabel>

                <Controller
                  as={(
                    <Select MenuProps={SelectStyle}>
                      <MenuItem className={classes.selected} value="unit">Unit</MenuItem>
                      <MenuItem className={classes.selected} value="apartment">Apartment</MenuItem>
                      <MenuItem className={classes.selected} value="house">House</MenuItem>
                                  
                    </Select>
                )}
                  name="propertyType"
                  control={control}
                  defaultValue=''
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={3}>
              <FormControl className={cssstyle.Picker}>
                <Controller
                  as={(
                    <TextField label="Post Code" className={classes.postCodeLength} />
                )}
                  name="postcode"
                  control={control}
                  defaultValue=""
                />
              </FormControl>
            </Grid>
          </Grid>

          <Box className={classes.buttonPosition}>
            <Button
              className={buttonstyle.bookingButton}
              variant="contained"
              type="submit"
              id="back-to-top-anchor"
              disabled={!!employeeinfoo}
            >
              Booking from $80
            </Button>
          </Box>


          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
            
          >
            <div className={classes.root}>
              <AppBar position="static" color="default">
                <Tabs
                  value={value}
                  onChange={handleChange}
                  indicatorColor="primary"
                  textColor="primary"
                  variant="fullWidth"
                  aria-label="full width tabs example"
                >
                  <Tab label="Login as customer" {...a11yProps(0)} />
                  <Tab label="Login as employee" {...a11yProps(1)} />
                </Tabs>
              </AppBar>
              <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
              >
                <TabPanel value={value} index={0} dir={theme.direction}>
                  <LoginDetails />
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                  <EmployeeLoginDetails />
                </TabPanel>
              </SwipeableViews>
            </div>
          </Dialog>

        </form>
      </Container>
    </Box>
)}