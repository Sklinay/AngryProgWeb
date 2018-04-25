var Renderer = function (e) {
    this.engine = e;
};


Renderer.prototype.update = function (dt) {
    this.clearCanvas();
    this.engine.update(dt);
    this.engine.bodies.forEach(function (b) {
        b.draw();
    });
};

Renderer.prototype.clearCanvas = function (dt) {
    //ctx => window.ctx 
    ctx.clearRect(0, 0, canvas.width, canvas.height);
};
