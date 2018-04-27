var init = function () {
    window.game = new Game(document.getElementById('canvasJeu'),document.getElementById('canvasDecor'));
};

window.addEventListener("load", init);
