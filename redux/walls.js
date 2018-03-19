/*
  rooms: [], //ex: [[[x1, x2], [y1, y2]], ...]
  doors: []
*/

/*
  create Room
    min/max size
    min/max number of Rooms
  connect Room (i.e. add door)

  spawn items in rooms
    pick a random room
    pick a random spot in the room
    min/max number of enemies and health items
    items can't overlap
    spawn player as well
*/

function createDungeon(){
  dungeon = [createRoom(0, Math.ceiling(6*Math.random()) + 3, 0, Math.ceiling(6*Math.random()) + 3)];
  let i = Math.ceiling(3*Math.random()) + 5;
  dungeon = addNewRoom(dungeon, i);
  dungeon = connectRooms(dungeon);
}
function createRoom(startX, endX, startY, endY){
  return [[startX, startX + x], [startY, startY + y]];
}
function addNewRoom(dungeon, i){
  if (i === 0){
    return dungeon;
  }
  let direction = Math.ceiling(4*Math.random());
  switch(direction){

  }
  return addNewRoom(dungeon, i - 1);
}
