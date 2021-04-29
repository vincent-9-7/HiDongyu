import { makeStyles } from '@material-ui/core/styles'

const HomeComponentStyle = makeStyles(() => ({
  Picker: {
    padding: "0 10px",
    width: '100%',

    "& .MuiFormLabel-root": { 
      color: "#616161",
      fontSize: '1.3rem',
    }
  },
  
  postCodeLength: {
    width: '100%',
  },

  datePicker: {
    padding: "0 10px",
    width: '100%',

    "& .MuiFormLabel-root": { 
      color: "#616161",
      fontSize: '1.3rem',
      marginLeft: '10px',
    }
  },
})
)

export default HomeComponentStyle