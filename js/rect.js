class Rect {
    constructor(s) {
        this.origin = new Vector(s.x, s.y);
        this.angle = 0;
        Object.defineProperty(this, "width", {
            writable: false,
            value: s.width
        });
        Object.defineProperty(this, "height", {
            writable: false,
            value: s.height
        });

    }
    //getters pour récupérer les points du rectangle (en prenant en compte sa rotation)
    //
    //  A            B
    //   |----------|
    //   |          |
    //   |          |
    //   |          |
    //   |----------|
    //  D            C

    getCentre(){
        return(new Vector(this.origin.x+this.width/2, this.origin.y+this.height/2));
    }
    getA(){
        var a = this.origin;
        var centre = new Vector(a.x+this.width/2, a.y+this.height/2);

        // translate point to origin
        var tempX = a.x - centre.x;
        var tempY = a.y - centre.y;

        // now apply rotation
        var rotatedX = tempX*Math.cos(this.angle) - tempY*Math.sin(this.angle);
        var rotatedY = tempX*Math.sin(this.angle) + tempY*Math.cos(this.angle);

        // translate back
        var x = rotatedX + centre.x;
        var y = rotatedY + centre.y;
        return new Vector(x, y)
    }
    getB(){
        var b = new Vector(this.origin.x + this.width, this.origin.y);
        var centre = new Vector(b.x+this.width/2, b.y+this.height/2);

        // translate point to origin
        var tempX = b.x - centre.x;
        var tempY = b.y - centre.y;

        // now apply rotation
        var rotatedX = tempX*Math.cos(this.angle) - tempY*Math.sin(this.angle);
        var rotatedY = tempX*Math.sin(this.angle) + tempY*Math.cos(this.angle);

        // translate back
        var x = rotatedX + centre.x;
        var y = rotatedY + centre.y;
        return new Vector(x, y)
    }
    getC(){
        var c = new Vector(this.origin.x + this.width, this.origin.y + this.height);
        var centre = new Vector(c.x+this.width/2, c.y+this.height/2);

        // translate point to origin
        var tempX = c.x - centre.x;
        var tempY = c.y - centre.y;

        // now apply rotation
        var rotatedX = tempX*Math.cos(this.angle) - tempY*Math.sin(this.angle);
        var rotatedY = tempX*Math.sin(this.angle) + tempY*Math.cos(this.angle);

        // translate back
        var x = rotatedX + centre.x;
        var y = rotatedY + centre.y;
        return new Vector(x, y)
    }
    getD(){
        var d = new Vector(this.origin.x, this.origin.y + this.height);
        var centre = new Vector(d.x+this.width/2, d.y+this.height/2);

        // translate point to origin
        var tempX = d.x - centre.x;
        var tempY = d.y - centre.y;

        // now apply rotation
        var rotatedX = tempX*Math.cos(this.angle) - tempY*Math.sin(this.angle);
        var rotatedY = tempX*Math.sin(this.angle) + tempY*Math.cos(this.angle);

        // translate back
        var x = rotatedX + centre.x;
        var y = rotatedY + centre.y;
        return new Vector(x, y)
    }
    //affichage pr debug
    printInfo(){
        console.log("Centre");
        console.log("x : " + this.getCentre().x + " y : " + this.getCentre().y);
        console.log("A");
        console.log("x : " + this.getA().x + " y : " + this.getA().y);
        console.log("B");
        console.log("x : " + this.getB().x + " y : " + this.getB().y);
        console.log("C");
        console.log("x : " + this.getC().x + " y : " + this.getC().y);
        console.log("D");
        console.log("x : " + this.getD().x + " y : " + this.getD().y);
    }

    move(v) {
        this.origin = this.origin.add(v);
    }

    mDiff(r) {
        return new Rect({
            x: r.origin.x - this.origin.x - this.width,
            y : r.origin.y - this.origin.y - this.height,
            width: this.width + r.width,
            height: this.height + r.height
        });

    }

    hasOrigin() {
        return (this.origin.x < 0 && this.origin.x + this.width > 0) &&
            (this.origin.y < 0 && this.origin.y + this.height > 0);
    }
}
