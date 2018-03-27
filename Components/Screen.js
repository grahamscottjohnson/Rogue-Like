import React from "react";

export class Screen extends React.Component{
  render(){
    return(
      <div className = "screen">
        <div className = "announcement">
          {this.props.text}
        </div>
        <button className = "retryButton" onClick = {this.props.onClick}>{this.props.buttonText}</button>
      </div>
    )
  }
}
