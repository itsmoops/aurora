// To actually be able to display anything with Three.js, we need three things: A scene, a camera, and a renderer so we can render the scene with the camera.

var scene, camera, renderer;

var canvas = document.getElementById("canvas");
var stage = new createjs.Stage("canvas");
stage.enableMouseOver(10);

var initialWidth = window.innerWidth;
var initialHeight = window.innerHeight;

var colorPalette = {
  fontColor1: "#d0cdcd",
  sky: ["#64c3bc", "#281c2f"],
  skyOld: ["#202020", "#333333", "#339575", "#64c3bc", "#382942", "#281c2f"],
  aurora: ["#55fec7", "#64c3bc"],
  stars: ["#d0cdcd", "#a1a1a1", "#656363", "#e6e6e6", "#e9e8e8"],
  water: ["#295969", "#339575"],
  landDark: "#282727",
  landSnowy: "#a1a1a1",
  mountainRange: ["#282727", "#383838"],
  mountains: ["#494848", "#656363", "#a1a1a1", "#e6e6e6"]
}

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
  // drawVolcano();
  drawMountains();
  // drawLighthouse();
  drawScenery();
  drawWater();
  // drawBoat();
  // drawBuoy();
  // drawIceberg();
  drawAurora();
}

function drawAurora() {
  var aurora = new createjs.Shape();
  aurora.graphics.setStrokeStyle(6, "round");
  aurora.graphics.beginStroke(colorPalette.aurora[0]);
  aurora.graphics.beginFill(colorPalette.aurora[0]).lineTo(200,800).lineTo(1000,200).lineTo(1000, 225).lineTo(200,800).closePath();
  aurora.graphics.endStroke();

  aurora.cursor = "pointer";

  var blurFilter = new createjs.BlurFilter(5, 25, 1);

  aurora.filters = [blurFilter];
  var bounds = blurFilter.getBounds();
  aurora.cache(-50+bounds.x, -50+bounds.y, 100+bounds.width, 100+bounds.height);
  aurora._applyFilters();
  updateStage(aurora);
}

function drawBackground() {
  // Sky
  var ratios = [0, 1]
  var background = new createjs.Graphics();
  background.beginLinearGradientFill(colorPalette.sky, ratios, 0, 2800, 0, 120).drawRect(0,0,canvas.width,canvas.height);
  var shape = new createjs.Shape(background);
  updateStage(shape);
}

function drawTitle() {
  var text = new createjs.Text("AURØRA", "80px Lato", colorPalette.fontColor1);
  text.x = 200;
  text.y = 150;
  updateStage(text);
}

