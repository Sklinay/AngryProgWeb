class Engine {
    constructor(canvas) {
        this.canvas = canvas;
        this.context = this.canvas.getContext("2d");
        this.bodies = [];
        this.aimLine = new Line(this.context, Vector.ZERO, Vector.ZERO);
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
        //Dessin de la ligne de visée
        this.aimLine.draw();
        //Pour chaque body
        for (var i = 0; i < this.bodies.length; i++) {
            var body = this.bodies[i];
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
                //Impact de la gravité sur l'objet en fonction de sa masse;
                
                var forceFrottements = body.velocity.normalize().mult(Constants.airfriction);

                var poids = Constants.gravity.mult(body.mass);

                var sommeForces = forceFrottements.add(poids);

                var acceleration = sommeForces.div(body.mass);

                var deltaV = acceleration.mult(dt);

                body.velocity = body.velocity.add(deltaV);

                // if (Number.isFinite(body.mass))
                //     body.force = body.force.add(Constants.gravity.mult(body.mass));
                // //Impact de la friction de l'air (div(body.mass), plus l'objet est massif, moins les frictionnement auront d'impact)
                // body.velocity = body.velocity.add(body.velocity.normalize().multV(Constants.airfriction).mult(-1).div(body.mass));
                // //Accélération de l'objet
                // var delta_v = Constants.gravity.mult(dt);
                // body.force = Vector.ZERO;
                // body.velocity = body.velocity.add(delta_v);
                // //Polissage de la vitesse pour arrêter les vibrations
                // //body.move(this.speedPolisher(body.velocity).mult(dt));
                // //Problème à régler => à cause de la gravité, un objet est en perpetuelle collision avec le sol, donc l'objet garde une vitesse trop grande pour être annulé

                body.move(body.velocity.mult(dt));
            }

        }
    }
}
