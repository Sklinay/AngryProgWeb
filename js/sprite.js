//classe d'affichage des body (murs, projectiles, ennemis)
class Sprite extends Body {
    constructor(context, s, type) {
        super(s);
        this.context = context;
        this.type = (type === undefined?"unknown":type);
        this.texture = s.texture;
        this.textureState = (s.textureState === undefined ? 1 : s.textureState);
        this.updateImage(s.texture);
    }
    
    //appelé quand un body subit des dégats, pour mettre à jour son état afin de rendre visible la détérioration
    updateImage(texture) {
        this.imagePath = Constants.ressourcesPath + this.texture + "state" + (this.damageLevel) + ".png";
        this.image = new Image();
        this.image.src = this.imagePath;
    }
    
    //dessine le sprite
    draw() {
        if (!this.image.complete) {
            let _this = this;
            this.image.onload = function () {
                _this.context.drawImage(_this.image, 0, 0, _this.image.width, _this.image.height, _this.origin.x, _this.origin.y, _this.width, _this.height);
            };
        } else {
            this.context.drawImage(this.image, 0, 0, this.image.width, this.image.height, this.origin.x, this.origin.y, this.width, this.height);
        }
    }

}
