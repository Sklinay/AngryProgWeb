class Renderer {

    constructor(canvas, e) {
        this.canvas = canvas;
        this.context = this.canvas.getContext("2d");
        this.engine = e;
        this.interval = null;
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
        //ctx => window.ctx 
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    
    start() {
        if(this.interval != null) return;
        let _this = this;
        this.interval = setInterval(function () {
            try {
                _this.update(1000 / 60);
            } catch (e) {
                clearInterval(_this);
                throw (e);
            }
        }, 1000 / 60);
    }
    
    stop(){
        clearInterval(this.interval);
        this.interval = null;
    }
}