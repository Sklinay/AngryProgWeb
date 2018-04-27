class Rect {
    constructor(s) {
        this.origin = new Vector(s.x, s.y);
        Object.defineProperty(this, "width", {
            writable: false,
            value: s.width
        });
        Object.defineProperty(this, "height", {
            writable: false,
            value: s.height
        });

    }
    move(v) {
        this.origin = this.origin.add(v);
    }
    moveAt(x, y) {
        this.origin = new Vector(x, y);
    }
    mDiff(r) {
        return new Rect({
            x: r.origin.x - this.origin.x - this.width,
            y: r.origin.y - this.origin.y - this.height,
            width: this.width + r.width,
            height: this.height + r.height
        });

    }

    hasOrigin() {
        return (this.origin.x < 0 && this.origin.x + this.width > 0) &&
            (this.origin.y < 0 && this.origin.y + this.height > 0);
    }
    
    hasThis(x, y) {
        return (this.origin.x < x && this.origin.x + this.width > x) &&
            (this.origin.y < y && this.origin.y + this.height > y);
    }
}