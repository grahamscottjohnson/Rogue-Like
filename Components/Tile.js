import React from "react";

export class Tile extends React.Component{
  render(){
    //console.log("Tile data is:", [this.props.width, this.props.height, this.props.bottom, this.props.right]);
    return(
      <div className = "tile" style = {{width: this.props.width + "px", height: this.props.height + "px", bottom: this.props.bottom + "px", left: this.props.left + "px"}}></div>
    )
  }
}
