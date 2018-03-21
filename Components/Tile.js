import React from "react";

class Tile extends React.Component{
  render(){
    return(
      <div className = "tile" style = {{width: this.props.width + "px", height: this.props.height +"px",
      bottom: this.props.bottom + "px", right: this.props.right + "px"}}></div>
    )
  }
}
