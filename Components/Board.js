import React from "react";
import Player from "./Player.js";
import Tile from "./Tile.js";
//TODO

export class Board extends React.Component{
  convertStateToDisplay(num){
    return 10 * num; //TODO if needed
  }

  render(){
    return(
      <div className = "board">
        <div>
          "This is a test"
        </div>
        {this.props.walls.map( (wall) => {
          return <Tile width = {10 * (wall[0][1] - wall[0][0])} height = {10 * (wall[1][1] - wall[1][1])}
            bottom = {this.convertStateToDisplay(wall[1][0])} right = {this.convertStateToDisplay(wall[0][1])}/>//TODO +1 offset for width?
        })}
        <Player bottom = {10 * this.props.player.y} right = {10 * this.props.player.x}/>
      </div>
    )
  }
}
