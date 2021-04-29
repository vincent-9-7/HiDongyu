import React from 'react'
import { makeStyles, Grid, Typography, Box } from '@material-ui/core'
import PostAddIcon from '@material-ui/icons/PostAdd'

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    paddingLeft: 10,
  },
  textcolor: {
    color: '#007bf5'
  },
  icon: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginLeft: 10,
  },
})

export default function Extra(props) {
  const classes = useStyles()

  let items = ''
  if (Object.values(props)[0] === 1) {
    items = "Cabinets, "
  }
  if (Object.values(props)[1] === 1) {
    items += "Fridge, "
  }
  if (Object.values(props)[2] === 1) {
    items += "Oven, "
  }
  if (Object.values(props)[3] === 1) {
    items += "InteriorWindows  "
  }
  if (Object.values(props) === [0, 0, 0, 0, "RC"] || Object.values(props) === [0, 0, 0, 0, "EC"]) {
    items = "No extra items. "
  }
  let item = ''
  if (Object.values(props)[4] === "EC") {
    item = "Cabinets, Fridge, Oven, InteriorWindows "
  } else { item = items.slice(0, -2) }

  return (
    <Box display="flex" flexDirection="row">
      <Grid item xs={2} sm={1} className={classes.icon}>
        <PostAddIcon />
      </Grid>
      <Grid item xs={9} sm={10} className={classes.text}>
        <Typography className={classes.textcolor} variant="subtitle2">
          EXTRA
        </Typography>
        <Typography variant="body2">
          {item}
        </Typography>
      </Grid>
    </Box>
  )
}
