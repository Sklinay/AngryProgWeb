class Loader {
    constructor(game, levelName) {
        this.levelName = levelName;
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
        var engine = this.game.engine;
        var decor = this.game.decor;
        Constants.airfriction = data.levelSettings.airFriction;
        Constants.gravity = new Vector(data.levelSettings.gravity.x, data.levelSettings.gravity.y);
        Constants.baseDamageFactor = data.levelSettings.baseDamageFactor;
        engine.aimLine.launcherPos = new Vector(data.levelSettings.launcherPosition.x, data.levelSettings.launcherPosition.y);
        decor.init(data.decorSettings.typeDecor);

        for (var i = 0; i < data.obstacle.length; i++) {
            var s = data.obstacle[i];
            this.game.engine.addBody(new Sprite(this.game.contextJeu, s));
        }

        for (var i = 0; i < data.target.length; i++) {
            var s = data.target[i];
            this.game.engine.addBody(new Sprite(this.game.contextJeu, s));
        }
        
        for (var i = 0; i < data.bird.length; i++) {
            var s = data.bird[i];
            this.game.ammo.addAmmo(new Bird(this.game.contextAmmo,s),s.defaultAmmo);
        }
        
        for (var i = 0; i < data.decor.length; i++) {
            var s = data.decor[i];
            this.game.decor.addDecor(s);
        }
        this.game.loadGame();
    }
}
