# Fabric Brush - Canvas Brushes on Fabric.js
Fabric Brush is a collection of brushes built on an awesome canvas framework Fabric.js

## Quickstart
- [Install fabric with bower](https://github.com/kangax/fabric.js): `bower install fabric`
- Install fabric-brush with bower: `bower install fabric-brush`

## [Demo](https://tennisonchan.github.io/fabric-brush)

[<img src="https://tennisonchan.github.io/fabric-brush/demo/images/crayon-brush.gif" alt="crayon-brush" width="432" height="270">](https://tennisonchan.github.io/fabric-brush)
[<img src="https://tennisonchan.github.io/fabric-brush/demo/images/ink-brush.gif" alt="ink-brush" width="432" height="270">](https://tennisonchan.github.io/fabric-brush)
[<img src="https://tennisonchan.github.io/fabric-brush/demo/images/marker-brush.gif" alt="marker-brush" width="432" height="270">](https://tennisonchan.github.io/fabric-brush)
[<img src="https://tennisonchan.github.io/fabric-brush/demo/images/spray-brush.gif" alt="spray-brush" width="432" height="270">](https://tennisonchan.github.io/fabric-brush)

### Examples of use
Set the crayon brush as the free drawing brush

```html
<script src="bower_components/fabric.js"></script>
<script src="bower_components/dist/fabric-brush.js"></script>

<canvas id="c"></canvas>
```
```javascript
var canvas = new fabric.Canvas('c');

// Crayon Brush
canvas.freeDrawingBrush = new fabric.CrayonBrush(canvas, {
  width: 70,
  opacity: 0.6,
  color: "#ff0000"
});

// Ink Brush
// canvas.freeDrawingBrush = new fabric.InkBrush(canvas);

// Marker Brush
// canvas.freeDrawingBrush = new fabric.MarkerBrush(canvas);

// Spray Brush
// canvas.freeDrawingBrush = new fabric.SprayBrush(canvas);
```

Change color of the brush into red
```
canvas.freeDrawingBrush.changeColor("#ff0000");
```
Change opacity of the brush into 0.6
```
canvas.freeDrawingBrush.changeOpacity(0.6);
```