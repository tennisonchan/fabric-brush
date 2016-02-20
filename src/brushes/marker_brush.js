/**
* MarkerBrush class
* @class fabric.MarkerBrush
* @extends fabric.BaseBrush
*/
(function(fabric) {

  fabric.MarkerBrush = fabric.util.createClass(fabric.BaseBrush, {

    width: 10,
    color: "#000000",
    opacity: 1,
    _size: 0,
    _lineWidth: 3,
    _point: null,
    _lastPoint: null,

    initialize: function(canvas, opt) {
      opt = opt || {};

      this.canvas = canvas;
      this.width = opt.width || canvas.freeDrawingBrush.width;
      this.color = opt.color || canvas.freeDrawingBrush.color;
      this.opacity = opt.opacity || canvas.contextTop.globalAlpha;
      this._point = new fabric.Point();

      this.canvas.contextTop.lineJoin = 'round';
      this.canvas.contextTop.lineCap = 'round';
    },

    changeColor: function(color) {
      this.color = color;
    },

    changeOpacity: function(value) {
      this.opacity = value;
    },

    _render: function(pointer) {
      var ctx, lastPoint, lineWidthDiff, i;

      ctx = this.canvas.contextTop;
      lastPoint = this._lastPoint;

      ctx.beginPath();

      for(i = 0, len = (this._size / this._lineWidth) / 2; i < len; i++) {
        lineWidthDiff = (this._lineWidth - 1) * i;

        ctx.globalAlpha = 0.8 * this.opacity;
        ctx.moveTo(lastPoint.x + lineWidthDiff, lastPoint.y + lineWidthDiff);
        ctx.lineTo(pointer.x + lineWidthDiff, pointer.y + lineWidthDiff);
        ctx.stroke();
      }

      this._lastPoint = new fabric.Point(pointer.x, pointer.y);
    },

    onMouseDown: function(pointer) {
      this._lastPoint = pointer;
      this.canvas.contextTop.strokeStyle = this.color;
      this.canvas.contextTop.lineWidth = this._lineWidth;
      this._size = this.width / 3 + 20;
    },

    onMouseMove: function(pointer) {
      if (this.canvas._isCurrentlyDrawing) {
        this._render(pointer);
      }
    },

    onMouseUp: function() {
      this.canvas.contextTop.globalAlpha = this.opacity;
    }
  });

})(fabric);
