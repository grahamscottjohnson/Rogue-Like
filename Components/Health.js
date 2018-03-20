import React from "react";

class Health extends React.Component{
  render{
    return(
      <div className = "health" style = {{top: this.props.y, left: this.props.x}}></div>
    )
  }
}
