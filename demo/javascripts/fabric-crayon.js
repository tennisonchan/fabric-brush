(function(fabric){

  fabric.CrayonBrush = fabric.util.createClass(fabric.BaseBrush, {

    size: 0,
    opacity: 0.6,
    color: "#000000",
    _point: null,
    inkAmount: 10,
    sep: 5,

    initialize: function(opt) {
      this.canvas = opt.canvas;
      this.ctx = this.canvas.contextTop;
      this.width = opt.width || this.canvas.freeDrawingBrush.width;

      this._point = new fabric.Point(0, 0);
      this.color = opt.color || this.canvas.freeDrawingBrush.color;
      this.opacity = opt.opacity || this.ctx.globalAlpha;
      this.inkAmount = opt.inkAmount;

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
      this.ctx.globalAlpha = this.opacity;
      this.size = this.width / 4 + 20;
      this.set(pointer);
    },

    onMouseMove: function(pointer){
      this.update(pointer);
      this.draw(this.ctx);
    },

    onMouseUp: function(){
      // on mouse up action
    },

    set: function(p) {
      if (!this._latest) {
        this._latest = new fabric.Point(p.x, p.y);
      } else {
        this._latest.setFromPoint(this._point);
      }
      fabric.Point.prototype.setFromPoint.call(this._point, p);
    },

    update: function(p) {
      this.set(p);
      this._latestStrokeLength = this._point.subtract(this._latest).distanceFrom({ x: 0, y: 0 });
    },

    draw: function(ctx) {
      var i, j, p, r, c, x, y, w, h;
      var v = this._point.subtract(this._latest);
      var s = Math.ceil(this.size / 2);
      var stepNum = Math.floor(v.distanceFrom({ x: 0, y: 0 }) / s) + 1;
      v.normalize(s);

      var dotSize = this.sep * fabric.util.clamp(this.inkAmount / this._latestStrokeLength * 3, 1, 0.5);
      var dotNum = Math.ceil(this.size * this.sep);

      var range = this.size / 2;

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

  fabric.Point.prototype.normalize = function(thickness) {
    if (null === thickness || undefined === thickness) {
      thickness = 1;
    }

    var length = this.distanceFrom({ x: 0, y: 0 });

    if (length > 0) {
      this.x = this.x / length * thickness;
      this.y = this.y / length * thickness;
    }

    return this;
  };

  fabric.util.clamp = function (n, max, min) {
    if (typeof min !== 'number') min = 0;
    return n > max ? max : n < min ? min : n;
  };

  fabric.util.getRandom = function(max, min){
    min = min ? min : 0;
    return Math.random() * ((max ? max : 1) - min) + min;
  };

})(fabric);