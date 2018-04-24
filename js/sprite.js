var Sprite = function (v, w, h, m) {
    console.log(m);
    Body.call(this,v, w, h, m);
};

Sprite.prototype = Object.create (Body.prototype);
Sprite.prototype.constructor = Sprite;

Sprite.prototype.draw = function () {
  if (canvas.getContext) {
    ctx.fillStyle = 'black';
    if (this.hasCollision) {
    	ctx.fillStyle = 'red';
    	this.setCollision(false);
    }
    ctx.fillRect(this.origin.x, this.origin.y, this.width, this.height);
  };
};
