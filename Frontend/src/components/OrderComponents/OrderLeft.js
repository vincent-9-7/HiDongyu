/* eslint-disable react/jsx-props-no-spreading */
import React,{useEffect} from "react"
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { Container } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles'
import Divider from '@material-ui/core/Divider'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import {MuiPickersUtilsProvider,KeyboardDatePicker,KeyboardTimePicker} from "@material-ui/pickers"
import DateRangeIcon from '@material-ui/icons/DateRange'
import DateFnsUtils from '@date-io/date-fns'
import TextField from '@material-ui/core/TextField'
import AccessTimeIcon from '@material-ui/icons/AccessTime'
import date from 'date-and-time'
import { useForm,Controller } from "react-hook-form"
import {useDispatch} from 'react-redux'
import HomeIcon from '@material-ui/icons/Home'
import PostAddIcon from '@material-ui/icons/PostAdd'
import Icon from '@material-ui/core/Icon'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import Checkbox from '@material-ui/core/Checkbox'
import PaymentIcon from '@material-ui/icons/Payment'
import {postOrderRequest} from '../../store/actions'
import HomeComponentStyle from "../HomeComponents/styles/HomeComponentStyle"
import { BookingButton } from "../UIComponents/Buttons"
import ovenIcon from "../../assets/oven.svg"
import fridgeIcon from "../../assets/fridge.svg"
import windowIcon from "../../assets/window.svg"
import cabinetIcon from "../../assets/cabinet.svg"
// import PaymentInfo from './components/PaymentInfo'


const useStyles = makeStyles(() => ({
  pickerRoot: {
    marginBottom: '10px',
    marginTop: '5px',
  },

  inputRoot: {
    marginBottom: '10px',
    marginTop: '10px',
  },

  input: {
    marginBottom: '10px',
    marginTop: '20px',
    width: '100%',
  },

  top: {
    marginTop: '30px',
  },

  title: {
    marginBottom: '40px',
    marginTop: '10px',
  },

  extraIcon: {
    fontSize: '35px',
    marginTop: '10px',
    paddingTop: '5px',

  },

  iconRoot: {
    textAlign: 'center',
  },

  imageIcon: {
    height: '10vh',
    marginTop: '10px',
  },

  bookingButton: {
    margin: '30px 0',
    textAlign: 'center',
  },

  actionArearoot: {
    marginBottom: '10px',
    marginTop: '10px',
  },

  pickerBackground: {
    background: 'lightgrey', 
  },

  picker: {
    margin: '3px', 
  },

  actionArea: {
    padding: '0 12px', 
  },

  actionAreaimageIcon: {
    width: '100%',
  },

  check: {
    padding: '0px', 
  }

}))

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

