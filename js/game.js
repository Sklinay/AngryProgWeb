var Constants = {
    fps:60,
    gravity: new Vector(0, 0.001),
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
        this.gameOver = false;
        this.currentLevel = null;
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

        this.engine = new Engine(this);
        this.renderer = new Renderer(this.canvasJeu, this.engine)
        
        this.decor = new Decor(this);
        this.ammo = new Ammo(this);
        this.menu = new Menu(this);
    }
    //Lance le chargement du niveau actuel depuis son json
    loadLevel() {
        this.currentLevel.load();
    }
    //Déchargement du niveau actuel et chargement du nouveau
    reload() {
        this.engine.bodies = [];
        this.ammo.aliens = [];
        this.decor.decors = [];
        this.loadLevel();
    }
    
    //Appellé après la fin du chargement d'un niveau via json
    //Démarre le jeu
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
    
    //Initialise tous les listener du jeu
    initListener() {
        let _this = this;
        //Clique enfoncé, début du tire
        window.addEventListener("mousedown", function (ev) {
            if (_this.menu.shown == false) {
                _this.engine.aimLine.beginAim(new Vector(ev.clientX, ev.clientY))
            }
        });
        
        //Mouvement souris, visée du tire
        window.addEventListener("mousemove", function (ev) {
            if (!_this.engine.aimLine.drawing) return;
            _this.engine.aimLine.aiming(new Vector(ev.clientX, ev.clientY))

        });
        
        //Clique relaché, lancement du tire
        window.addEventListener("mouseup", function (ev) {
            if (_this.menu.shown == false) {
                _this.engine.aimLine.stopDrawn();
                _this.engine.aimLine.fire();
            }
        });
        
        //Clique dans le canvas du menu
        canvasMenu.addEventListener("click", function (ev) {
            if (_this.menu.shown) {
                _this.menu.selectingButton(ev.offsetX, ev.offsetY);
            }
        });
        
        //Clique dans le canvas des munitions
        canvasAmmo.addEventListener("click", function (ev) {
            _this.ammo.selectingAmmo(ev.offsetX, ev.offsetY);
        });
        
        //quand on clique sur echap, on affiche ou désaffiche le menu
        window.addEventListener('keyup', (event) => {
            if (event.key == "Escape" && !this.gameOver) {
                if (this.menu.shown) {
                    this.menu.close();
                } else {
                    this.menu.textInfo = "Jeu en pause";
                    this.menu.open();
                }
            }
        });

    }
}
