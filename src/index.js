import { createStore } from "redux";
import React from "react";
import ReactDOM from "react-dom";
import { dungeonReducer } from "./../redux/mainDungeon.js";
import { App } from "./../Components/App.js";
import { setControls } from "./../redux/mainDungeon.js";

const store = createStore(dungeonReducer);
const render = () => {
  console.log("render called, state is:", store.getState());
  ReactDOM.render(<App store = {store} state = {store.getState()}/>, document.getElementById("root"));
}
store.subscribe(render);
render();

setControls(store);
