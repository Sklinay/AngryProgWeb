class Vector {
    constructor(x, y) {
        Object.defineProperty(this, "x", {
            writable: false,
            value: x
        });
        Object.defineProperty(this, "y", {
            writable: false,
            value: y
        });
    }

    add(v) {
        return new Vector(this.x + v.x, this.y + v.y);
    }

    sub(v) {
        return new Vector(this.x - v.x, this.y - v.y);
    }

    mult(k) {
        return new Vector(this.x * k, this.y * k);
    }

    multV(v) {
        return new Vector(this.x * v.x, this.y * v.y);
    }

    dot(v) {
        return this.x * v.x + this.y * v.y;
    }

    norm() {
        return Math.sqrt(this.dot(this));
    }

    normalize() {
        return this.mult(1 / this.norm());
    }

    static get ZERO() {
        return ZERO;
    }

    static get UNIT_X() {
        return UNIT_X;
    }
    static get UNIT_Y() {
        return UNIT_Y;
    }
    static get MINUS_UNIT_X() {
        return MINUS_UNIT_X;
    }
    static get MINUS_UNIT_Y() {
        return MINUS_UNIT_Y;
    }
}

const ZERO = new Vector(0, 0);
const UNIT_X = new Vector(1, 0);
const UNIT_Y = new Vector(0, 1);
const MINUS_UNIT_X = new Vector(-1, 0);
const MINUS_UNIT_Y = new Vector(0, -1);
