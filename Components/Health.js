import React from "react";

class Health extends React.Component{
  render(){
    return(
      <div className = "health" style = {{bottom: this.props.y + "px", left: this.props.x + "px"}}></div>
    )
  }
}
