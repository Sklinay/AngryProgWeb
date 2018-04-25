class Engine {
    constructor(canvas) {
        this.canvas = canvas;
        this.context = this.canvas.getContext("2d");
        this.bodies = [];
        this.aimLine = new Line(this.context,Vector.ZERO, Vector.ZERO);
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
        this.aimLine.draw();
        for (var i = 0; i < this.bodies.length; i++) {

            var body = this.bodies[i];



            // On regarde si avec une telle vitesse il peut y avoir collision avec les autres objets.
            for (var j = i + 1; j < this.bodies.length; j++) {

                var otherBody = this.bodies[j];

                var res = body.collision(otherBody);

                if (res != null) {
                    // mise à jour des vitesses
                    body.velocity = res.velocity1;
                    otherBody.velocity = res.velocity2;

                };
            };

            if (Number.isFinite(body.mass))
                body.force = body.force.add(Constants.gravity.mult(body.mass));

            //Gestion de la friction de l'air ultra basique
            body.velocity = body.velocity.multV(Constants.airfriction);

            // On calcule la nouvelle accéleration :
            var a = body.force.mult(body.invMass);
            body.force = Vector.ZERO;
            var delta_v = a.mult(dt);
            body.velocity = body.velocity.add(delta_v);



            // On met à jour la position.
            body.move(body.velocity.mult(dt));
            // On met à jour la position, mais on annule les vitesses inférieurs à minimalSpeed
            //body.move(new Vector(body.velocity.x < Constants.minimalSpeed ? 0 : body.velocity.x, body.velocity.y < Constants.minimalSpeed ? 0 : body.velocity.y).mult(dt));
        };

    }


}
