/**
 * Constructor for the CanvasDrip class
 * @param {Element} canvas Canvas element
 */
function CanvasDrip(canvas) {
  // Get canvas context
  this.ctx = canvas.getContext('2d');

  // Disable smoothing where supported (can also be done via CSS with image-rendering)
  this.ctx.mozImageSmoothingEnabled = false;
  this.ctx.webkitImageSmoothingEnabled = false;
  this.ctx.msImageSmoothingEnabled = false;
  this.ctx.imageSmoothingEnabled = false;

  // requestAnimationFrame polyfill
  var vendors = ['ms', 'moz', 'webkit', 'o'];
  for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
      window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
      window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
  }
}

/**
 * Returns the color data for a pixel on the canvas
 * @param {number} x X position
 * @param {number} y Y position
 * @return {Object} The color data of the pixel
 */
CanvasDrip.prototype.getPixel = function(x, y) {
  var pixel = this.ctx.getImageData(x, y, 1, 1);
  return {
    r: pixel.data[0],
    g: pixel.data[1],
    b: pixel.data[2],
    a: pixel.data[3]
  };
};

/**
 * Draw a single pixel to the canvas
 * @param {number} x X position to draw
 * @param {number} y Y position to draw
 * @param {String} [color] Optional CSS valid color to set fillStyle to
 */
CanvasDrip.prototype.drawPixel = function(x, y, color) {
  if (color) { this.ctx.fillStyle = color; }
  this.ctx.fillRect(x, y, 1, 1);
};

/**
 * Create the dripping effect
 */
CanvasDrip.prototype.mainLoop = function() {
  for(var i = 0; i < this.ctx.canvas.width; i++) {
    var x = Math.round(Math.random() * this.ctx.canvas.width);
    var y = Math.round(Math.random() * this.ctx.canvas.height);
    var color = this.getPixel(x, y);
    if (color.a !== 0) {
      var fillStyle = this.colorDataToString(color);
      this.drawPixel(x, y + 1, fillStyle);
    }
  }
  requestAnimationFrame(this.mainLoop.bind(this));
};

/**
 * Creates a valid rgb string from color data
 * @param {Object} color Color data
 * @return {String} Valid rgb color string
 */
CanvasDrip.prototype.colorDataToString = function(color) {
  return 'rgb(' + color.r + ',' + color.g + ',' + color.b + ')';
};