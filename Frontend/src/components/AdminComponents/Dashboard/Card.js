import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Card, CardContent, Typography} from "@material-ui/core"


const useStyles = makeStyles({
  root: {
    borderRadius: "4%",
    maxWidth: 180,
    minWidth: 270,
  },

  title: {
    marginTop: "25px",
  },

  content: {
    marginBottom: "10px",
  },
})

export default function DemoCard(props) {
  const {item, num} = props
  const classes = useStyles()
  return (

    <Card className={classes.root} elevation={0}>
      <CardContent>
        <Typography color="textSecondary" className={classes.title}>
          {item}
        </Typography>
        <Typography variant="h3" className={classes.content}>
          {num}
        </Typography>
      </CardContent>

    </Card>

  )
}