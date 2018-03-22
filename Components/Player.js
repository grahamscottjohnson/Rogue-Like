import React from "react";

/*
export const Player = (props) => {
  <div className = "player" style = {{top: this.props.y, left: this.props.x}}></div>
}
*/

export class Player extends React.Component{
  render(){
    return (
      <div className = "player" style = {{bottom: this.props.bottom + "px", left: this.props.left + "px"}}></div>
    )
  }
}
