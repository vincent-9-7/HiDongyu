import React from 'react'
import withWidth from '@material-ui/core/withWidth'

function MyComponent(props) {
  const {width} = props
  return (
    <div>
      {`当前宽度: ${width}`}
    </div>
)
}

export default withWidth()(MyComponent)