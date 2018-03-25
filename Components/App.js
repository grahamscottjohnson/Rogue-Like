import React from "react";
import { Header } from "./Header.js";
import { GridBoard } from "./GridBoard.js";

//TODO: toggleDarkMode needs testing
export class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      darkMode: true,
    }
    this.toggleDarkMode = this.toggleDarkMode.bind(this);
  }
  toggleDarkMode(){
    //this.state.darkMode = !this.state.darkMode;
    setState({darkMode: !this.state.darkMode});
  }
  render(){
    //console.log("begin render App");
    return(
      <div>
        <Header XP = {this.props.state.player.XP} health = {this.props.state.player.health} level = {this.props.state.player.level} dungeon = {this.props.state.level} weapon = {this.props.state.player.weapon}/>
        <GridBoard darkMode = {this.state.darkMode} boss = {this.props.state.boss} walls = {this.props.state.walls} player = {this.props.state.player} enemies = {this.props.state.enemies} health = {this.props.state.health} weapon = {this.props.state.weapon} exit = {this.props.state.exit}/>
        <button onClick = {this.toggleDarkMode}>Toggle Darkness</button>
      </div>
    )
  }
}
