import React from "react";

class Enemy extends React.Component{
  render{
    return(
      <div className = "enemy" style = {{top: this.props.y, left: this.props.x}}></div>
    )
  }
}
