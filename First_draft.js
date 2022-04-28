//Declaring variables
var my_text = text("0", 10,10, "Green") // The text object displaying the number of points.
var points = 0; // The number of points the player has.
var targets = [];  // An array for our targets.
var target_creation_rate = 65; // Rate at which we will create targets, default every 45 milliseconds
var target_movement_rate = 8; // Rate at which the targets will update their Y position, every 8 milliseconds
var collision_rate = 3; // The rate at which we calculate collisions, 3 milliseconds.
var max_num_targets = 10; // The maximum number of targets we will allow the game to make.

// Shape creator, creates a new shape based on the given size and color.
function shapeCreator(tsize, tcolor){
 //Insert code to create a shape here.
}

// Target creator, creates a new target.
function targetCreator(){
 // How are targets going to be created?  Are we going to have a maximum?
}

//target creation loop
repeat(function(){
  targetCreator();
},target_creation_rate);

// Changes the X and Y coordinates of the targets to create movement.
function movement(change_X, change_Y, index_of_target){
 // Insert code to move the targets
}

// Determines if a target is out of the screen.
function isOutOfScreen(index_of_target){
  let t_target = targets[index_of_target];
  let within_horizontal = t_target.x + t_target.width/2 > 0 && t_target.x - t_target.width/2 < width;
  let within_vertical = t_target.y + t_target.height/2 > 0 && t_target.y - t_target.height/2 < height;
  return !(within_horizontal && within_vertical);
}

// Removes a target at the given index
function removeTarget(index_of_target){
  if(index_of_target != null && index_of_target < targets.length){
    targets[index_of_target] = undefined;
    targets.splice(index_of_target,1);
  }
}

//Target movement loop
repeat(function(){
  let to_remove= null;
  for(let i=0; i < targets.length; i++){
    movement(0, 10, i);
    if(isOutOfScreen(i)){ //Any targets past the bottom should be ignored.
      to_remove = i;
    }
  }
  removeTarget(to_remove); 
},target_movement_rate);

// A helper class
class Point {
  constructor(x,y){
    this.x = x;
    this.y = y;
  }
}

// Mouse collision function
function collision(mousePos, target){
  if(mousePos.x <= target.x - target.width/2 || mousePos.x >= target.x + target.width/2) return false;
  if(mousePos.y <= target.y - target.height/2 || mousePos.y >= target.y + target.height/2) return false;
  return true;
}

// A function that determines the behavior of a target once it is hit.
function targetHit(target_index){
  // What do target do when they are hit?
  targets[target_index] = undefined;
  targets.splice(target_index,1);
}

// A function that updates the points
function updatePoints(){
 // How are points going to be calculated?
  my_text.message = points;
}

//Mouse collision loop
repeat(function(){
  for(let i =0; i < targets.length; i++){
    if(collision(new Point(mouse.x, mouse.y), targets[i])){
      updatePoints();
      targetHit(i);
      return;
    }
  }
},collision_rate);
