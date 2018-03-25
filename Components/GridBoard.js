import React from "react";
import { GridItem } from "./GridItem.js";
import { GridTile } from "./GridTile.js";
import { GridBoss } from "./GridBoss.js";

//TODO: how to implement darkmode?

export class GridBoard extends React.Component{
  //TODO: error that occurs when item is in a negative grid.
  offsetX(num){ //account for screen size (40) and player position so that player is always at 0,0
    return 40 + num - this.props.player.x;
  }
  offsetY(num){ //add y because grid points down but game points up
    return 30 - num + this.props.player.y;
  }
  render(){
    //console.log("convertStateToDisplay test is: ", this.convertStateToDisplay(10));
    const walls = this.props.walls.map( (wall) => {
      return <GridTile key = {`${wall[0][0]}_${wall[1][0]}`} startX = {this.offsetX(wall[0][0])} startY = {this.offsetY(wall[1][0])} endX = {this.offsetX(wall[0][1])} endY = {this.offsetY(wall[1][1])}/>
    });
    const enemies = [];
    for(let enemy in this.props.enemies){
      //console.log("enemy id is", this.props.enemies[enemy].id);
      enemies.push(<GridItem item = "gridEnemy" key = {this.props.enemies[enemy].id} x = {this.offsetX(this.props.enemies[enemy].x)} y = {this.offsetY(this.props.enemies[enemy].y)}/>);
    }
    const health = Object.keys(this.props.health).map( (hp) => {
      //console.log("hp is", hp);
      return <GridItem item = "gridHealth" key = {this.props.health[hp].id} x = {this.offsetX(this.props.health[hp].x)} y = {this.offsetY(this.props.health[hp].y)}/>
    });
    //console.log("in Board, arrays are:", health, enemies, walls);
    return(
      <div className = "gridBoard">
        {walls}
        {health}
        {enemies}
        <GridBoss startX = {this.offsetX(this.props.boss.x)} startY = {this.offsetY(this.props.boss.y)} />
        <GridItem item = "gridPlayer" x = {this.offsetX(this.props.player.x)} y = {this.offsetY(this.props.player.y)} />
        <GridItem item = "gridWeapon" x = {this.offsetX(this.props.weapon[0])} y = {this.offsetY(this.props.weapon[1])} />
        <GridItem item = "gridExit" x = {this.offsetX(this.props.exit[0])} y = {this.offsetY(this.props.exit[1])} />
      </div>
    )
  }
}
