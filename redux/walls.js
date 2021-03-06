/*
  State of Dungeon:
  rooms: [], //ex: [[[x1, x2], [y1, y2]], ...]
  doors: []
  emptyDoors: []
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
/*
  create a base room with empty doors
    (createRoom)
      addNewRoom
      addNewDoors
  fill empty doors with a base room
    (appendNewRooms)
    do no add if it overlaps a current room, make another attempt at a room, and stop if too many attempts
      (loop through addAdjoiningRoom)
  add appropriate amount of doors in correct location
      loop through new rooms and add min 2 or remaining doors amount of doors
      (addNewDoors flag direction came from)
  loop trough until remaining doors is 0
    (appendNewRooms)
  Dungeon complete, convert it into something the reducer/player.js file can use
*/
/*
  Populating a dungeon with items

  Dungeon needs to know what level the dungeon is
    Create a min/max # of enemies based on dungeon level
      put them randomly into the Rooms
      avoid collisions
    Spawn Exit and weapon first, then enemies then health
*/
export function createDungeon(level){
  //TODO if level 4, create boss, don't create exit
  let walls = createWalls();
  //console.log("In createDungeon, walls succesful, value is:", walls);
  let collisions = {};
  let temp = 0;
  let exit = [];
  let boss = {};
  if (level === 4){
    temp = generateBoss(walls.rooms, collisions);
    boss = temp[0];
    collisions = temp[1];
  }
  else{
    temp = populateExit(walls.rooms, collisions);
    exit = temp[0];
    collisions = temp[1];
  }
  collisions = temp[1];
  temp = placePlayer(walls.rooms, collisions);
  const player = temp[0];
  collisions = temp[1];
  temp = populateWeapon(walls.rooms, collisions, level);
  const weapon = temp[0];
  collisions = temp[1];
  temp = populateHealth(walls.rooms, collisions);
  const health = temp[0];
  collisions = temp[1];
  temp = populateEnemies(walls.rooms, collisions, level);
  const enemies = temp[0];
  //convert walls into something the reducer/player.js file can use
  walls = convertDungeon(walls);
  return {player, enemies, health, weapon, exit, walls, level, boss};
}
function generateBoss(rooms, collisions){
  let boss = {};
  boss.health = 125;
  boss.damage = 40;
  const roomNum = Math.floor(Math.random() * rooms.length);
  const position = generateBossPosition(rooms[roomNum], collisions);
  position.id.forEach( (place) => {
    collisions[place] = true;
  })
  const key = position.id[0].split("_");
  boss.id = position.id;
  boss.x = Number(key[1]);
  boss.y = Number(key[2]);
  return [boss, collisions];
}
function generateBossPosition(room, collisions){
  for(let i = 0; i < 5; i += 1){
    const x = Math.floor((room[0][1] - room[0][0] - 1) * Math.random()) + room[0][0];
    const y = Math.floor((room[1][1] - room[1][0] - 1) * Math.random()) + room[1][0];
    const id = [`_${x}_${y}`, `_${x+1}_${y}`, `_${x}_${y+1}`, `_${x+1}_${y+1}`];
    if (!id.some( (key) => {
      return collisions[key];
    }) || i === 4) {
      if (i == 4){
        console.log("WARNING: Boss overlapping at: " + id);
      }
      return {x, y, id};
    }
  }
}
function placePlayer(rooms, collisions){
  const roomNum = Math.floor(Math.random() * rooms.length);
  const position = generatePosition(rooms[roomNum], collisions);
  collisions[position.id] = true;
  return [position, collisions];
}
function populateHealth(rooms, collisions){ // collisions is an object of keys that just have true if there is an item there
  let health = {};
  let numHealth = 3 * Math.ceil(Math.random()) + 4;
  for (let i = 0; i < numHealth; i += 1){
    const roomNum = Math.floor(Math.random() * rooms.length);
    const position = generatePosition(rooms[roomNum], collisions);
    collisions[position.id] = true;
    health[position.id] = Object.assign(position, {health: 10});
    //console.log("populateHealth: health object:", health[position.id]);
  }
  return [health, collisions]; // need to return collisions or deal with it somehow
}
function populateEnemies(rooms, collisions, level){
  let enemies = {};
  const numEnemies = 3 * Math.ceil(Math.random()) + 3;
  for (let i = 0; i < numEnemies; i += 1){
    const roomNum = Math.floor(Math.random() * rooms.length);
    const position = generatePosition(rooms[roomNum], collisions);
    collisions[position.id] = true;
    enemies[position.id] = Object.assign(position, {health: level * 20, damage: level * 10, XP: level * 10});
  }
  return [enemies, collisions];
}
function populateWeapon(rooms, collisions, level){
  const roomNum = Math.floor(Math.random() * rooms.length);
  const position = generatePosition(rooms[roomNum], collisions);
  collisions[position.id] = true;
  let name = "Stick";
  switch(level){
    case 1:
      name = "Dagger";
      break;
    case 2:
      name = "Sword";
      break;
    case 3:
      name = "Long Sword";
      break;
    case 4:
      name = "Hero's Sword";
      break;
  }
  return [[position.x, position.y, name], collisions];
}
function populateExit(rooms, collisions){
  const roomNum = Math.floor(Math.random() * rooms.length);
  const position = generatePosition(rooms[roomNum], collisions);
  collisions[position.id] = true;
  return [[position.x, position.y], collisions];
}
function generatePosition(room, collisions){
  for(let i = 0; i < 5; i += 1){
    const x = Math.floor((room[0][1] - room[0][0]) * Math.random()) + room[0][0];
    const y = Math.floor((room[1][1] - room[1][0]) * Math.random()) + room[1][0];
    const id = `_${x}_${y}`;
    if (!collisions[id] || i === 4) {
      if (i == 4){
        console.log("WARNING: items overlapping at: " + id);
      }
      return {x, y, id};
    }
  }
}
function createWalls(){
  dungeon = createBaseRoom(0, Math.ceil(6*Math.random()) + 3, 0, Math.ceil(6*Math.random()) + 3);
  let numRooms = Math.ceil(8*Math.random()) + 8;
  dungeon = appendNewRooms(dungeon, numRooms - 1);
  return dungeon;
}
function convertDungeon(dungeon){
  let doors = dungeon.doors.map( (door) => {
    let output = [door[0], door[1]];
    //console.log("In convertDungeon, door input and output are:", door, output);
    return output;
  });
  let result = dungeon.rooms.concat(doors);
  //console.log("In convertDungeon, input dungeon and result dungeon are:", dungeon, result);
  return result;
}
function createBaseRoom(startX, endX, startY, endY){
  let result = {
    rooms: [addNewRoom(startX, endX, startY, endY)],
    doors: [],
    emptyDoors: addNewDoors(startX, endX, startY, endY)
  }
  return result;
}
/*
function filterDirection(arr, direction){
  return arr.filter( (val) => {
    return val !== direction;
  })
}
function addNewDoors(startX, endX, startY, endY){
  // these parameters are the dimenions of the room
  // args[4] flags what direction you can't make a door
  //badDoors will be the opposite side. Imagine you have just entered from this badDoor, and now you don't want to go back
  let goodDoors = ["north", "east", "south," "west"];
  if (arguments[4]){
    goodDoors = filterDirection(goodDoors, arguments[4]);
  }
*/
function addNewDoors(startX, endX, startY, endY){
  // these parameters are the dimenions of the room
  // args[4] flags what direction you can't make a door
  let badDoors = []; //badDoors will be the opposite side. Imagine you have just entered from this badDoor, and now you don't want to go back
  if (arguments[4]){
    badDoors.push(arguments[4]);
  }
  let result = [];
  let x = endX - startX;
  let y = endY - startY;
  let perim = 2 * x + 2 * y;
  let numDoors = Math.ceil(3 * Math.random());
  let failedAttempts = 0;
  for(let i = 0; i < numDoors && failedAttempts < 10; i += 1){
    let position = Math.floor(perim * Math.random());
    if (position < x){
      if (!badDoors.some( (val) => {
        return val === "north";
      })){
        result.push([[startX + position, startX + position + 1], [startY - 1, startY], "south"]);
        badDoors.push("north");
      }
      else{
        failedAttempts += 1;
        i -= 1;
      }
    }
    else if (position < 2 * x) {
      if (!badDoors.some( (val) => {
        return val === "south"
      })){
        result.push([[startX + position - x, startX + position - x + 1], [endY, endY + 1], "north"]);
        badDoors.push("south");
      }
      else{
        failedAttempts += 1;
        i -= 1;
      }
    }
    else if (position < 2 * x + y) {
      if (!badDoors.some( (val) => {
        return val === "west"
      })){
        result.push([[endX, endX + 1], [startY + position - 2 * x, startY  + position - 2 * x + 1], "east"]);
        badDoors.push("west");
      }
      else{
        failedAttempts += 1;
        i -= 1;
      }
    }
    else{
      if (!badDoors.some( (val) => {
        return val === "east"
      })){
        result.push([[startX - 1, startX], [startY + position - 2 * x - y, startY  + position - 2 * x - y + 1], "west"]);
        badDoors.push("east");
      }
      else{
        failedAttempts += 1;
        i -= 1;
      }
    }
  }
  return result;
}
function addNewRoom(startX, endX, startY, endY){
  //console.log("In addNewRoom, arguments are: ", arguments);
  return [[startX, endX], [startY, endY]]
}
function appendNewRooms(dungeon, numNewRooms){ // mutates dungeon
  let newDoors = [];
  if (!dungeon.emptyDoors || dungeon.emptyDoors.length === 0){ // we expect emptyDoors to be not empty, but if it is, lets handle it here;
    console.log("Error: emptyDoors should not be empty in appendNewRooms in walls.js. dungeon was: ", dungeon);
    delete dungeon.emptyDoors;
    return dungeon;
  }
  dungeon.emptyDoors.forEach( (door, index) => {
    if (numNewRooms !== 0){
      //console.log("in appendNewRooms, door is: ", door);
      let result = addAdjoiningRoom(door); // new empty room connected to this door
      if (dungeon.rooms.some( (room) => {
        //console.log("In appendNewRooms, room and result are", room, result);
        return isOverlapping(room, result);
      })){
        console.log("overlapping rooms in appendNewRooms");
        // don't add new doors to this weirdly overlapping room, but the room itself is probably fine.
      }
      else{
        //console.log("in appendNewRooms, newDoors before and after spread operater yield:", newDoors);
        let temp = addNewDoors(result[0][0], result[0][1], result[1][0], result[1][1], door[2]);
        temp.forEach( (val) => {
          newDoors.push(val);
        })
        //console.log(newDoors);
      }
      //once room is all good, add room and door to dungeon and reduce counter
      dungeon.rooms.push(result);
      dungeon.doors.push(door);
      numNewRooms -= 1;
    }
  });
  //check numNewRooms
  if (numNewRooms === 0){
    delete dungeon.emptyDoors;
    //console.log("dungeon creation succesful, dungeon is:", dungeon);
    return dungeon;
  }
  else{
    dungeon.emptyDoors = newDoors;
    return appendNewRooms(dungeon, numNewRooms);
  }
}
function addAdjoiningRoom(door){
  const xWidth = Math.ceil(6*Math.random()) + 3;
  const yWidth = Math.ceil(6*Math.random()) + 3;
  //const offset = Math.floor(xWidth*Math.random());
  let offsetX = Math.floor(xWidth*Math.random());
  let offsetY = Math.floor(yWidth*Math.random());
  let startX = door[0][0];
  let endX = startX + xWidth;
  let startY = door[1][0];
  let endY = startY + yWidth;
  switch(door[2]){
    case "north":
      startX -= offsetX;
      endX -= offsetX;
      startY += 1; // needed to compensate for door
      endY += 1;
      break;
    case "south":
      startX -= offsetX;
      endX -= offsetX;
      startY -= yWidth; //want to move room down
      endY -= yWidth;
      break;
    case "east":
      startY -= offsetY;
      endY -= offsetY;
      startX += 1;
      endX += 1;
      break;
    case "west":
      startY -= offsetY;
      endY -= offsetY;
      startX -= xWidth;
      endX -= xWidth;
      break;
    default:
      console.log("Error: in addAdjoiningRoom: door[2] was not recognized. Seed was", xWidth, yWidth, door, door[2]);
      return undefined;
  }
  return addNewRoom(startX, endX, startY, endY);
}
function isOverlapping(a, b){ //rooms
  return ((a[0][0] <= b[0][0] && a[0][1] >= b[0][0]) && (a[1][0] <= b[1][0] && a[1][1] >= b[1][0]))
   || ((b[0][0] <= a[0][0] && b[0][1] >= a[0][0]) && (b[1][0] <= a[1][0] && b[1][1] >= a[1][0]));
}

// function addNewRoom(dungeon, i){
//   if (i === 0){
//     return dungeon;
//   }
//   let direction = Math.ceil(4*Math.random());
//   switch(direction){
//
//   }
//   return addNewRoom(dungeon, i - 1);
// }
