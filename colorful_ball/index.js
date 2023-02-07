let mycanvas = document.getElementById("mycanvas");

//设置满屏画布
mycanvas.width = document.documentElement.clientWidth;
mycanvas.height = document.documentElement.clientHeight;

//获取2d上下文
let ctx = mycanvas.getContext("2d");

let ballArr = [];
document.onmousemove = function (e) {
  new SmallBall(e.clientX, e.clientY);
  //当小球个数大于20时，清屏并删除第一个小球
  if (ballArr.length > 20) {
    ctx.clearRect(0, 0, mycanvas.width, mycanvas.height);
    ballArr.shift();
  }
  for (let i in ballArr) {
    ballArr[i].drawBall();
  }
};

//创建一个小球类
function SmallBall(x, y) {
  this.x = x;
  this.y = y;
  this.r = parseInt(Math.random() * 50 + 1);
  ballArr.push(this);
}

SmallBall.prototype = {
  constructor: SmallBall,
  drawBall: function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.fillStyle =
      "rgb(" +
      parseInt(Math.random() * 256) +
      "," +
      parseInt(Math.random() * 256) +
      "," +
      parseInt(Math.random() * 256) +
      "," +
      parseInt(Math.random() * 2) +
      ")";
    ctx.fill();
  },
};
