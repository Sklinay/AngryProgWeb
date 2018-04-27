var Constants = {
    gravity: new Vector(0, 0.001),
    elasticity: 0.5,
    airfriction: 0.001,
    minimalSpeed: 0.05,
    fireScale: 130,
    minimalSpeed:0.01
};

class Game {
    constructor(canvas,canvasDecor,canvasAmmo) {
        var test = new Loader(this,"level1.json");

        this.canvasDecor = canvasDecor;
        this.canvasAmmo = canvasAmmo;
        this.decor = new Decor();
        this.birds = {};
        this.canvas = canvas;
        this.context = this.canvas.getContext("2d");
        this.engine = new Engine(this.canvas);
        this.renderer = new Renderer(this.canvas, this.engine)
         test.load();
        var _this = this;
        var interval;
        interval = setInterval(function () {
            try {
                _this.renderer.update(1000 / 60);
            } catch (e) {
                clearInterval(interval);
                throw (e);
            }
        }, 1000 / 60);
        this.initListener();
    }

    computeCursorPos(x, y) {
        var rect = this.canvas.getBoundingClientRect();
        return new Vector(x - rect.left, y - rect.top);
    }

    initListener() {
        let _this = this;
        window.addEventListener("mousedown", function (ev) {
            _this.engine.aimLine.beginAim(new Vector(ev.clientX, ev.clientY))
        });

        window.addEventListener("mousemove", function (ev) {
            if (!_this.engine.aimLine.drawing) return;
            _this.engine.aimLine.aiming(new Vector(ev.clientX, ev.clientY))

        });

        window.addEventListener("mouseup", function (ev) {
            _this.engine.aimLine.stopDrawn();
            _this.engine.aimLine.fire();
        });
    }
}
