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
        Constants.airfriction = new Vector(data.levelSettings.airFriction.x, data.levelSettings.airFriction.y);
        Constants.gravity = new Vector(data.levelSettings.gravity.x, data.levelSettings.gravity.y);
        engine.aimLine.launcherPos = new Vector(data.levelSettings.launcherPosition.x, data.levelSettings.launcherPosition.y);
        decor.init(data.decorSettings.typeDecor);

        for (var i = 0; i < data.obstacle.length; i++) {
            var s = data.obstacle[i];
            this.game.engine.addBody(new Sprite(this.game.context, s));
        }

        for (var i = 0; i < data.target.length; i++) {
            var s = data.target[i];
            this.game.engine.addBody(new Sprite(this.game.context, s));
        }
    }
}