var mountainTop = 1100;
function drawMountains() {
  var mountainRange1 = new createjs.Shape();
  mountainRange1.graphics.beginStroke(colorPalette.mountainRange[0]);
  mountainRange1.graphics.beginFill(colorPalette.mountainRange[0])
  .lineTo(0, 1450)
  .lineTo(400,1300)
  .lineTo(700,1350)
  .lineTo(850,1200)
  .lineTo(848,1250)
  .lineTo(900,1300)
  .lineTo(1000,1400)
  .lineTo(1250,1350)
  .lineTo(1800, 1500)
  .lineTo(1900, 1500)
  .lineTo(2000, 1400)
  .lineTo(2900, 1250)
  .lineTo(canvas.width, 1500)
  .lineTo(canvas.width, 1500)
  .lineTo(0, 1500);
  mountainRange1.graphics.endStroke();
  updateStage(mountainRange1);
  // Mountain ranges
  var mountainRange2 = new createjs.Shape();
  mountainRange2.graphics.beginStroke(colorPalette.mountainRange[1]);
  mountainRange2.graphics.beginFill(colorPalette.mountainRange[1])
  .lineTo(0, 1350)
  .lineTo(200,1300)
  .lineTo(400,1400)
  .lineTo(450, 1450)
  .lineTo(500, 1400)
  .lineTo(600, 1200)
  .lineTo(700, 1250)
  .lineTo(850, 1350)
  .lineTo(900, 1300)
  .lineTo(950, 1200)
  .lineTo(1000, 1300)
  .lineTo(1050, 1250)
  .lineTo(1100, 1350)
  .lineTo(1300, 1400)
  .lineTo(1500, 1300)
  .lineTo(1600, 1350)
  .lineTo(1800, 1500)
  .lineTo(2000, 1500)
  .lineTo(2200, 1300)
  .lineTo(2500, 1400)
  .lineTo(2900, 1200)
  .lineTo(3000, 1450)
  .lineTo(canvas.width, 1300)
  .lineTo(canvas.width, 1500)
  .lineTo(0, 1500);
  mountainRange2.graphics.endStroke();
  updateStage(mountainRange2);

  // Left


  // Right
  var mountain1 = new createjs.Shape();
  mountain1.graphics.beginStroke(colorPalette.mountains[0]);
  mountain1.graphics.beginFill(colorPalette.mountains[0]).lineTo(0, 1500).lineTo(175,1250).lineTo(200,1200).lineTo(450,1500);
  mountain1.x = canvas.width - (canvas.width/2.75);
  mountain1.graphics.endStroke();
  updateStage(mountain1);

  var mountain2 = new createjs.Shape();
  mountain2.graphics.beginStroke(colorPalette.mountains[0]);
  mountain2.graphics.beginFill(colorPalette.mountains[0]).lineTo(0, 1500).lineTo(350,1125).lineTo(600,1500);
  mountain2.x = canvas.width - (canvas.width/4.25);
  mountain2.graphics.endStroke();
  updateStage(mountain2);

  var mountain3 = new createjs.Shape();
  mountain3.graphics.beginStroke(colorPalette.mountains[1]);
  mountain3.graphics.beginFill(colorPalette.mountains[1]).lineTo(0, 1500).lineTo(150,1275).lineTo(250,1200).lineTo(400,1500);
  mountain3.x = canvas.width - (canvas.width/3);
  mountain3.graphics.endStroke();
  updateStage(mountain3);

  var mountain4 = new createjs.Shape();
  mountain4.graphics.beginStroke(colorPalette.mountains[2]);
  mountain4.graphics.beginFill(colorPalette.mountains[2]).lineTo(0, 1500).lineTo(200,1200).lineTo(350, 1300).lineTo(500,1500);
  mountain4.x = canvas.width - (canvas.width/4);
  mountain4.graphics.endStroke();
  updateStage(mountain4);

  var mountain5 = new createjs.Shape();
  mountain5.graphics.beginStroke(colorPalette.mountains[3]);
  mountain5.graphics.beginFill(colorPalette.mountains[3]).lineTo(0, 1500).lineTo(200,1150).lineTo(450,1500);
  mountain5.x = canvas.width - (canvas.width/3.5);
  mountain5.graphics.endStroke();
  updateStage(mountain5);
}

function drawWater() {
  var ratios = [0, 1]
  var water = new createjs.Shape();
  water.graphics.beginStroke(colorPalette.water[0])
  water.graphics.beginLinearGradientFill(colorPalette.water, ratios, 0, 1900, 0, 120)
                .lineTo(0,1600).arcTo(1100,1600,1250,1700,700).lineTo(1450,canvas.height).lineTo(0,canvas.height);
  water.graphics.endStroke();
  updateStage(water);

  var randomColor;
  var randomRadius;
  var randomX;
  var randomY;
  // Water Stars
  for (i = 0; i < 30; i++) {
    randomColor = colorPalette.stars[Math.floor(Math.random() * colorPalette.stars.length)];
    randomRadius = Math.floor(Math.random() * (2 - 1 + 1)) + 1;
    randomX = Math.floor(Math.random() * (1200 - 1 + 1)) + 1;
    randomY = Math.floor(Math.random() * (canvas.height - 1650 + 1)) + 1650;
    var star = new createjs.Graphics();
    star.setStrokeStyle(1);
    star.beginStroke(randomColor);
    star.beginFill(randomColor);
    star.drawCircle(randomX,randomY,randomRadius);
    star.endStroke();
    var shape = new createjs.Shape(star);
    updateStage(shape);
  }
}

function drawScenery() {
  var background = new createjs.Graphics();
  background.beginStroke(colorPalette.landSnowy)
  background.beginFill(colorPalette.landSnowy).drawRect(0,1500,canvas.width,canvas.height);
  background.endStroke();
  var shape = new createjs.Shape(background);
  updateStage(shape);
}

function drawStars() {
  var randomColor;
  var randomRadius;
  var randomX;
  var randomY;
  // Sky Stars
  for (i = 0; i < 350; i++) {
    randomColor = colorPalette.stars[Math.floor(Math.random() * colorPalette.stars.length)];
    randomRadius = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
    randomX = Math.floor(Math.random() * (canvas.width - 1 + 1)) + 1;
    randomY = Math.floor(Math.random() * (1500 - 1 + 1)) + 1;
    var star = new createjs.Graphics();
    star.setStrokeStyle(1);
    star.beginStroke(randomColor);
    star.beginFill(randomColor);
    star.drawCircle(randomX,randomY,randomRadius);
    star.endStroke();
    var shape = new createjs.Shape(star);
    updateStage(shape);
  }
}

function resize() {
  // renderScene(true);
}

function updateStage(child) {
  stage.addChild(child);
  stage.update();
}
