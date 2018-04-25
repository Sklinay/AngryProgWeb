class Renderer {

    constructor(canvas, e) {
        this.canvas = canvas;
        this.context = this.canvas.getContext("2d");
        this.engine = e;
    }

    update(dt) {
        this.clearCanvas();
        this.engine.update(dt);
        this.engine.bodies.forEach(function (b) {
            b.draw();
        });
    }

    clearCanvas(dt) {
        //ctx => window.ctx 
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

}