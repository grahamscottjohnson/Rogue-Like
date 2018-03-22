import React from "react";

class Enemy extends React.Component{
  render{
    return(
      <div className = "enemy" style = {{bottom: this.props.y + "px", left: this.props.x + "px"}}></div>
    )
  }
}
