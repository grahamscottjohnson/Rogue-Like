import React from "react";

export class GridHealth extends React.Component{
  render(){
    return(
      <div className = "gridHealth" style = {{bottom: this.props.y + "px", left: this.props.x + "px"}}></div>
    )
  }
}
