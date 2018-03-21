import React from "react";
import Header from "./Header.js";
import Board from "./Board.js";

export class App extends React.Component{
  render(){
    console.log("begin render App");
    return(
      <div>
        <Header XP = {this.props.state.player.XP} health = {this.props.state.player.health} level = {this.props.state.player.level} dungeon = {this.props.state.level} weapon = {this.props.state.player.weapon}/>
        <Board walls = {this.props.state.walls} player = {this.props.state.player} />
      </div>
    )
  }
}
