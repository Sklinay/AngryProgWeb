//classe pour la gestion du decor de fond de niveau
class Decor {
    constructor(game) {
        this.type = "Grass"; //type par défaut
        this.game = game;
        this.canvasDecor = this.game.canvasDecor;
        this.contextDecor = this.game.contextDecor;
        this.decors = [];
    }
    //définit le type de décor (parmi grass, sand, dirt et snow)
    init(type) {
        this.type = type;
        this.background = new Image();
        this.background.src = "ressources/" + this.type + "/" + "background.png";
    }
    //ajoute un objet de décor (touffe d'herbe ou autre)
    addDecor(dataS) {
        dataS.texture = this.type + "/" + dataS.texture;
        this.decors.push(new Sprite(this.game.contextDecor, dataS));
    }
    //dessine le décor
    draw() {
        var ptrn = this.contextDecor.createPattern(this.background, 'repeat'); // Create a pattern with this image, and set it to "repeat".
        this.contextDecor.fillStyle = ptrn;
        this.contextDecor.fillRect(0, 0, this.canvasDecor.width, this.canvasDecor.height);
        this.decors.forEach(function (e) {
            e.draw();
        });
    }
    //met à jour l'affichage
    update() {
        this.clearCanvas();
        let _this = this;
        if (!this.background.complete) {
            this.background.onload = function () {
                _this.draw()
            }
        } else {
            _this.draw();
        }

    }
    //efface le canvas
    clearCanvas() {
        this.contextDecor.clearRect(0, 0, this.canvasDecor.width, this.canvasDecor.height);
    }
}
