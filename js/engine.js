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
        //Dessine la ligne de visée
        this.aimLine.draw();
        //Supprime les explosions terminées
        this.explosions = this.explosions.filter(e => e.particles.length > 0);
        //Supprime les bodies qui n'ont plus de vie et génère une explosion
        //si ces bodies étaient des targets, alors on augmente le score en fonction de lifemax du body mort
        this.bodies = this.bodies.filter(function (e) {
            if (e.life <= 0) {              
                if(e.type=="target")  _this.game.score += e.lifeMax;
                _this.explosions.push(new Explosion(_this.context, e));
                return false
            } else
                return true
        });
        //Pour chaque explosions en cours
        for (var i = 0; i < this.explosions.length; i++) {
            this.explosions[i].update(); //on la met à jour
        }
        var noTarget = true;
        var allAmmoStatic = true;
        //Pour chaque body
        for (var i = 0; i < this.bodies.length; i++) {
            var body = this.bodies[i];
            //vérifie s'il y a encore des cibles (ennemie) dans le niveau
            if(body.type == "target")   
                noTarget=false;
            
            //Pour chaque autre body, on check les collision
            for (var j = i + 1; j < this.bodies.length; j++) {
                var oBody = this.bodies[j];
                var result = body.collision(oBody);
                if (result != null) { //s'il y a collision on met à jours le vitesse et déplacement
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
            //Calcul de la nouvelle vitesse de body
            if (!body.isStatic) {
                var forceFrottements = body.velocity.normalize().mult(Constants.airfriction).mult(-1).div(body.mass);
                var poids = Constants.gravity.mult(body.mass);
                var sommeForces = forceFrottements.add(poids);
                var acceleration = sommeForces.div(body.mass);
                var deltaV = acceleration.mult(dt);
                body.velocity = body.velocity.add(deltaV);                
                body.move(body.velocity.mult(dt));
                
                //Vérifie si toute les munitions (les aliens) sont immobiles
                if(body.type == "ammo" && body.velocity.norm() > 0.05)
                    allAmmoStatic=false;
            }

        }
        //Vérifie si le niveau est gagné (plus de cible, explosions terminées et niveau pas déjà fini)
        if(noTarget && this.explosions.length == 0 && !this.game.gameOver){
            if(this.game.currentLevel.levelNum >= this.game.nbWins) //Si dernier niveau débloqué réussi, on débloque le suivant         
                this.game.nbWins++;
            var finalScore = this.game.ammo.getRemainingAmmo()*1000 + this.game.score; //
            this.game.menu.textInfo = "Bravo ! Vous avez un score de " + finalScore;
            this.game.gameOver = true;
            this.game.menu.open();
        }
        
        //Vérifie si la partie est perdue (plus de munitions, explosions terminéees, tous liens aliens sont immobiles et niveau pas déjà fini)
        if(this.game.ammo.getRemainingAmmo() == 0 && this.explosions.length == 0 && allAmmoStatic && !this.game.gameOver){
            this.game.menu.textInfo = "Vous avez perdu !";
            this.game.gameOver = true;
            this.game.menu.open();
        }

    }
}