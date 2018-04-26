var Constants = {
    gravity: new Vector(0, 0.001),
    elasticity: 0.5,
    airfriction: new Vector(0.001, 0.001),
    minimalSpeed: 0.05,
    fireScale: 130,
    minimalSpeed:0.01
};

class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.context = this.canvas.getContext("2d");
        this.engine = new Engine(this.canvas);
        this.renderer = new Renderer(this.canvas, this.engine)
        this.initLevelTest();

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
    initLevelTest() {
        var wall1 = new Sprite(this.context, new Vector(0, 0), 1500, 20, Infinity, Vector.ZERO, true);
        var wall2 = new Sprite(this.context, new Vector(0, 580), 1500, 20, Infinity, Vector.ZERO, true);
        var wall3 = new Sprite(this.context, new Vector(0, 20), 20, 560, Infinity, Vector.ZERO, true);
        var wall4 = new Sprite(this.context, new Vector(1480, 20), 20, 560, Infinity, Vector.ZERO, true);
        this.engine.addBody(wall1);
        this.engine.addBody(wall2);
        this.engine.addBody(wall3);
        this.engine.addBody(wall4);
    }

    computeCursorPos(x, y) {
        var rect = this.canvas.getBoundingClientRect();
        return new Vector(x - rect.left, y - rect.top);
    }

    initListener() {
        var _this = this;
        this.canvas.addEventListener("mousedown", function (ev) {
            _this.engine.aimLine.beginAim(_this.computeCursorPos(ev.clientX, ev.clientY))
        });

        this.canvas.addEventListener("mousemove", function (ev) {
            if (!_this.engine.aimLine.drawing) return;
            _this.engine.aimLine.aiming(_this.computeCursorPos(ev.clientX, ev.clientY))

        });

        this.canvas.addEventListener("mouseup", function (ev) {
            _this.engine.aimLine.stopDrawn();
            _this.engine.aimLine.fire();
        });
    }


}