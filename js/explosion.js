class Explosion {
    constructor(context, body) {
        this.context = context;
        this.particles = [];
        this.power = body.mass * 20; //La puissance de l'explosion dépend de la masse de l'objet qui explose
        var color = ["#ff0000","#ffea0a"];
        //Gènère this.power particules, leur couleur change une fois sur deux
        for (let i = 0; i < this.power; i++) {
            this.particles.push(new Particle(this.context, body,color[i%2]));
        }

    }
    draw() {
        this.particles.forEach(function (e) {
            e.draw();
        });
    }
    update() {
        this.particles = this.particles.filter(e => e.duration >= 0);
        this.particles.forEach(function (e) {
            e.move();
        });
    }
}

class Particle {
    constructor(context, body, color) {
        this.color = color;
        this.duration = Math.random() * Constants.fps; //La durée de vie d'une particule est entre 0 et 1 secondes
        this.context = context;
        this.origin = this.generateOrigin(body);
        //Génération d'une vitesse aléatoire
        var randomAngle = Math.random() * Math.PI * 2;
        this.velocity = new Vector(Math.cos(randomAngle), Math.sin(randomAngle)).mult(Math.random() + 1);
    }
    //Gènère des coordonnées qui sont dans le sprite du body
    //Toutes les particules partirons à des endroits aléatoire dans le body qui explose
    generateOrigin(body) {
        var x = Math.floor(Math.random() * (body.origin.x + body.width - body.origin.x)) + body.origin.x;
        var y = Math.floor(Math.random() * (body.origin.y + body.height - body.origin.y)) + body.origin.y;
        return new Vector(x, y);
    }

    move() {
        this.origin = this.origin.add(this.velocity);
        this.duration--;
    }

    draw() {
        this.context.fillStyle = this.color;
        this.context.fillRect(this.origin.x, this.origin.y, 2, 2); // fill in the pixel at (10,10)
    }
}