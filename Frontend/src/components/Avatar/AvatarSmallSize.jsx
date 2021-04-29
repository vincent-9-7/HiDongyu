import React from 'react'
import { makeStyles} from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import AvatarFinder from './AvatarFinder'

const useStyles = makeStyles((themes) => ({
  
  small: {
    width: themes.spacing(3),
    height: themes.spacing(3),
  },
}))

export default function getAvatar() {

  const classes = useStyles()
  const avatarID=Math.floor(Math.random() * 20) + 1
  
  return (
    <>
      {avatarID ? (
        <Avatar src={AvatarFinder(avatarID)} alt="avatar" className={classes.small} />
      ) : (
        <Avatar src="/broken-image.jpg" className={classes.small} />
      )}
    </>
  )
}
