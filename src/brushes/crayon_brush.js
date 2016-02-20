/**
 * CrayonBrush class
 * @class fabric.CrayonBrush
 * @extends fabric.BaseBrush
 */
(function(fabric){

  fabric.CrayonBrush = fabric.util.createClass(fabric.BaseBrush, {

    size: 0,
    opacity: 0.6,
    color: "#000000",
    _point: null,
    inkAmount: 10,
    sep: 5,

    initialize: function(canvas, opt) {
      opt = opt || {};

      this.canvas = canvas;
      this.width = opt.width || canvas.freeDrawingBrush.width;

      this._point = new fabric.Point(0, 0);
      this.color = opt.color || canvas.freeDrawingBrush.color;
      this.opacity = opt.opacity || canvas.contextTop.globalAlpha;
      this.inkAmount = opt.inkAmount || this.inkAmount;

      this._latest = null;
      this._latestStrokeLength = 0;
    },

    changeColor: function(color){
      this.color = color;
    },

    changeOpacity: function(value){
      this.opacity = value;
    },

    onMouseDown: function(pointer){
      this.canvas.contextTop.globalAlpha = this.opacity;
      this.size = this.width / 4 + 20;
      this.set(pointer);
    },

    onMouseMove: function(pointer){
      this.update(pointer);
      this.draw(this.canvas.contextTop);
    },


    onMouseUp: function(pointer){
    },

    set: function(p) {
      if (this._latest) {
        this._latest.setFromPoint(this._point);
      } else {
        this._latest = new fabric.Point(p.x, p.y);
      }
      fabric.Point.prototype.setFromPoint.call(this._point, p);
    },

    update: function(p) {
      this.set(p);
      this._latestStrokeLength = this._point.subtract(this._latest).distanceFrom({ x: 0, y: 0 });
    },

    draw: function(ctx) {
      var i, j, p, r, c, x, y, w, h, v, s, stepNum, dotSize, dotNum, range;

      v = this._point.subtract(this._latest);
      s = Math.ceil(this.size / 2);
      stepNum = Math.floor(v.distanceFrom({ x: 0, y: 0 }) / s) + 1;
      v.normalize(s);

      dotSize = this.sep * fabric.util.clamp(this.inkAmount / this._latestStrokeLength * 3, 1, 0.5);
      dotNum = Math.ceil(this.size * this.sep);

      range = this.size / 2;

      ctx.save();
      ctx.fillStyle = this.color;
      ctx.beginPath();
      for (i = 0; i < dotNum; i++) {
        for (j = 0; j < stepNum; j++) {
          p = this._latest.add(v.multiply(j));
          r = fabric.util.getRandom(range);
          c = fabric.util.getRandom(Math.PI * 2);
          w = fabric.util.getRandom(dotSize, dotSize / 2);
          h = fabric.util.getRandom(dotSize, dotSize / 2);
          x = p.x + r * Math.sin(c) - w / 2;
          y = p.y + r * Math.cos(c) - h / 2;
          ctx.rect(x, y, w, h);
        }
      }
      ctx.fill();
      ctx.restore();
    }
  });

})(fabric);
