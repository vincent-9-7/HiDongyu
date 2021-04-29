import React from 'react'
import {
  makeStyles,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core'

const useStyles = makeStyles(() => ({
  action: {
    padding: '10px 25px 25px'
  },
}))

/**
 * DialogPopup() is a pagination components
 * @param open: (bool) set dialog to open
 * @param handleAlertClose: (func) handle close the dialog
 * @param handleAlertConfirm: (func) handle confirm action for the dialog
 */
export default function DialogPopup (props) {
  const { open, handleAlertClose, handleAlertConfirm, userdata } = props
  const classes = useStyles()

  return(
    <Dialog
      open={open}
      onClose={handleAlertClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Do you want to delete this user?</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {userdata && `User: ${userdata.name.firstName}(${userdata.email})`}
        </DialogContentText>
      </DialogContent>
      <DialogActions className={classes.action}>
        <Button onClick={handleAlertConfirm} variant="contained" color="secondary">
          Delete
        </Button>
        <Button onClick={handleAlertClose} variant="contained" autoFocus>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}