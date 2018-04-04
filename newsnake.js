var dirx = 1;
var diry = 0;
var rygx = 1;
var rygy = 0;
document.addEventListener('keydown', function(event) {
  switch(event.keyCode){
    case 37: //left
      if(diry!=0){
        dirx = -1;
        diry = 0;
      }
      break;
    case 39: //right
      if(diry!=0){
        dirx = 1;
        diry = 0;
      }
      break;
    case 38: //up
      if(dirx!=0){
        dirx = 0;
        diry = -1;
      }
      break;
    case 40: //down
      if(dirx!=0){
        dirx = 0;
        diry = 1;
      }
      break;
   case 65: //left
      if(rygy!=0){
        rygx = -1;
        rygy = 0;
      }
      break;
   case 68: //right
     if(rygy!=0){
       rygx = 1;
       rygy = 0;
       }
       break;
    case 87: //up
    if(rygx!=0) {
    		rygx = 0;
        rygy = -1;
      }
      break;
    case 83: //down
      if(rygx!=0){
        rygx = 0;
        rygy = 1;
      }
      break;
  }
});
var c = document.getElementById("canvas");
var cw = c.width;
var ch = c.height;
var ctx = c.getContext("2d");
var bs = 10; // snake size
var snakeArr = [];
var snake2Arr = [];
var score = 0;
var foodx = Math.floor((Math.random() * ((cw/bs)-1)) + 1);
var foody = Math.floor((Math.random() * ((ch/bs)-1)) + 1);
var foodColor = "#424242"
var snakeColor = "#424242"

for(i = 5; i>=0; i--){
  snakeArr.push({x:i,y:0});
}
for(i = 5; i>=0; i--){
  snake2Arr.push({x:i,y:5});
}
function draw(){
  ctx.clearRect(0,0,cw,ch);
  var hx = snakeArr[0].x;
  var hy = snakeArr[0].y;
  var rhx = snake2Arr[0].x;
  var rhy = snake2Arr[0].y;
  ctx.font = "20px serif";
  ctx.fillText("Score: "+score, 5, ch-5);
  ctx.fillStyle = snakeColor;
  for(i=0; i<snakeArr.length; i++){
    ctx.fillRect(snakeArr[i].x*bs, snakeArr[i].y*bs, bs,bs);
  }
    for(i=0; i<snake2Arr.length; i++){
    ctx.fillRect(snake2Arr[i].x*bs, snake2Arr[i].y*bs, bs,bs);
  }
  
  ctx.fillStyle = foodColor;
  ctx.fillRect(foodx*bs, foody*bs, bs, bs);
  for(i=1; i<snakeArr.length; i++){
    if(hx==snakeArr[i].x&&hy==snakeArr[i].y||hx==-1||hx==cw/bs||hy==-1||hy==ch/bs)window.location.reload(false);
    if(hx==foodx&&hy==foody) {
      snakeColor = foodColor;
      foodx = Math.floor((Math.random() * ((cw/bs)-1)) + 1);
      foody = Math.floor((Math.random() * ((ch/bs)-1)) + 1);
      foodColor = '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
      snakeArr.push({x:hx+dirx,y:hy+diry});
      score++;
    }
  }
  
     for(i=1; i<snake2Arr.length; i++){
if(rhx==snake2Arr[i].x&&rhy==snake2Arr[i].y||rhx==-1||rhx==cw/bs||rhy==-1||rhy==ch/bs)window.location.reload(false);
    if(rhx==foodx&&rhy==foody) {
      snakeColor = foodColor;
      foodx = Math.floor((Math.random() * ((cw/bs)-1)) + 1);
      foody = Math.floor((Math.random() * ((ch/bs)-1)) + 1);
      foodColor = '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
      snakeArr.push({x:rhx+rygx,y:rhy+rygy});
      score++;
    }
  }
  snakeArr.pop();
  snakeArr.unshift({x:hx+dirx,y:hy+diry});
  snake2Arr.pop();
  snake2Arr.unshift({x:rhx+rygx,y:rhy+rygy});
}
setInterval(draw,60);
