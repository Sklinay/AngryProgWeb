var init = function () {
    window.game = new Game(document.getElementById('canvasJeu'),document.getElementById('canvasDecor'),document.getElementById('canvasAmmo'));
};

window.addEventListener("load", init);
