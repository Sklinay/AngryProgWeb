class Bird extends Sprite {
    constructor(context, s) {
        s.velocity = Vector.ZERO;
        s.isStatic = false;
        s.x = 0;
        s.y = 0;
        super(context, s)
        this.name = s.name;
        this.amount = s.amount;
        this.speedFactor = s.speedFactor;
        this.damageFactor = s.damageFactor;
        this.texture = s.texture;
    }

    decAmount() {
        this.amount--;
    }

    drawAmmo(x) {
        this.origin = new Vector(x, 0);
        if (!this.image.complete) {
            let _this = this;
            this.image.onload = function () {
                _this.context.drawImage(_this.image, 0, 0, _this.image.width, _this.image.height, _this.origin.x, 0, 30, 30);
            };
        } else {
            this.context.drawImage(this.image, 0, 0, this.image.width, this.image.height, this.origin.x, 0, 30, 30);
        }

        this.context.font = "15px Arial";
        this.context.fillText("x" + this.amount, x + 35, 23);
        //this.context.fillRect(this.origin.x, this.origin.y, this.width, this.height);
    }

}