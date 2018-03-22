import React from "react";
import { Header } from "./Header.js";
import { GridBoard } from "./GridBoard.js";

export class App extends React.Component{
  render(){
    //console.log("begin render App");
    return(
      <div>
        <Header XP = {this.props.state.player.XP} health = {this.props.state.player.health} level = {this.props.state.player.level} dungeon = {this.props.state.level} weapon = {this.props.state.player.weapon}/>
        <GridBoard walls = {this.props.state.walls} player = {this.props.state.player} enemies = {this.props.state.enemies} health = {this.props.state.health}/>
      </div>
    )
  }
}
