/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React,{useState} from "react"
import Icon from '@material-ui/core/Icon'
import Dialog from '@material-ui/core/Dialog'
import Divider from '@material-ui/core/Divider'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import {useDispatch,useSelector} from 'react-redux'
import { useForm, Controller } from "react-hook-form"
import { TextField,Typography,Grid,Button} from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles'
import SaveIcon from '@material-ui/icons/Save'
import {updateProfileRequest} from "../../../store/actions/actionCreator"
import security from "../../../assets/security.svg"
import scssStyle from "../scss/Profile.module.scss"


const useStyles = makeStyles((theme) => ({
  input: {
    color: 'white',
  },

  actionAreaimageIcon: {
    width: '60%',
  },

  button: {
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    fontSize: '1rem',
    marginLeft: '10px',
    marginTop: '2rem',
    paddingInline: '50px',
    textalign: 'left',

    '&:hover': {
      background: theme.palette.primary.hover,
      boxShadow: '0px 2px 10px #888',},
  },

  formcenter: {
    paddingBottom: '10px',
    width: '100%',
  },

  button1: {
    background: theme.palette.primary.main,
    boxShadow: '0px 2px 6px #888',
    color: theme.palette.primary.contrastText,
    fontSize: '1rem',
    justifyContent: "left",
    marginTop: '2rem',
    paddingInline: '50px',

    '&:hover': {
      background: theme.palette.primary.hover,
      boxShadow: '0px 2px 10px #888',},
  },

  buttonCancel: {
    background: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    fontSize: '1rem',
    marginLeft: '3vh',
    marginTop: '2rem',
    paddingInline: '50px',
    textalign: 'left',

    '&:hover': {
      background: theme.palette.secondary.main,
      boxShadow: '0px 2px 10px #888',},
  },

  dialog: {
    padding: "4vh 2vh",
  },

  margintop: {
    marginTop: '30px',
    [theme.breakpoints.down(('xs'))]:{
      marginTop: "0px",
    },
  }
}))

export default function TextForm() {
  const { control, handleSubmit } = useForm()
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()
  const onSubmit = data => {
    setOpen(true)
    if(data.type!==""
    &&data.postcode!=="" &&data.birthday!=="" 
    &&data.firstName!=="" &&data.lastName!=="" &&data.phone!==""
    &&data.address1!==""&&data.suburb!=="" &&data.state!==""
    ) {
  const newData = {
    address:{
      address1:data.address1,
      address2:data.address2,
      suburb:data.suburb,
      state:data.state,
      postcode:data.postcode,
    },
    phone:data.phone,
    name:{
      firstName:data.firstName,
      lastName:data.lastName,
    }
  } 
    dispatch(updateProfileRequest(newData)) 
  }}
  const detail = useSelector(state => state.employee_in_reducer_index)
  const handleClose = () =>{
    setOpen(false)
    document.location.href = '/profile'
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid 
        container
        direction="row"
        spacing={2}
        justify="center"
        alignItems="center"
        alignContent="center"
        className={classes.center}
      >
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          className={scssStyle.backgroundHeader}
        >
          <Grid item xs={1} sm={1} />
          <Grid item xs={5} sm={2}>
            <Icon>
              <img 
                className={classes.actionAreaimageIcon} 
                src={security} 
                alt="security"
              />
            </Icon>
          </Grid>
          <Grid item xs={6} sm={9}>
            <Typography variant='subtitle1'>
              Personal information
            </Typography>
          </Grid>
          <Grid item xs={6} sm={3} />
        </Grid>
        <Grid item xs={12} sm={6} className={classes.margintop}>
          <Controller
            className={classes.formcenter}
            as={(
              <TextField
                id="outlined-firstName-input"
                label="First Name"
                type="firstName"
                autoComplete="current-firstName"
                variant="outlined"
              />
)}
            name="firstName"
            control={control}
            defaultValue=""
            required
          />
        </Grid>
        <Grid item xs={12} sm={6} className={classes.margintop}>
          <Controller
            className={classes.formcenter}
            as={(
              <TextField
                id="outlined-lastName-input"
                label="Last Name"
                type="lastName"
                background="aliceblue"
                autoComplete="current-lastName"
                variant="outlined"
              />
 )}
            name="lastName"
            control={control}
            defaultValue=""
            required
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Controller
            className={classes.formcenter}
            as={(
              <TextField
                id="outlined-address1-input"
                label="Address"
                type="address1"
                autoComplete="current-address1"
                variant="outlined"
              />
 )}
            name="address1"
            control={control}
            defaultValue=""
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            className={classes.formcenter}
            as={(
              <TextField
                id="outlined-address2-input"
                label="Address(Option)"
                type="address2"
                autoComplete="current-address2"
                variant="outlined"
              />
 )}
            name="address2"
            control={control}
            defaultValue=""
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            className={classes.formcenter}
            as={(
              <TextField
                id="outlined-phone-input"
                label="Phone"
                type="phone"
                autoComplete="current-phone"
                variant="outlined"
              />
 )}
            name="phone"
            control={control}
            defaultValue=""
            required
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Controller
            className={classes.formcenter}
            as={(
              <TextField
                id="outlined-suburb-input"
                label="Suburb"
                type="suburb"
                autoComplete="current-suburb"
                variant="outlined"
              />
 )}
            name="suburb"
            control={control}
            defaultValue=""
            required
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Controller
            className={classes.formcenter}
            as={(
              <TextField
                id="outlined-state-input"
                label="State"
                type="state"
                autoComplete="current-state"
                variant="outlined"
              />
 )}
            name="state"
            control={control}
            defaultValue=""
            required
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Controller
            className={classes.formcenter}
            as={(
              <TextField
                id="outlined-postcode-input"
                label="Postcode"
                type="postcode"
                autoComplete="current-postcode"
                variant="outlined"
              />
 )}
            name="postcode"
            control={control}
            defaultValue=""
            required
          />
        </Grid>
        <Grid
          container
          direction="row"
          alignItems="center"
        >
          <Grid item xs={6} sm={3}>
            <Button 
              type="submit"
              variant="contained"
              size="medium"
              startIcon={<SaveIcon />}
              className={classes.button}
            >
              SAVE
            </Button> 
          </Grid>
          <Grid item xs={6} sm={4}>
            <Button 
              type="submit"
              variant="contained"
              size="medium"
              className={classes.buttonCancel}
            >
              Cancel
            </Button> 
          </Grid>
        </Grid>
      </Grid>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className={classes.dialog}>
          Update profile successfully!
        </DialogTitle>
        <Dialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            Updated
          </DialogTitle>
          <Divider />
          <DialogContent>
            <Typography dividers>
              Congratulations! Your information has been updated successfully!
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose} color="primary" className={classes.button1}>
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </Dialog>
    </form>
  )
}



