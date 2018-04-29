class Loader {
    constructor(game, levelName, levelNum) {
        this.levelName = levelName;
        this.levelNum = levelNum;
        this.game = game;
    }

    load() {
        var xmlhttp = new XMLHttpRequest();
        let _this = this;
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var myArr = JSON.parse(this.responseText);
                _this.readData(myArr);
            }
        };
        xmlhttp.open("GET", "./level/" + this.levelName, true);
        xmlhttp.send();
    }

    readData(data) {
        //Charge toute les informations sur le niveau dans le json
        var engine = this.game.engine;
        var decor = this.game.decor;
        Constants.airfriction = data.levelSettings.airFriction;
        Constants.gravity = new Vector(data.levelSettings.gravity.x, data.levelSettings.gravity.y);
        Constants.baseDamageFactor = data.levelSettings.baseDamageFactor;
        engine.aimLine.launcherPos = new Vector(data.levelSettings.launcherPosition.x, data.levelSettings.launcherPosition.y);
        decor.init(data.decorSettings.typeDecor);
        this.game.nbTarget = data.target.length;

        //Création des obstacles
        for (var i = 0; i < data.obstacle.length; i++) {
            var s = data.obstacle[i];
            this.game.engine.addBody(new Sprite(this.game.contextJeu, s, "obstacle"));
        }

        //Création des cibles
        for (var i = 0; i < data.target.length; i++) {
            var s = data.target[i];
            this.game.engine.addBody(new Sprite(this.game.contextJeu, s, "target"));
        }

        //Création des munitions d'alien
        for (var i = 0; i < data.alien.length; i++) {
            var s = data.alien[i];
            this.game.ammo.addAmmo(new Alien(this.game.contextAmmo,s),s.defaultAmmo);
        }

        //Création des décors
        for (var i = 0; i < data.decor.length; i++) {
            var s = data.decor[i];
            this.game.decor.addDecor(s);
        }
        this.game.loadGame();
    }
}
