import React from "react";

export class GridBoss extends React.Component{
  render(){
    //console.log("Tile data is:", [this.props.width, this.props.height, this.props.bottom, this.props.right]);
    return(
      <div className = "gridEnemy" style = {{gridColumn: this.props.startX + " / " + (this.props.startX + 2), gridRow: (this.props.startY - 2) + " / " + this.props.startY}}></div>
    )
  }
}
