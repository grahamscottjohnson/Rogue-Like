import React from "react";

/*
export const Player = (props) => {
  <div className = "player" style = {{top: this.props.y, left: this.props.x}}></div>
}
*/

export class GridItem extends React.Component{
  render(){
    return (
      <div className = {this.props.item} style = {{gridRow: this.props.y + " / " + (this.props.y - 1), gridColumn: this.props.x + " / " + (this.props.x + 1)}}></div>
    )
  }
}
