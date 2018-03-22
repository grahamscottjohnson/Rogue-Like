import React from "react";
import { GridItem } from "./GridItem.js";
import { GridTile } from "./GridTile.js";
// import { Enemy } from "./Enemy.js";
// import { Health } from "./Health.js";
//TODO
//<div className = "tile" style = {{width: "200px", height: "200px", bottom: "200px", left: "200px"}}></div>

export class GridBoard extends React.Component{

  render(){
    //console.log("convertStateToDisplay test is: ", this.convertStateToDisplay(10));
    const walls = this.props.walls.map( (wall) => {
      return <GridTile key = {`${wall[0][0]}_${wall[1][0]}`} startX = {40 + wall[0][0]} startY = {30 - wall[1][0]} endX = {40 + wall[0][1]} endY = {30 - wall[1][1]}/>//TODO +1 offset for width?
    });
    const enemies = [];
    for(let enemy in this.props.enemies){
      //console.log("enemy id is", this.props.enemies[enemy].id);
      enemies.push(<GridItem item = "gridEnemy" key = {this.props.enemies[enemy].id} x = {40 + this.props.enemies[enemy].x} y = {30 - this.props.enemies[enemy].y}/>);
    }
    const health = Object.keys(this.props.health).map( (hp) => {
      //console.log("hp is", hp);
      return <GridItem item = "gridHealth" key = {this.props.health[hp].id} x = {40 + this.props.health[hp].x} y = {30 - this.props.health[hp].y}/>
    });
    //console.log("in Board, arrays are:", health, enemies, walls);
    return(
      <div className = "gridBoard">
        {walls}
        {health}
        {enemies}
        <GridItem item = "gridPlayer" x = {40 + this.props.player.x} y = {30 - this.props.player.y}/>
      </div>
    )
  }
}
