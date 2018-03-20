import React from "react";
import Header from "./Header.js";
import Board from "./Board.js";
//TODO

export class App extends React.Component{
  render(){
    return(
      <div>
        <Header XP = {this.props.state.player.XP} health = {this.props.state.player.health} level = {this.props.state.player.level} dungeon = {this.props.state.level} weapon = {this.props.state.player.weapon}/>
        <Board />
      </div>
    )
  }
}
