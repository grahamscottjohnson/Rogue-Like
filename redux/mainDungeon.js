/*STATE:
  player:
    x:
    y:
    weapon:
    health:
    level:
    XP:
  health: {
    _x_y: {
      x:
      y:
      id: _x_y
      health: 10;
    }
  }
  enemies: {
    _x_y: {
      x:
      y:
      id: _x_y
      health:
      damage:
      XP:
    }
  }
  weapon: [x,y,"name"]
  exit: [x,y]
  walls: [], //ex: [[[x1, x2], [y1, y2]], ...]
  level: number
*/

/*PLAN:

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
    Boss on level 4
  player able to die, // TODO
  move to next level

  Phase 3:
  add darkness
    opacity
  center screen on player


*/
import { createDungeon } from "./walls.js";

//Most important TODO: object assignment in movePlayerTo

export function setControls(store){
  window.addEventListener("keydown", (event) => {
    console.log("In window event in index.js, event is:", event);
    let action = {type: ""};
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
  });
}
export function dungeonReducer(state, action){
  if (state === undefined){
    return makeNewGame();
  }
  switch(action.type){
    case "MOVE_LEFT":
      return movePlayerTo(state, state.player.x - 1, state.player.y); //movePlayerTo does logic to change state
    case "MOVE_UP":
      return movePlayerTo(state, state.player.x, state.player.y + 1); //movePlayerTo does work to change state
    case "MOVE_RIGHT":
      return movePlayerTo(state, state.player.x + 1, state.player.y); //movePlayerTo does work to change state
    case "MOVE_DOWN":
      return movePlayerTo(state, state.player.x, state.player.y - 1); //movePlayerTo does work to change state
    case "RESTART":
      //prompt a Game Over screen that fades to new game
      return makeNewGame();
    default:
      return state;
    //I don't think I need these anymore since i wrote normal methods that do this:
    // case: "PICK_UP_HEALTH" //needs health key
    //   return pickUpHealth(state, action.key);
    // case: "PICK_UP_WEAPON" //on gameboard
    //   return pickUpWeapon(state, action.key);
    // case: "COMBAT": // action needs enemy key
    //   return combat(state, action.key);
    // case: "HEALTH_UP": // moved
    //   return {...state, {health: state.health + 10}};
    // case: "HEALTH_DOWN": //moved to Combat
    //   return {...state, {health: state.health - action.damage}};
    // case: "WEAPON_UP":
    //   return (...state, (power: action.power));
  }
}
function makeNewGame(){
  let newState = initializeState({
    weapon: "Stick",
    health: 100,
    level: 1,
    XP: 0,
  }, createDungeon(1)); // this creates a dependency between initializeState and createDungeon
  //console.log("initialized state in makeNewGame, value is:", newState);
  return newState;
}
function initializeState(player, dungeon){
  //console.log("In initializeState, dungeon and player are:", dungeon, player);
  let newPlayer = Object.assign({}, player);
  newPlayer.x = dungeon.player.x;
  newPlayer.y = dungeon.player.y;
  //player.id = dungeon.player.id;
  let newState = {};
  Object.keys(dungeon).forEach( (key) => {
    newState[key] = key === "player" ? newPlayer : dungeon[key];
  });
  //console.log("In initializeState, newState is:", newState);
  return newState;
  //return Object.assign({}, player, ...dungeon); would the dungeon.player overwrite all of player's properties or just x and y?
}
function gainXP(player, XP){
  player.XP += XP;
  if (player.XP >= player.level * 100){ // check if level UP
    player.XP -= player.level * 100;
    player.level += 1;
  }
  return player;
}
function combat(state, key){
  let player = Object.assign({}, state.player);
  player.health -= state.enemies[key].damage;
  if (player.health <= 0){
    //TODO Game over
    //Death Animation
    //Game Over Screen
      //return makeNewGame()
  }
  let enemies = Object.assign({}, state.enemies);
  enemies[key].health -= randomize(playerDamage(player.weapon, player.level));
  if (enemies[key].health <= 0){
    player = gainXP(player, enemies[key].XP);
    delete enemies[key];
  }
  return Object.assign({}, state, enemies, player);
}
function pickUpHealth(state, key){
  let player = Object.assign({}, state.player);
  player.health += state.health[key].health;
  let health =  Object.assign({}, state.health);
  delete health[key];
  return Object.assign({}, state, health, player); // TODO (check for other similar functions) does this return the right state? your combining the whole state and health, does that make health a property or not?
}
function pickUpWeapon(state, key){ //on gameboard
  let player = Object.assign({}, state.player);
  //let player = Object.assign({}, state.player);
  player.weapon = state.weapon[2];
  return Object.assign({}, state, {weapon: []}, player);
}
function playerDamage(weapon, level){
  //calculate damage
  let damage = 0;
  switch(weapon){
    case "Stick":
      damage = 1;
      break;
    case "Dagger":
      damage = 10;
      break;
    case "Sword":
      damage = 20;
      break;
    case "Long Sword":
      damage = 30;
      break;
    case "Hero's Sword": // TODO check if apostrophe creates error
      damage = 40;
      break;
  }
  return damage + level * 10;
}
function randomize(num){
  return Math.round(num * (1 + (.3 * Math.random() - .15))); // within 15% of num
}
function isInBounds(walls, x, y){ //this approach is inentionally trying to not optimize searching and be lazy. Should I be worried about that?
  //console.log("in isInBounds, walls is: ", walls);
  return walls.some( (wall) => { //assumes a sorted point
    return x >= wall[0][0] && x < wall[0][1] && y >= wall [1][0] && y < wall[1][1];
  })
}
function itemAt(state, key){
  console.log("in ItemAt, state and key are:", state, key);
  let item = "EMPTY";
  if (state.enemies[key]){
    item = "ENEMY";
  }
  else if (state.health[key]){
    item = "HEALTH";
  }
  else if ([state.weapon[0], state.weapon[1]] === [Number(key.charAt(1)), Number(key.charAt(3))]){
    item = "WEAPON";
  }
  else if ([state.exit[0], state.exit[1]] === [Number(key.charAt(1)), Number(key.charAt(3))]){
    item = "EXIT";
  }
  else{
    console.log("No Item found in itemAt");
  }
  return item;
}
function movePlayerTo(state, x, y){ //should only be called in reponse to a key input
  //returns if player should move
  if (!isInBounds(state.walls, x, y)){
    console.log("destination is not in bounds");
    return state;
  }
  console.log("test make key:");
  let key = `_${x}_${y}`;
  console.log("moving player in movePlayerTo, state and key are", state, key);
  let item = itemAt(state, key);
  let newState = {};
  let player = {};
  console.log("itemAt in movePlayerTo returned:", item);
  switch(item){
    case "ENEMY":
      return combat(state, key);
    case "HEALTH":
      newState = pickUpHealth(state, key);
      player = Object.assign({}, newState.player, {x, y});
      return newState;
    case "WEAPON":
      newState = pickUpWeapon(state, key);
      player = Object.assign(newState.player, {x, y});
      return Object.assign(newState, player);
    case "EXIT":
      return initializeState(state.player, createDungeon(state.level + 1));;
    case "EMPTY":
      player = Object.assign({}, state.player);
      delete player.x;
      player.x = x;
      delete player.y;
      player.y = y;
      console.log("in EMPTY in movePlayerTo, test of deletion is:", state.player.x, player.x, state.player.y, player.y);
      //player = Object.assign({}, state.player, {x, y});
      newState = Object.assign({}, state);
      newState.player = player;
      //TODO make a new test file testing all this object assignment stuff. Draw a picture of it.
      return newState;
    default:
      console.log("ERROR: item not found, item is:", item);
      return state
  }
}

//Why didn't i write test before code?
//because I had no idea what the structure of my code was going to look like.
//I did a good job of organizing the state, but
//I did a poor job of organizing the reducers/methods

//Planning checklist:
  //what does data/state look like?
  //what are the methods that get called to implement feature
  //how should these change the state (i.e. where in the reducer cycle are they)
  //input/output of this method should be: ____
  //now test it.

// function testAllowMovement(){ //i made better code, so now i cant test it.
//   const stateBefore = {};
//   expect allowMovement
// }
