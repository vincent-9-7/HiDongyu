import React from 'react'
import {
  makeStyles,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core'
import date from 'date-and-time'
import { LocationOn as LocationOnIcon, Today as TodayIcon } from '@material-ui/icons'

const useStyles = makeStyles(() => ({
  cardActive: {
    background: '#fff',
    border: '3px solid red',
    borderLeft: '4px solid #89b153',
    borderRadius: '3px',
    padding: '10px',
    margin: '10px 0',
  },
  infoCard: {
    borderBottom: '1px solid #e8ebfa',
    paddingRight: '15px'
  },
  list: {
    padding: 0
  },
  listItem: {
    padding: 0,
  },
  listIcon: {
    minWidth: 'auto',
    marginRight: '10px'
  },
  price: {
    color: '#464646',
    borderRadius: '5px',
    fontSize: '1.2rem',
    fontWeight: 700
  },
  status: {
    marginTop: '5px',
    color: '#5f647d',
    fontWeight: 700
  },
  styleCancelled: {
    color: '#cc584e'
  },
  styleConfirm: {
    color: '#89b153'
  },
  styleProgress: {
    color: '#0878e6'
  }
}))

function formatDate(time) {
  try {
    let result = date.parse(time.split('.')[0], 'YYYY-MM-DD hh:mm:ss')
    result = result.toString().split(" ")
    return `${result[0]} ${result[2]} ${result[1]} ${result[3]}`
  } catch {
    return "There's no exact time in this part. "
  }
}

const OrderCard = (props) => {
  const classes = useStyles()
  const { title, price, address, startDate, status, classToUse } = props
  const { suburb, state } = address
  const displayDate = formatDate(startDate)
  const displayAddress = `${suburb} ${state.toUpperCase()}`
  return(
    <>
      <Grid
        container
        justify="space-between"
        alignItems="center" 
        className={classes.infoCard}
      >
        <Typography variant="subtitle2" component="h3" className={classes.price}>
          {title}
        </Typography>
        <Typography variant="h5" className={classes.price}>
          $
          {price}
        </Typography>
      </Grid>
      <List className={classes.list}>
        <ListItem className={classes.listItem}>
          <ListItemIcon className={classes.listIcon}>
            <LocationOnIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText secondary={displayAddress} />
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemIcon className={classes.listIcon}>
            <TodayIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText secondary={displayDate} />
        </ListItem>
      </List>
      <Typography
        variant="caption"
        component="p" 
        className={`${classes.status} ${classes[classToUse]} text-uppercase`}
      >
        {status}
      </Typography>
    </>
  )
}

export default OrderCard