var Sprite = function (v, w, h, m,vel) {
    console.log(m);
    Body.call(this,v, w, h, m, vel);
};

Sprite.prototype = Object.create (Body.prototype);
Sprite.prototype.constructor = Sprite;

Sprite.prototype.draw = function () {
  if (canvas.getContext) {
    ctx.fillStyle = 'black';
    ctx.fillRect(this.origin.x, this.origin.y, this.width, this.height);
  };
};

