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
  isInBounds(x, y){ // x and y should be offset
    //detect if in the gridbox
    return x >= 0 && x < 80 && y > 1 && y <= 61
  }
  isInLight(x, y){ // x and y should be offset
    //detect if component should be displayed by detecting it's x and y values
    //

    let a = x - this.offsetX(this.props.player.x) + .5;
    let b = y - this.offsetY(this.props.player.y)+ .5;
    return Math.sqrt(a*a + b*b) < 6 || !this.props.darkMode;



    //return modified display point
  }
  shouldRender(x, y){
    x = this.offsetX(x);
    y = this.offsetY(y);
    return this.isInBounds(x, y) && this.isInLight(x, y);
  }
  render(){
    //console.log("convertStateToDisplay test is: ", this.convertStateToDisplay(10));
    let walls = {};
    this.props.walls.forEach( (wall) => {
      for(let i = wall[0][0]; i < wall[0][1]; i += 1){
        for(let j = wall[1][0]; j < wall[1][1]; j += 1){
          if (walls[`${i}_${j}`] === undefined){
            walls[`${i}_${j}`] = {
              component: <GridItem item = "gridTile" key = {`${i}_${j}`} x = {this.offsetX(i)} y = {this.offsetY(j)}/>,
              x: i,
              y: j,
            };
          }
        }
      }
      //return <GridTile key = {`${wall[0][0]}_${wall[1][0]}`} startX = {this.offsetX(wall[0][0])} startY = {this.offsetY(wall[1][0])} endX = {this.offsetX(wall[0][1])} endY = {this.offsetY(wall[1][1])}/>
    });
    let enemies = [];
    for(let enemy in this.props.enemies){
      //console.log("enemy id is", this.props.enemies[enemy].id);
      let x = this.offsetX(this.props.enemies[enemy].x);
      let y = this.offsetY(this.props.enemies[enemy].y);
      if (this.shouldRender(this.props.enemies[enemy].x, this.props.enemies[enemy].y)){
        enemies.push(<GridItem item = "gridEnemy" key = {this.props.enemies[enemy].id} x = {x} y = {y}/>);
      }
    }
    const health = Object.keys(this.props.health).map( (hp) => {
      //console.log("hp is", hp);
      let x = this.offsetX(this.props.health[hp].x);
      let y = this.offsetY(this.props.health[hp].y);
      if ( this.isInBounds(x, y) && this.isInLight(x, y) ){
        return <GridItem item = "gridHealth" key = {this.props.health[hp].id} x = {x} y = {y}/>
      }
    });
    //console.log("in Board, arrays are:", health, enemies, walls);
    return(
      <div className = "gridBoard">
        {Object.keys(walls).map( (space) => {
          return (this.shouldRender(walls[space].x, walls[space].y) && walls[space].component);
        })}
        {health}
        {enemies}
        {(this.shouldRender(this.props.boss.x, this.props.boss.y) && <GridBoss startX = {this.offsetX(this.props.boss.x)} startY = {this.offsetY(this.props.boss.y)} />)}
        {(this.shouldRender(this.props.player.x, this.props.player.y) &&<GridItem item = "gridPlayer" x = {this.offsetX(this.props.player.x)} y = {this.offsetY(this.props.player.y)} />)}
        {(this.shouldRender(this.props.weapon[0], this.props.weapon[1]) && <GridItem item = "gridWeapon" x = {this.offsetX(this.props.weapon[0])} y = {this.offsetY(this.props.weapon[1])} />)}
        {(this.shouldRender(this.props.exit[0], this.props.exit[1]) &&<GridItem item = "gridExit" x = {this.offsetX(this.props.exit[0])} y = {this.offsetY(this.props.exit[1])} />)}
      </div>
    )
  }
}
