import React from "react";
import { Header } from "./Header.js";
import { GridBoard } from "./GridBoard.js";
import { Screen } from "./Screen.js";
//import { store } from "./../src/index.js";

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
    this.setState({darkMode: !this.state.darkMode});
  }
  getScreenInfo(){
    //looks at state and determines if dead or has won
    let text = "Error: not able to find outcome in getScreenInfo in App.js";
    if (this.props.state.winner){
      text = "You Win!"
    }
    else if (this.props.state.dead){
      text = "You Lose"
    }
    return [this.props.state.dead || this.props.state.winner, text];
  }
  render(){
    //console.log("begin render App");
    const screen = this.getScreenInfo();
    return(
      <div>
        {!screen[0] && <Header XP = {this.props.state.player.XP} health = {this.props.state.player.health} level = {this.props.state.player.level} dungeon = {this.props.state.level} weapon = {this.props.state.player.weapon}/> }
        {!screen[0] && <GridBoard darkMode = {this.state.darkMode} boss = {this.props.state.boss} walls = {this.props.state.walls} player = {this.props.state.player} enemies = {this.props.state.enemies} health = {this.props.state.health} weapon = {this.props.state.weapon} exit = {this.props.state.exit}/> }
        {!screen[0] && <button onClick = {this.toggleDarkMode}>Toggle Darkness</button> }
        {screen[0] && <Screen text = {screen[1]} buttonText = "Play Again?" onClick = {() => {
          this.props.store.dispatch({type: "RESTART"});
        }}/> }
      </div>
    )
  }
}
