var Constants = {
    gravity: new Vector(0, 0.001),
    elasticity: 0.5,
    airfriction: 0.001,
    minimalSpeed: 0.05,
    fireScale: 130,
    minimalSpeed: 0.01,
    baseDamageFactor: 1,
    ressourcesPath: "ressources/"
};

class Game {
    constructor(canvas, canvasDecor, canvasAmmo, canvasMenu) {
        this.firstStart = true;
        this.pause = false;
        this.gameOver = false;
        this.currentLevel = new Loader(this, "plaine.json", 0);
        this.score = 0;
        this.nbWins = 0;
        this.canvasJeu = canvas;
        this.contextJeu = this.canvasJeu.getContext("2d");

        this.canvasDecor = canvasDecor;
        this.contextDecor = this.canvasDecor.getContext("2d");

        this.canvasAmmo = canvasAmmo;
        this.contextAmmo = this.canvasAmmo.getContext("2d");

        this.canvasMenu = canvasMenu;
        this.contextMenu = this.canvasMenu.getContext("2d");

        this.decor = new Decor(this);
        this.ammo = new Ammo(this);
        this.menu = new Menu(this);

        this.engine = new Engine(this);
        this.renderer = new Renderer(this.canvasJeu, this.engine)
        this.interval;
        this.loadLevel();
    }

    loadLevel() {
        this.currentLevel.load();
    }

    reload() {
        this.engine.bodies = [];
        this.ammo.birds = [];
        this.decor.decors = [];
        this.loadLevel();
    }

    loadGame() {

        var _this = this;

        this.ammo.update();
        this.engine.aimLine.updateLauncher();

        this.decor.update();
        this.renderer.start();

        if (this.firstStart) {
            this.firstStart = false;
            this.initListener();
        }
        this.score = 0;
        this.gameOver = false;

    }
    computeCursorPos(x, y) {
        var rect = this.canvas.getBoundingClientRect();
        return new Vector(x - rect.left, y - rect.top);
    }

    initListener() {
        let _this = this;
        window.addEventListener("mousedown", function (ev) {
            if (_this.menu.shown == false) {
                _this.engine.aimLine.beginAim(new Vector(ev.clientX, ev.clientY))
            }
        });

        window.addEventListener("mousemove", function (ev) {
            if (!_this.engine.aimLine.drawing) return;
            _this.engine.aimLine.aiming(new Vector(ev.clientX, ev.clientY))

        });

        window.addEventListener("mouseup", function (ev) {
            if (_this.menu.shown == false) {
                _this.engine.aimLine.stopDrawn();
                _this.engine.aimLine.fire();
            }
        });

        canvasMenu.addEventListener("click", function (ev) {
            if (_this.menu.shown) {
                _this.menu.selectingButton(ev.offsetX, ev.offsetY);
            }
        });

        canvasAmmo.addEventListener("click", function (ev) {
            _this.ammo.selectingAmmo(ev.offsetX, ev.offsetY);
        });
        //quand on clique sur echap, on affiche ou désaffiche le menu
        window.addEventListener('keyup', (event) => {
            if (event.key == "Escape" && !this.gameOver) {
                if (this.menu.shown) {
                    this.menu.close();
                } else {
                    this.menu.textInfo = "Game Paused";
                    this.menu.open();
                }
            }
        });

    }
}
