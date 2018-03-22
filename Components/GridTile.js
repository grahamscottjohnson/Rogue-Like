import React from "react";

export class GridTile extends React.Component{
  render(){
    //console.log("Tile data is:", [this.props.width, this.props.height, this.props.bottom, this.props.right]);
    return(
      <div className = "tile" style = {{gridColumn: this.props.startX + " / " + this.props.endX, gridRow: this.props.startY + " / " + this.props.endY}}></div>
    )
  }
}
