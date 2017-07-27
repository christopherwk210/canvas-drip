# canvas-drip
[VIEW DEMO](https://christopherwk210.github.io/canvas-drip/)

A canvas experiment that simulates paint dripping. Based on the `drippy.p8` demo included with Pico-8.

# Download
The minified build can be found [here](https://raw.githubusercontent.com/christopherwk210/canvas-drip/master/dist/canvas-drip.min.js). If you want to build locally:
```
$ git clone https://github.com/christopherwk210/canvas-drip.git
$ cd canvas-drip
$ npm install && npm run build
```

# Getting started
After including `canvas-drip.js` or `canvas-drip.min.js` on your page, you can initialize it like so:
```javascript
var canvas = document.getElementById('canvas');
var drip = new CanvasDrip(canvas);

// Kick off the dripping function
drip.mainLoop();
```
There are a few things to keep in mind when using canvas-drip. It works by sampling individual pixels on the canvas, so using large canvas' may produce mild results. The effect is much more exaggerated when you scale a small canvas up.

When scaling a small canvas up, many browsers will blur the image of the canvas. If you are working with a very small canvas, this can be less than ideal as it will end up just looking like a blurry mess. To avoid this, the following CSS can be used:
```css
.my-canvas {
  image-rendering: optimizeSpeed;
  image-rendering: -moz-crisp-edges;
  image-rendering: -webkit-optimize-contrast;
  image-rendering: -o-crisp-edges;
  image-rendering: -o-pixelated;
  image-rendering: pixelated;
  -ms-interpolation-mode: nearest-neighbor;
}
```
In addition, the following javascript will disable image smoothing on the canvas (for browsers that may not support the `image-rendering` css property):
```javascript
ctx.mozImageSmoothingEnabled = false;
ctx.webkitImageSmoothingEnabled = false;
ctx.msImageSmoothingEnabled = false;
ctx.imageSmoothingEnabled = false;
```
You can see this technique in action by viewing the demo page.