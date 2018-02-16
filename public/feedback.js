var canvas = document.querySelector("canvas");
var context = canvas.getContext("2d");
var cachedTexture = canvas;
var animating = true;
var width, height, radius, centerX, centerY;
var raf = window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  window.oRequestAnimationFrame;
var theta = 20;
var direction = 0;
var time = performance.now() / 10;
// console.log(time);
resize();
tick();
var image;
var translateX;
var translateY;
var translate0 = -.5;
var translate1 = 1;
var rotate0 = .10;
var rotate1 = 0;
var scale0 = 1;
var scale1 = .01;
var sizeX = 100;
var sizeY = 100;

const submitBtn = document.querySelector('.submit-btn');

submitBtn.addEventListener('click', function(ev) {
  image = document.querySelector('.img-input').value;
  ev.preventDefault();

});



window.addEventListener("resize", resize, false);
document.addEventListener("mousedown", mouseDown, false);

function renderToCache(renderFunction) {
  var buffer = document.createElement('canvas');
  buffer.width = width;
  buffer.height = height;
  renderFunction(buffer.getContext('2d'));
  return buffer;
};


document.addEventListener('mousemove', function(ev) {

  translateX = ev.clientX;
  translateY = ev.clientY;
});

function drawScene() {

  cachedTexture = renderToCache(function(ctx) {



    ctx.globalCompositeOperation = "source-over";
    ctx.translate(centerX, centerY);
    ctx.rotate(-0.001);
    ctx.translate(-centerX, -centerY);
    ctx.translate(translate0, translate0);
    ctx.scale(1.001, 1.001);
    ctx.drawImage(cachedTexture, 0, 0);

    // ctx.transform(1,.1,0,1,0,0);

    // ctx.restore();


    // ctx.save();

    var img = new Image();
    img.src = image;
    ctx.globalCompositeOperation = "normalize";
    ctx.drawImage(img,translateX,translateY);

    ctx.restore();
  });

  context.globalCompositeOperation = "source-out";
  context.fillStyle = "rgba(255,255,255,1)";
  context.fillRect(0, width, height,width);
  context.globalCompositeOperation = "hard-light";
  context.drawImage(cachedTexture, 0, 0);



}



function tick() {
  var now = performance.now() * 100;
  if (animating) {
    raf(tick);
    theta = (now / time) / direction;
    time = now;
    drawScene();
  } else raf(tick);
}

function resize(e) {

  width = window.innerWidth;
  height = window.innerHeight;
  centerX = width / 2;
  centerY = height / 2;
  canvas.width = width;
  canvas.height = height;
  if (!animating) drawScene();
}

function mouseDown(e) {
  // img.src = null;
  e.stopPropagation();
  e.preventDefault();

  animating = !animating;
  if (animating) {
    direction *= 1;
    time = performance.now() * 10;
    tick();
  }
}
