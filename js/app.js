// To actually be able to display anything with Three.js, we need three things: A scene, a camera, and a renderer so we can render the scene with the camera.

var scene, camera, renderer;

var canvas = document.getElementById("canvas");
var stage = new createjs.Stage("canvas");

var initialWidth = window.innerWidth;
var initialHeight = window.innerHeight;

// Needed to upscale objects so they look sharp
var PIXEL_RATIO = (function () {
    var ctx = document.createElement("canvas").getContext("2d"),
        dpr = window.devicePixelRatio || 1,
        bsr = ctx.webkitBackingStorePixelRatio ||
              ctx.mozBackingStorePixelRatio ||
              ctx.msBackingStorePixelRatio ||
              ctx.oBackingStorePixelRatio ||
              ctx.backingStorePixelRatio || 1;

    return dpr / bsr;
})();

function createHiDPICanvas(w, h, canvas, ratio) {
    if (!ratio) { ratio = PIXEL_RATIO; }
    canvas.width = w * ratio;
    canvas.height = h * ratio;
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    canvas.getContext("2d").setTransform(ratio, 0, 0, ratio, 0, 0);
}
//

function init() {
  renderScene(false);
}

function renderScene(resize) {
  createHiDPICanvas(window.innerWidth, window.innerHeight, canvas);
  drawBackground();
  if (!resize) {
      drawStars();
  }
  drawTitle();
  drawMountains();
  drawScenery();
}

function drawBackground() {
  // var colors = ["#202020", "#333333", "#339575", "#64c3bc", "#382942", "#281c2f"];
  // var ratios = [0, .05, .2, .3, .55, 1]
  var colors = ["#64c3bc", "#281c2f"];
  var ratios = [0, 1]
  var background = new createjs.Graphics();
  background.beginLinearGradientFill(colors, ratios, 0, 2750, 0, 120).drawRect(0,0,canvas.width,canvas.height);
  var shape = new createjs.Shape(background);
  updateStage(shape);
}

function drawTitle() {
  var text = new createjs.Text("AURØRA", "80px Lato", "#d0cdcd");
  text.x = 200;
  text.y = 150;
  updateStage(text);
}

var mountainTop = 1100;
function drawMountains() {
  var mountain = new createjs.Shape();
  mountain.graphics.beginStroke("#383838");
  mountain.graphics.beginFill("#383838").lineTo(10, 50).lineTo(200,400).lineTo(-200,400);
  mountain.x = canvas.width - (canvas.width/4);
  mountain.y = mountainTop;
  updateStage(mountain);

  var mountain = new createjs.Shape();
  mountain.graphics.beginStroke("#383838");
  mountain.graphics.beginFill("#383838").lineTo(10, 70).lineTo(300,400).lineTo(-300,400);
  mountain.x = canvas.width - (canvas.width/6.5);
  mountain.y = mountainTop;
  updateStage(mountain);

  var mountain = new createjs.Shape();
  mountain.graphics.beginStroke("#656363");
  mountain.graphics.beginFill("#656363").lineTo(10, 40).lineTo(200,400).lineTo(-200,400);
  mountain.x = canvas.width - (canvas.width/3.5);
  mountain.y = mountainTop;
  updateStage(mountain);

  var mountain = new createjs.Shape();
  mountain.graphics.beginStroke("#a1a1a1");
  mountain.graphics.beginFill("#a1a1a1").lineTo(10, 30).lineTo(250,400).lineTo(-250,400);
  mountain.x = canvas.width - (canvas.width/5.75);
  mountain.y = mountainTop;
  updateStage(mountain);

  var mountain = new createjs.Shape();
  mountain.graphics.beginStroke("#d0cdcd");
  mountain.graphics.beginFill("#d0cdcd").lineTo(0, 0).lineTo(200,400).lineTo(-200,400);
  mountain.x = canvas.width - (canvas.width/5);
  mountain.y = mountainTop;
  updateStage(mountain);
}

function drawScenery() {
  var background = new createjs.Graphics();
  background.beginFill("#282727").drawRect(0,1500,canvas.width,canvas.height);
  var shape = new createjs.Shape(background);
  updateStage(shape);
}

function drawStars() {
  var starColors = ["#d0cdcd", "#a1a1a1", "#858585", "#e6e6e6", "#e9e8e8"];
  var randomColor;
  var randomRadius;
  var randomX;
  var randomY;
  for (i = 0; i < 300; i++) {
    randomColor = starColors[Math.floor(Math.random() * starColors.length)];
    randomRadius = Math.floor(Math.random() * (4 - 1 + 1)) + 1;
    randomX = Math.floor(Math.random() * (canvas.width - 1 + 1)) + 1;
    randomY = Math.floor(Math.random() * (1500 - 1 + 1)) + 1;
    var star = new createjs.Graphics();
    star.setStrokeStyle(1);
    star.beginStroke(randomColor);
    star.beginFill(randomColor);
    star.drawCircle(randomX,randomY,randomRadius);
    var shape = new createjs.Shape(star);
    updateStage(shape);
  }
}

function resize() {
  renderScene(true);
}

function updateStage(child) {
  stage.addChild(child);
  stage.update();
}
