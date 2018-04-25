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
                        body.move(result.vecPene.mult(result.kv));
                    }
                    if (!oBody.isStatic) {
                        oBody.velocity = result.velocity2;
                        oBody.move(result.vecPene.mult(-result.kvb));
                    }
                }
            }

            if (!body.isStatic) {
                //Impact de la gravité
                if (Number.isFinite(body.mass))
                    body.force = body.force.add(Constants.gravity.mult(body.mass));
                //Impact de la friction de l'air
                body.velocity = body.velocity.multV(Constants.airfriction);
                //Accélération de l'objet
                var a = body.force.mult(body.invMass);
                body.force = Vector.ZERO;
                var delta_v = a.mult(dt);
                body.velocity = body.velocity.add(delta_v);
                body.move(body.velocity.mult(dt));
            }

        }
    }
}