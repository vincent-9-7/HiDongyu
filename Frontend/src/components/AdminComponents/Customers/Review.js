import React from 'react'
import { makeStyles, Grid, Typography, Box } from '@material-ui/core'
import RateReviewIcon from '@material-ui/icons/RateReview'
import { Rating } from '@material-ui/lab'

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: 10,
  },
  rate: {
    display: "flex",
    flexDirection: "column",
    "& > * + *": {
      marginTop: theme.spacing(1)
    }
  },
  rating: {
    marginLeft: '10px',
  },
  textcolor: {
    color: '#007bf5'
  },
  comment: {
    background: '#efefef',
    padding: '10px'
  },
  icon: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginLeft: 10,
  },
  svg: {
    width: 23,
  },
}))

export default function Review(props) {
  const classes = useStyles()
  const { rating, review } = props
  return (
    <Box display="flex" flexDirection="row">
      <Grid item xs={2} sm={1} className={classes.icon}>
        <RateReviewIcon className={classes.svg} />
      </Grid>
      <Grid item xs={9} sm={10} className={classes.text}>
        <Typography className={classes.textcolor} variant="subtitle2">
          CUSTOMER`S REVIEW
        </Typography>
        <Grid container direction="row">
          <Rating
            name="half-rating-read"
            value={rating}
            precision={0.5}
            readOnly
            className={classes.icon}
          />
        </Grid>
        {review && (
          <Typography variant="body1" className={classes.comment}>
            {review}
          </Typography>
        )}
      </Grid>
    </Box>
  )
}
