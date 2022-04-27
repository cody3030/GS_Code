var my_text = text("0", 10,10, "Green")
var points = 0;
var targets = [];


class Point {
  constructor(x,y){
    this.x = x;
    this.y = y;
  }
}

function collision(mousePos, obj2){
  if(mousePos.x <= obj2.x - obj2.width/2 || mousePos.x >= obj2.x + obj2.width/2) return false;
  if(mousePos.y <= obj2.y - obj2.height/2 || mousePos.y >= obj2.y + obj2.height/2) return false;
  return true;
}

//Mouse collision loop
repeat(function(){
  for(let i =0; i < targets.length; i++){
    if(collision(new Point(mouse.x, mouse.y), targets[i])){
      points += 100;
      my_text.message = points;
      targets[i].radius = 0;
      targets[i] = undefined;
      targets.splice(i,1);
      return;
    }
  }
},3);

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

//target creation loop
repeat(function(){
  if(targets.length<10){
  let temp_circle = circle(Math.random()*width, 0, Math.random()*40+10);
  targets.push(temp_circle);
  }
},45);