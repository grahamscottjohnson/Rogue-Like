/*
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
*/

function dungeonReducer(state, action){
  switch(action.type){
    case: "MOVE_LEFT":
      return movePlayerTo(state, state.player.x - 1, state.player.y); //movePlayerTo does work to change state
    case: "MOVE_UP":
      return movePlayerTo(state, state.player.x, state.player.y + 1); //movePlayerTo does work to change state
    case: "MOVE_RIGHT":
      return movePlayerTo(state, state.player.x + 1, state.player.y); //movePlayerTo does work to change state
    case: "MOVE_DOWN":
      return movePlayerTo(state, state.player.x, state.player.y - 1); //movePlayerTo does work to change state
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
function gainXP(player, XP){
  player.XP += XP;
  if (player.XP >= player.level * 100){ // check if level UP
    player.XP -= player.level * 100;
    player.level += 1;
  }
  return player;
}
function combat(state, key){
  player = {...state.player};
  player.health -= state.enemies[key].damage;
  if (player.health <= 0){
    //TODO Game over
  }
  enemies = {...state.enemies};
  enemies[key].health -= randomize(playerDamage(player.weapon, player.level));
  if (enemies[key].health <= 0){
    player = gainXP(player, enemies[key].XP);
    delete enemies[key];
  }
  return {...state, enemies, player};
}
function pickUpHealth(state, key){
  let player = {...state.player};
  player.health += state.health[action.key].health;
  health = {...state.health};
  delete health[action.key];
  return {...state, health, player};
}
function pickUpWeapon(state, key){ //on gameboard
  let player = {...state.player};
  player.weapon = state.weapon[2];
  return {...state, {weapon: []}, player};
}
function playerDamage(weapon, level){
  //calculate damage
  let damage = 0;
  switch(weapon){
    case "1": //TODO give weapon name and properties
      damage = 10;
      break;
    case "2":
      damage = 20;
      break;
    case "3":
      damage = 30;
      break;
    case "4":
      damage = 40;
      break;
  }
  return damage + level * 10;
}
function randomize(num){
  return Math.round(num * (1 + (.3 * Math.random() - .15))); // within 15% of num
}
function isInBounds(walls, x, y){ //this approach is inentionally trying to not optimize searching and be lazy. Should I be worried about that?
  return walls.some( (wall) => { //assumes a sorted point
    return x > wall[0][0] && x < wall[0][1] && y > wall [1][0] && y < wall[1][1];
  })
}
function itemAt(state, key){
  let item = state.enemies[key];
  if (item){
    return "ENEMY";
  }
  item = state.health[key];
  if (item){
    return "HEALTH";
  }
  item = [state.weapon[0], state.weapon[1]] === [Number(key.charAt(1)), Number(key.charAt(3))] ? true : false;
  if (item){
    return "WEAPON";
  }
  item = [state.exit[0], state.exit[1]] === [Number(key.charAt(1)), Number(key.charAt(3))] ? true : false;
  if (item){
    return "EXIT";
  }
  return null;
}
function allowMovement(state, x, y){ //should only be called in reponse to a key input
  //returns if player should move
  if (!isInBounds(state.walls, x, y){
    return state;
  }
  let key = `_${x}_${y}`;
  let itemAt = itemAt(state, key);
  switch(itemAt){
    case "ENEMY":
      return combat(state, key);
    case "HEALTH":
      let newState = {};
      let player = {...state.player, {x, y}};
      newState = pickUpHealth(state, key);
      return newState;
    case "WEAPON":
      let newState = {};
      let player = {...state.player, {x, y}};
      newState = pickUpWeapon(state, key);
      return {...newState, player};
    case "EXIT":
      //TODO change level, return it
      return state;
    default:
      let player = {...state.player, {x, y}};
      return {...state, player};
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