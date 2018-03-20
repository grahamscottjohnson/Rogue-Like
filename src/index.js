/*
PLAN:

  Phase 1: NEEDS TESTING
  player can move,--> player object
    can't run into wall --> wall object
  pick up objects, --> health and weapons objects
  fight enemies, -- enemies object
    able to kill enemies
    randomness in attacks
    Gain XP
  all of which change a property in player

  Phase 2: NEEDS TESTING
  dungeon gets randomized
    collection of divs/rectangles
  player able to die, // TODO
  move to next level

  Phase 3:
  some amount of darkness
    opacity


*/
//TODO react Components
import { createStore } from "redux";
import { React } from "react";
import { ReactDOM } from "react-dom";
import { dungeonReducer } from "../../redux/mainDungeon.js";
import { App } from "../../Components/App.js";

const store = createStore(dungeonReducer);
const render = () => {
  ReactDOM.render(<App />, document.getElementById("root"));
}
store.subscribe(render);

document.body.addEventListener("keypress", () => {
  action = {type: ""};
  switch(event.keyCode){ //TODO
    case 37:
    action.type = "MOVE_LEFT";
    break;
    case 38:
    action.type = "MOVE_UP";
    break;
    case 39:
    action.type = "MOVE_RIGHT";
    break;
    case 40:
    action.type = "MOVE_DOWN";
    break;
    default:
    return null;
  }
  store.dispatch(action);
})
