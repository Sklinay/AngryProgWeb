var init = function () {
    window.game = new Game(document.getElementById('canvasJeu'),document.getElementById('canvasDecor'),document.getElementById('canvasAmmo'), document.getElementById('canvasMenu'));
};

window.addEventListener("load", init);
