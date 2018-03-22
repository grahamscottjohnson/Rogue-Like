import React from "react";
import { Player } from "./Player.js";
import { Tile } from "./Tile.js";
import { Enemy } from "./Enemy.js";
import { Health } from "./Health.js";
//TODO
//<div className = "tile" style = {{width: "200px", height: "200px", bottom: "200px", left: "200px"}}></div>

export class Board extends React.Component{
  convertStateToDisplay(num){
    return 10 * num; //TODO if needed
  }

  render(){
    //console.log("convertStateToDisplay test is: ", this.convertStateToDisplay(10));
    const walls = this.props.walls.map( (wall) => {
      return <Tile key = {`${wall[0][0]}_${wall[1][0]}`} width = {10 * (wall[0][1] - wall[0][0])} height = {10 * (wall[1][1] - wall[1][0])}
        bottom = {this.convertStateToDisplay(wall[1][1])} left = {this.convertStateToDisplay(wall[0][0])}/>//TODO +1 offset for width?
    });
    //console.log("in Board, walls is:", walls);
    return(
      <div className = "board">
        <div className = "center">
          {walls}
          <Player bottom = {10 * this.props.player.y + 10} left = {10 * this.props.player.x}/>
          {this.props.enemies.map( (enemy) => {
            return <Enemy key = {enemy.id} bottom = {10 * enemy.y + 10} left = {10 * enemy.x}/>
          })}
          {this.props.health.map( (hp) => {
            return <Health key = {hp.id} bottom = {10 * hp.y + 10} left = {10 * hp.x}/>
          })}
        </div>
      </div>
    )
  }
}
