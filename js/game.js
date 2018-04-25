var Constants = {
    gravity: new Vector(0, 0.0005),
    elasticity: 0.5,
    airfriction: new Vector(0.99, 1),
    minimalSpeed: 0.05
};

class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.context = this.canvas.getContext("2d");
        this.engine = new Engine(this.canvas);
        this.renderer = new Renderer(this.canvas,this.engine)
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
        this.initListener() ;
    }
    initLevelTest() {
        var wall1 = new Sprite(this.context,new Vector(0, 0), 1000, 20, Infinity, Vector.ZERO);
        var wall2 = new Sprite(this.context,new Vector(0, 580), 1000, 20, Infinity, Vector.ZERO);
        var wall3 = new Sprite(this.context,new Vector(0, 20), 20, 560, Infinity, Vector.ZERO);
        var wall4 = new Sprite(this.context,new Vector(980, 20), 20, 560, Infinity, Vector.ZERO);
        this.engine.addBody(wall1);
        this.engine.addBody(wall2);
        this.engine.addBody(wall3);
        this.engine.addBody(wall4);
    }

    initListener() {
        var _this = this;
        this.canvas.addEventListener("mousedown", function (ev) {
            _this.engine.aimLine.setOrigin(ev.clientX, ev.clientY);
            _this.engine.aimLine.setTarget(ev.clientX, ev.clientY);
            _this.engine.aimLine.startDrawn();
        });

        this.canvas.addEventListener("mousemove", function (ev) {
            if (!_this.engine.aimLine.drawing) return;
            _this.engine.aimLine.setTarget(ev.clientX, ev.clientY);
        });

        this.canvas.addEventListener("mouseup", function (ev) {
            _this.engine.aimLine.stopDrawn();
            var sprite = new Sprite(_this.context,new Vector(_this.engine.aimLine.origin.x - _this.engine.aimLine.target.x, _this.engine.aimLine.origin.y - _this.engine.aimLine.target.y), 30, 30, +document.getElementById("mass").value, _this.engine.aimLine.target.normalize(),'ressources/box.png');
            //sprite.force = new Vector(0.01,0.01);
            _this.engine.addBody(sprite);
        });
    }
}
