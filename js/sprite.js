class Sprite extends Body {

    constructor(context, v, w, h, m, vel) {
        super(v, w, h, m, vel);
        this.context = context;
    }

    draw () {
        this.context.fillStyle = 'black';
        this.context.fillRect(this.origin.x, this.origin.y, this.width, this.height);
    }

}