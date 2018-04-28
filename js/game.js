var Constants = {
    gravity: new Vector(0, 0.001),
    elasticity: 0.5,
    airfriction: 0.001,
    minimalSpeed: 0.05,
    fireScale: 130,
    minimalSpeed:0.01,
    baseDamageFactor:1,
    ressourcesPath:"ressources/"
};

class Game {
    constructor(canvas,canvasDecor,canvasAmmo, canvasMenu) {
        this.pause = false;
        this.currentLevel = new Loader(this,"level1.json");
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
        this.loadLevel();
    }
    loadLevel(){
        this.currentLevel.load();
    }
    loadGame(){

        var _this = this;
        var interval;
        interval = setInterval(function () {
            try {
                if (!_this.pause) {
                    _this.renderer.update(1000 / 60);
                }
            } catch (e) {
                clearInterval(interval);
                throw (e);
            }
        }, 1000 / 60);
        this.ammo.update();
        this.engine.aimLine.updateLauncher();
        this.initListener();
        this.decor.update();
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
                _this.menu.selectingButton(ev.offsetX,ev.offsetY);
            }
        });

        canvasAmmo.addEventListener("click", function (ev) {
            _this.ammo.selectingAmmo(ev.offsetX,ev.offsetY);
        });
        //quand on clique sur echap, on affiche ou désaffiche le menu
        window.addEventListener('keyup', (event) => {
          if (event.key == "Escape") {
              if (this.menu.shown) {
                  this.menu.close();
              }
              else {
                  this.menu.open();
              }
              this.menu.shown = !this.menu.shown;
          }
        });

    }
}
