import React from "react";

class Tile extends React.Component{
  render{
    return(
      <div className = "tile" style = {{width: {this.props.width} height: {this.props.height}
      bottom: {this.props.bottom} right: {this.props.right}}}></div>
    )
  }
}
