//Declaring variables
var my_text = text("0", 10,10, "Green") // The text object displaying the number of points.
var points = 0; // The number of points the player has.
var targets = [];  // An array for our targets.
var target_creation_rate = 45; // Rate at which we will create targets, default every 45 milliseconds
var target_movement_rate = 8; // Rate at which the targets will update their Y position, every 8 milliseconds
var target_velocity = 10; // The amount the target's Y position will increase per loop, 10 pixels.
var collision_rate = 3; // The rate at which we calculate collisions, 3 milliseconds.

//target creation loop
repeat(function(){
  if(targets.length<10){
  let temp_circle = circle(Math.random()*width, 0, Math.random()*40+10);
  targets.push(temp_circle);
  }
},target_creation_rate);

//Target movement loop
repeat(function(){
  let to_remove= null;
  for(let i=0; i < targets.length; i++){
    targets[i].y += target_velocity; //Increasing the Y position of the target moves it down the screen.
    if(targets[i].y > height+targets[i].radius){ //Any targets past the bottom should be ignored.
      to_remove = i;
    }
  }
  if(to_remove != null) { // Remove the target from the array
    targets[to_remove] = undefined;
    targets.splice(to_remove,1);
  }
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
  targets[target_index].radius = 0;
  targets[target_index] = undefined;
  targets.splice(target_index,1);
}

// A function that updates the points, given a points increase.
function updatePoints(points_increase){
  points += points_increase;
  my_text.message = points;
}

//Mouse collision loop
repeat(function(){
  for(let i =0; i < targets.length; i++){
    if(collision(new Point(mouse.x, mouse.y), targets[i])){
      updatePoints(100);
      targetHit(i);
      return;
    }
  }
},collision_rate);
