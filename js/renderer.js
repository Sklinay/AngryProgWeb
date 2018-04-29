class Renderer {

    constructor(canvas, e) {
        this.canvas = canvas;
        this.context = this.canvas.getContext("2d");
        this.engine = e;
        this.interval = null;
        this.frameCounter = 0;
        this.startCounter = 0;
        this.fpsContainer = document.getElementById('fps');

    }

    update(dt) {
        this.clearCanvas();
        this.engine.update(dt);
        this.engine.bodies.forEach(function (b) {
            b.draw();
        });
        this.engine.explosions.forEach(function (b) {
            b.draw();
        });
    }

    clearCanvas(dt) {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    start() {
        if (this.interval != null) return;
        let _this = this;
        this.startCounter = Date.now();
        this.frameCounter = 0;
        this.interval = setInterval(function () {
            try {
                _this.update(1000 / Constants.fps);
            } catch (e) {
                clearInterval(_this);
                throw (e);
            }
            if (Date.now() - _this.startCounter > 1000) {
                _this.startCounter = Date.now();
                _this.fpsContainer.innerHTML = "FPS : " + _this.frameCounter;
                _this.frameCounter = 0;
            } else {
                _this.frameCounter++;
            }
        }, 1000 / Constants.fps);
    }

    stop() {
        clearInterval(this.interval);
        this.interval = null;
    }
}