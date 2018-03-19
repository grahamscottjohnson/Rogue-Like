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

  Phase 2:
  dungeon gets randomized
    collection of divs/rectangles
  player able to die,
  move to next level

  Phase 3:
  some amount of darkness
    opacity


*/

document.body.addEventListener("keypress", () => {
  action = {type: ""};
  switch(input){ //TODO
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
