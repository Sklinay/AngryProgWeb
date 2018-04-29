class Engine {
    constructor(game) {
        this.game = game;
        this.canvas = this.game.canvasJeu;
        this.context = this.game.contextJeu;
        this.bodies = [];
        this.explosions = [];
        this.aimLine = new Line(this.game, Vector.ZERO, Vector.ZERO);
        
    }
    addBody(b) {
        this.bodies.push(b);
    }

    removeBody(b) {
        var i = this.bodies.findIndex(function (e) {
            return e == b;
        });
        if (i >= 0)
            this.bodies.splice(i, 1);
    }
    speedPolisher(v) {
        return new Vector(
            Math.abs(v.x) > Constants.minimalSpeed ? v.x : 0,
            Math.abs(v.y) > Constants.minimalSpeed ? v.y : 0,
        )
    }
    update(dt) {
        let _this = this;
        //Dessin de la ligne de visée
        this.aimLine.draw();
        this.explosions = this.explosions.filter(e => e.particles.length > 0);
        this.bodies = this.bodies.filter(function (e) {
            if (e.life <= 0) {              
                if(e.type=="target")  _this.game.score += e.lifeMax;
                _this.explosions.push(new Explosion(_this.context, e));
                return false
            } else
                return true
        });

        for (var i = 0; i < this.explosions.length; i++) {
            this.explosions[i].update();
        }
        var noTarget = true;
        var allAmmoStatic = true;
        //Pour chaque body
        for (var i = 0; i < this.bodies.length; i++) {
            var body = this.bodies[i];
            if(body.type == "target")   
                noTarget=false;
            var bounce = Vector.ZERO;
            //Pour chaque body autre que ceux déjà parcouru dans la première boucle
            for (var j = i + 1; j < this.bodies.length; j++) {
                var oBody = this.bodies[j];
                var result = body.collision(oBody);
                if (result != null) {
                    if (!body.isStatic) {
                        body.velocity = result.velocity1;
                        body.move(this.speedPolisher(result.vecPene.mult(result.kv)));
                    }
                    if (!oBody.isStatic) {
                        oBody.velocity = result.velocity2;
                        oBody.move(this.speedPolisher(result.vecPene.mult(-result.kvb)));
                    }
                }
            }

            if (!body.isStatic) {
                var forceFrottements = body.velocity.normalize().mult(Constants.airfriction).mult(-1).div(body.mass);

                var poids = Constants.gravity.mult(body.mass);

                var sommeForces = forceFrottements.add(poids);

                var acceleration = sommeForces.div(body.mass);

                var deltaV = acceleration.mult(dt);

                body.velocity = body.velocity.add(deltaV);

                body.move(body.velocity.mult(dt));
                if(body.type == "ammo" && body.velocity.norm() > 0.05)
                    allAmmoStatic=false;
            }

        }
        
        if(noTarget && this.explosions.length == 0 && !this.game.gameOver){
            if(this.game.currentLevel.levelNum >= this.game.nbWins)              
                this.game.nbWins++;
            var finalScore = this.game.ammo.getRemainingAmmo()*1000 + this.game.score;
            this.game.menu.textInfo = "Bravo ! Vous avez un score de " + finalScore;
            this.game.gameOver = true;
            this.game.menu.open();
        }
        
        if(this.game.ammo.getRemainingAmmo() == 0 && this.explosions.length == 0 && allAmmoStatic && !this.game.gameOver){
            this.game.menu.textInfo = "Vous avez perdu !";
            this.game.gameOver = true;
            this.game.menu.open();
        }

    }
}