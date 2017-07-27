// Initialize
var canvas = document.getElementById('canvas');
var drip = new CanvasDrip(canvas);

// Draw a colorful line across the top
for (var i = 0; i < canvas.width; i++) {
  var color = randomColor();
  drip.drawPixel(i, 0, color);
}

// Begin the drip!
drip.mainLoop();

// Paint on mouse move
document.addEventListener('mousemove', function(e) {
  var rect = canvas.getBoundingClientRect();
  var x = Math.round((e.clientX - rect.left) / (rect.width / canvas.width));
  var y = Math.round((e.clientY - rect.top) / (rect.height / canvas.height));
  var color = randomColor();
  drip.drawPixel(x, y, color);
});

/**
 * Creates a random color string
 * @return {String} Valid rgb color string
 */
function randomColor() {
  return drip.colorDataToString({
    r: Math.round(Math.random() * 255) + 1,
    g: Math.round(Math.random() * 255) + 1,
    b: Math.round(Math.random() * 255) + 1
  });
}