export default function OrderLeft() {
  const classes = useStyles()
  const cssstyle = HomeComponentStyle()
  const {  handleSubmit,control,watch } = useForm()
  const dispatch = useDispatch()

  const [state, setState] = React.useState({
    oven: false,
    fridge: false,
    windows: false,
    cabinet:false,
    disable:false
  })
  
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked })
  }

  const areaClickChange = (event) => { 
    const key = event.target.name || event.target.alt
    const newState = !state[key]
    setState({...state,[key]:newState})
  }
  const {disable} = state 
  const type = watch("type","")
  useEffect(()=>{
    if(type === 'RC') {
      setState({oven:false,fridge:false,windows:false,cabinet:false,disable:false})
    }
    else if(type === 'EC') {
      setState({oven:true,fridge:true,windows:true,cabinet:true,disable:true}) 
    }
  },[type])
 
  const postData = {      
    address: {
      address1: "king street",
      address2: "",
      suburb: "",
      state: "QLD",
      postcode: "4102"
    },
    type: "RC",
    status: "in-progress",
    propertyType: "unknown",
    cabinets: 0,
    fridge: 0,
    oven: 0,
    interiorWindows: 0,
    review: "",
    rating: "",
    title: "I want clean",
    bedroomNum: 0,
    bathroomNum: 0,
    price: 20,
    startTime: "2020-01-01T00:00:00",
    endTime: "",
    userID: "",
    employeeID: "",
    firstName: "Ervin",
    lastName: "Howell",
    phoneNumber: '0400000000'
  }

  const { oven,fridge, windows,cabinet } = state
  const anyExtra = () => {
    const list = {ovennum:0,fridgenum:0,interiorWindowsnum:0,cabinetsnum:0}
    if(oven) {
      list.ovennum = 1
    }
    if(fridge){
      list.fridgenum = 1
    }
    if(windows){
      list.interiorWindowsnum = 1
    }
    if(cabinet){
      list.cabinetsnum = 1
    }
    return list
  }

  const onSubmit = data => {
    if(data.bedRoomNum!=="" && data.bathRoomNum!=="" && data.type!==""
        &&data.postcode!=="" &&data.date!=="" &&data.time!==""
        &&data.firstName!=="" &&data.lastName!=="" &&data.phoneNumber!==""
        &&data.address1!=="" &&data.suburb!=="" &&data.state!=="") {
      const pickDate = date.format(data.date, 'YYYY-MM-DD') 
      const pickTime = date.format(data.time, 'HH:mm:ss') 
      const totalDate = `${pickDate}T${pickTime}Z`

      const newData = {
        ...postData,
        bedroomNum:data.bedRoomNum,
        bathroomNum:data.bathRoomNum,
        type:data.type,
        address:{
          ...postData.address,
          postcode:data.postcode,
          address1:data.address1,
          address2:data.address2,
          suburb:data.suburb,
          state:data.state,
        },
        startTime:totalDate,
        oven:anyExtra().oven, 
        fridge:anyExtra().fridgenum,
        interiorWindows:anyExtra().interiorWindowsnum,
        cabinets:anyExtra().cabinetsnum,
        firstName:data.firstName,
        lastName:data.lastName,
        phoneNumber:data.phoneNumber
      }
  
      dispatch(postOrderRequest(newData)) 
    }

  } 

  const onErrors = () => {
    console.log("ERROR!")
  }




  
  return(
    <Box className={classes.top}>
      <Grid container direction="column">
        <form onSubmit={handleSubmit(onSubmit,onErrors)}>
          <Container maxWidth="lg">
            <Grid item xs={12} sm={12}>
              <Typography variant='h4' align='left' className={classes.title}>
                Set up your cleaning service
              </Typography>

              <Box>
                <Typography variant='h5' align='left'>
                  Please complete order information:
                </Typography>
        
                <Grid container direction="row" spacing={2} className={classes.pickerRoot}>
                  <Grid item xs={12} sm={6}>
                    <FormControl className={cssstyle.Picker}>
                      <InputLabel className={cssstyle.Picker}>
                        Bedroom
                      </InputLabel>

                      <Controller
                        as={(
                          <Select MenuProps={SelectStyle}>
                            <MenuItem value="0">0</MenuItem>
                            <MenuItem value="1">1</MenuItem>
                            <MenuItem value="2">2</MenuItem>
                            <MenuItem value="3">3</MenuItem>
                            <MenuItem value="4">4</MenuItem>
                            <MenuItem value="5">5</MenuItem>
                          </Select>
                      )}
                        name="bedRoomNum"
                        control={control}
                        defaultValue=""
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl className={cssstyle.Picker}>
                      <InputLabel className={cssstyle.Picker}>
                        Bathroom
                      </InputLabel>

                      <Controller
                        as={(
                          <Select MenuProps={SelectStyle}>
                            <MenuItem value="0">0</MenuItem>
                            <MenuItem value="1">1</MenuItem>
                            <MenuItem value="2">2</MenuItem>
                            <MenuItem value="3">3</MenuItem>
                            <MenuItem value="4">4</MenuItem>
                            <MenuItem value="5">5</MenuItem>
                          </Select>
                )}
                        name="bathRoomNum"
                        control={control}
                        defaultValue=""
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl className={cssstyle.Picker}>
                      <InputLabel className={cssstyle.Picker}>
                        Type of clean
                      </InputLabel>

                      <Controller
                        as={(
                          <Select MenuProps={SelectStyle}>
                            <MenuItem value="RC">Regular</MenuItem>
                            <MenuItem value="EC">End of lease</MenuItem>
                          </Select>
                      )}
                        name="type"
                        control={control}
                        defaultValue=""
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl className={cssstyle.Picker}>
                      <Controller
                        as={(
                          <TextField 
                            label="Post Code"
                            className={classes.postCodeLength}
                          />
                      )}
                        name="postcode"
                        control={control}
                        defaultValue=""
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <Controller
                        name="date"
                        control={control}
                        initialFocusedDate={null} 
                        defaultValue={null} 
                        render={({ ref, ...rest }) => (
                          <KeyboardDatePicker
                            className={cssstyle.datePicker}
                            format="MM/dd/yyyy"
                            label='Date'
                            helperText="" 
                            disablePast 
                            KeyboardButtonProps={{"aria-label": "change date"}}
                            keyboardIcon={(<DateRangeIcon />)} 
                            {...rest}
                          />
                  )}
                      />
                    </MuiPickersUtilsProvider>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <Controller
                        name="time"
                        control={control}
                        initialFocusedDate={null} 
                        defaultValue={null} 
                        render={({ ref, ...rest }) => (
                          <KeyboardTimePicker
                            className={cssstyle.datePicker}
                            label='Time'
                            helperText="" 
                            KeyboardButtonProps={{'aria-label': 'change time',}}
                            keyboardIcon={(<AccessTimeIcon />)}
                            {...rest}
                          />
                  )}
                      />
                    </MuiPickersUtilsProvider>
                  </Grid>
                </Grid>
              </Box>

              <Box>
                <Grid container alignItems="flex-end">
                  <Grid item xs={6} sm={1}>
                    <PostAddIcon className={classes.extraIcon} />
                  </Grid>
                  <Grid item xs={6} sm={11}>
                    <Typography variant='h5'>
                      Do you need anything extra?
                    </Typography>
                  </Grid>
                </Grid>
            
                <Grid container direction="row" spacing={1} className={classes.actionArearoot}>
                  <Grid item xs={6} sm={3}>
                    <Card className={classes.pickerBackground}>
                      <Card className={classes.picker} elevation={2}>
                        
                        <CardActionArea
                          className={classes.actionArea} 
                          name="oven"
                          onClick={areaClickChange}
                          disabled={disable} 
                        >

                          <Grid container direction='column' alignItems="flex-end">
                            <Grid item xs={6} sm={12}>
                              <Checkbox
                                color="primary"
                                checked={oven}
                                name="oven"
                                onChange={handleChange}
                                className={classes.check}
                              />
                            </Grid>

                            <Grid item xs={6} sm={12}>
                              <Icon>
                                <img 
                                  className={classes.actionAreaimageIcon}
                                  src={ovenIcon}
                                  alt="oven"
                                />
                              </Icon>
                            </Grid>
                          </Grid>
                        </CardActionArea>
                        <Typography variant='h6' align='center'>
                          oven
                        </Typography>
                      </Card>
                    </Card>
                  </Grid>
                
                  <Grid item xs={6} sm={3}>
                    <Card className={classes.pickerBackground}>
                      <Card className={classes.picker} elevation={2}>
                        <CardActionArea
                          className={classes.actionArea} 
                          name="fridge"
                          onClick={areaClickChange}
                          disabled={disable} 
                        >
                          <Grid container direction='column' alignItems="flex-end">
                            <Grid item xs={6} sm={12}>
                              <Checkbox
                                color="primary"
                                checked={fridge}
                                name="fridge"
                                onChange={handleChange}
                                className={classes.check}
                              />
                            </Grid>
                            <Grid item xs={6} sm={12}>
                              <Icon>
                                <img 
                                  className={classes.actionAreaimageIcon} 
                                  src={fridgeIcon} 
                                  alt="fridge"
                                />
                              </Icon>
                            </Grid>
                          </Grid>
                        </CardActionArea>
                        <Typography variant='h6' align='center'>
                          fridge
                        </Typography>
                      </Card>
                    </Card>
                  </Grid>

                  <Grid item xs={6} sm={3}>
                    <Card className={classes.pickerBackground}>
                      <Card className={classes.picker} elevation={2}>
                        <CardActionArea
                          className={classes.actionArea} 
                          name="windows"
                          onClick={areaClickChange}
                          disabled={disable} 
                        >
                          <Grid container direction='column' alignItems="flex-end">
                            <Grid item xs={6} sm={12}>
                              <Checkbox
                                color="primary"
                                checked={windows}
                                name="windows"
                                onChange={handleChange}
                                className={classes.check}
                              />
                            </Grid>
                            <Grid item xs={6} sm={12}>
                              <Icon>
                                <img 
                                  className={classes.actionAreaimageIcon} 
                                  src={windowIcon} 
                                  alt="windows"
                                />
                              </Icon>
                            </Grid>
                          </Grid>
                        </CardActionArea>
                        <Typography variant='h6' align='center'>
                          windows
                        </Typography>
                      </Card>
                    </Card>
                  </Grid>
      
                  <Grid item xs={6} sm={3}>
                    <Card className={classes.pickerBackground}>
                      <Card className={classes.picker} elevation={2}>
                        <CardActionArea
                          className={classes.actionArea} 
                          name="cabinet"
                          onClick={areaClickChange}
                          disabled={disable} 
                        >
                          <Grid container direction='column' alignItems="flex-end">
                            <Grid item xs={6} sm={12}>
                              <Checkbox
                                color="primary"
                                checked={cabinet}
                                name="cabinet"
                                onChange={handleChange}
                                className={classes.check}
                              />
                            </Grid>
                            <Grid item xs={6} sm={12}>
                              <Icon>
                                <img 
                                  className={classes.actionAreaimageIcon} 
                                  src={cabinetIcon} 
                                  alt="cabinet"
                                />
                              </Icon>
                            </Grid>
                          </Grid>
                        </CardActionArea>
                        <Typography variant='h6' align='center'>
                          cabinet
                        </Typography>
                      </Card>
                    </Card>     
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Container>

          <Divider />

          <Container maxWidth="lg">
            <Grid container alignItems="flex-end">
              <Grid item xs={2} sm={1}>
                <HomeIcon className={classes.extraIcon} />
              </Grid>
              <Grid item xs={10} sm={11}>
                <Typography variant='h5'>
                  Service Address
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12}>
                <Box className={classes.inputRoot}>
                  <Grid container direction="row" spacing={2}>
                    <Grid item xs={6} sm={6}>
                      <Controller
                        as={(
                          <TextField
                            id=""
                            label="First Name"
                            InputLabelProps={{ shrink: true,}}
                            variant="outlined"
                            className={classes.input}
                          />
                        )}
                        name="firstName"
                        control={control}
                        defaultValue=""
                      />
                    </Grid>
                    <Grid item xs={6} sm={6}>
                      <Controller
                        as={(
                          <TextField
                            id=""
                            label="Last Name"
                            InputLabelProps={{shrink: true}}
                            variant="outlined"
                            className={classes.input}
                          />
                        )}
                        name="lastName"
                        control={control}
                        defaultValue=""
                      />
                
                    </Grid>
                  </Grid>

                  <Grid container direction="row" spacing={2}>
                    <Grid item xs={6} sm={6}>
                      <Controller
                        as={(
                          <TextField
                            id=""
                            label="Street Address"
                            InputLabelProps={{shrink: true,}}
                            variant="outlined"
                            className={classes.input}
                          />
                        )}
                        name="address1"
                        control={control}
                        defaultValue=""
                      />
                    </Grid>
                    <Grid item xs={6} sm={6}>
                      <Controller
                        as={(
                          <TextField
                            id=""
                            label="Apt # (optional)"
                            InputLabelProps={{shrink: true,}}
                            variant="outlined"
                            className={classes.input}
                          />
                        )}
                        name="address2"
                        control={control}
                        defaultValue=""
                      />
                    </Grid>
                  </Grid>
      
                  <Grid container direction="row" spacing={2}>
                    <Grid item xs={6} sm={6}>
                      <Controller
                        as={(
                          <TextField
                            id=""
                            label="Suburb"
                            InputLabelProps={{shrink: true,}}
                            variant="outlined"
                            className={classes.input}
                          />
                        )}
                        name="suburb"
                        control={control}
                        defaultValue=""
                      />
                    </Grid>
                    <Grid item xs={6} sm={6}>
                      <Controller
                        as={(
                          <TextField
                            id=""
                            label="State"
                            InputLabelProps={{ shrink: true,}}
                            variant="outlined"
                            className={classes.input}
                          />
                        )}
                        name="state"
                        control={control}
                        defaultValue=""
                      />
                    </Grid>
                  </Grid>

                  <Grid container direction="row" spacing={2}>
                    <Grid item xs={6} sm={6}>
                      <Controller
                        as={(
                          <TextField
                            id=""
                            label="Phone Number"
                            InputLabelProps={{shrink: true,}}
                            variant="outlined"
                            className={classes.input}
                          />
                        )}
                        name="phoneNumber"
                        control={control}
                        defaultValue=""
                      />
                    </Grid>
                      
                    <Grid item xs={6} sm={6} />
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </Container>

          <Divider />
          
          <Container maxWidth="lg">
            <Grid container alignItems="flex-end">
              <Grid item xs={2} sm={1}>
                <PaymentIcon className={classes.extraIcon} />
              </Grid>
            
              <Grid item xs={10} sm={11}>
                <Typography variant='h5'>
                  Payment Information
                </Typography>
              </Grid>

              <Grid item xs={12} sm={12} />
            </Grid>
          </Container>
        
          <Container maxWidth="lg" className={classes.bookingButton}>
            <BookingButton>Complete Booking</BookingButton>
          </Container>
        </form>
      </Grid>
    </Box>
  )
}
