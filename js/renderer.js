class Renderer {

    constructor(canvas, e) {
        this.canvas = canvas;
        this.context = this.canvas.getContext("2d");
        this.engine = e;
    }

    update(dt) {
        this.clearCanvas();
        this.engine.update(dt);
        for (var i = 0; i < this.engine.bodies.length; i++) {
            if (i == 6) {
                this.engine.bodies[i].angle++;
                this.engine.bodies[i].drawRecDebug();
            }
            this.engine.bodies[i].draw();
        }
        // this.engine.bodies.forEach(function (b) {
        //     b.draw();
        // });
    }

    clearCanvas(dt) {
        //ctx => window.ctx
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

}
