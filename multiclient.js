var snekSocket = new WebSocket("wss://155.138.234.94:4414");

var sneks = [
  {
    body: [
      {
        x: 0,
        y: 0
      }
    ],
    dir: {
      x: 1,
      y: 0
    }
  }
];

var snakes = {};

snekSocket.onmessage = function(event) {
  var data = JSON.parse(event.data);
  if (data["type"] == "draw") {
    ctx.clearRect(0, 0, cw, ch);
    var d = 0;
    data.snakes.forEach(s => {
        ctx.fillStyle = s.color;
      ctx.font = "20px serif";
      ctx.fillText("Snek " + s.id + ": " + s.score, 5, ch - d);
      d += 30;
      s.body.forEach(b => {
        ctx.fillRect(b.x * bs, b.y * bs, bs, bs);
      });
    });
    data.apples.forEach(s => {
      ctx.fillRect(s.x * bs, s.y * bs, bs, bs);
    });
  }
};

var dirx = 1;
var diry = 0;
var c = document.getElementById("canvas");
var cw = c.width;
var ch = c.height;
var ctx = c.getContext("2d");
var bs = 10; // snake size
var snakeArr = [];
var score = 0;
var gameState = 0;
var foodx = Math.floor(Math.random() * (cw / bs - 1) + 1);
var foody = Math.floor(Math.random() * (ch / bs - 1) + 1);
var foodColor = "#424242";
var snakeColor = "#424242";
document.addEventListener("keydown", function(event) {
  switch (event.keyCode) {
    case 37: //left
      if (diry != 0) {
        snekSocket.send(
          JSON.stringify({ type: "directionUpdate", data: { x: -1, y: 0 } })
        );
        dirx = -1;
        diry = 0;
      }
      break;
    case 39: //right
      if (diry != 0) {
        snekSocket.send(
          JSON.stringify({ type: "directionUpdate", data: { x: 1, y: 0 } })
        );
        dirx = 1;
        diry = 0;
      }
      break;
    case 32:
      break;
    case 38: //up
      if (dirx != 0) {
        snekSocket.send(
          JSON.stringify({ type: "directionUpdate", data: { x: 0, y: -1 } })
        );
        dirx = 0;
        diry = -1;
      }
      break;
    case 40: //down
      if (dirx != 0) {
        snekSocket.send(
          JSON.stringify({ type: "directionUpdate", data: { x: 0, y: 1 } })
        );
        dirx = 0;
        diry = 1;
      }
      break;
  }
});

for (i = 5; i >= 0; i--) {
  snakeArr.push({ x: i, y: 0 });
}
function draw() {
  console.log(snakes);
  /*ctx.clearRect(0, 0, cw, ch);
  hx = snakeArr[0].x;
  hy = snakeArr[0].y;
  ctx.font = "20px serif";
  ctx.fillText("Score: " + score, 5, ch - 5);
  if (gameState == 1) {
    ctx.fillStyle = snakeColor;
    for (i = 0; i < snakeArr.length; i++) {
      ctx.fillRect(snakeArr[i].x * bs, snakeArr[i].y * bs, bs, bs);
    }

    ctx.fillStyle = foodColor;
    ctx.fillRect(foodx * bs, foody * bs, bs, bs);
    for (i = 1; i < snakeArr.length; i++) {
      if (
        (hx == snakeArr[i].x && hy == snakeArr[i].y) ||
        hx == -1 ||
        hx == cw / bs ||
        hy == -1 ||
        hy == ch / bs
      )
        gameState = 0;
      if (hx == foodx && hy == foody) {
        snakeColor = foodColor;
        foodx = Math.floor(Math.random() * (cw / bs - 1) + 1);
        foody = Math.floor(Math.random() * (ch / bs - 1) + 1);
        foodColor =
          "#" +
          (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6);
        snakeArr.push({ x: hx + dirx, y: hy + diry });
        score++;
      }
    }
    snakeArr.pop();
    snakeArr.unshift({ x: hx + dirx, y: hy + diry });
  } else {
    ctx.fillText("yikes, press space", cw / 2 - 10, ch / 2);
  }*/
}
