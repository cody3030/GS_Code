//Declaring variables
var my_text = text("0", 10,10, "Green")
var points = 0;
var targets = [];

//target creation loop
repeat(function(){
  if(targets.length<10){
  let temp_circle = circle(Math.random()*width, 0, Math.random()*40+10);
  targets.push(temp_circle);
  }
},45);

//Target movement loop
repeat(function(){
  let to_remove= null;
  for(let i=0; i < targets.length; i++){
    targets[i].y = targets[i].y + 10; //Increasing the Y position of the target moves it down the screen.
    if(targets[i].y > height+targets[i].radius){ //Any targets past the bottom should be ignored.
      to_remove = i;
    }
  }
  if(to_remove != null) { // Remove the target from the array
    targets[to_remove] = undefined;
    targets.splice(to_remove,1);
  }
},8);

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
},3);
