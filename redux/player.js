/*
  x:
  y:
  power:
  health:
  level:
  walls:

//MOVED TO MAIN DUNGEON. JS

export const player = (state, action) => {

  switch(action.type){

  }

}

function isInBounds(walls, x, y){ //this approach is inentionally trying to not optimize searching and be lazy. Should I be worried about that?
  return walls.some( (wall) => { //assumes a sorted point
    return x > wall[0][0] && x < wall[0][1] && y > wall [1][0] && y < wall[1][1];
  })
}
*/
