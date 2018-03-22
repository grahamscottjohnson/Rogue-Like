import React from "react";
//TODO
//we use className in our component. Do I need to import css so that the componenet knows what to do with info?

export class Header extends React.Component{
  render(){
    //console.log("render Header");
    return(
      <div>
        <span className = "info">Dungeon: {this.props.dungeon}</span>
        <span className = "info">Health: {this.props.health}</span>
        <span className = "info">Weapon: {this.props.weapon}</span>
        <span className = "info">Level: {this.props.level}</span>
        <span className = "info">XP: {this.props.XP}</span>
      </div>
    )
  }
}
