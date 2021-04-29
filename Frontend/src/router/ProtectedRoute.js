/* eslint-disable consistent-return */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/react-in-jsx-scope */
import { Route, Redirect } from "react-router-dom"


export default ({component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
        if(((props.location.pathname.includes("/admin") 
        && (localStorage.getItem("authLevel") === "admin")) ||
          (!props.location.pathname.includes("/admin") && localStorage.getItem("authLevel"))
        )) return <Component {...props} />
        return <Redirect to="/" />

      }}
  />
  )