var Game = Engine('stage');
Game.set({
    width: 400, // Default: 640px
    height: 400, // Default: 480px
    debugMode: true // Default: false
});
Game.preload([
    "./assets/cell.png",
],function() {
    Game.start();
});
Game.setBackdrop("#333");
var cell = Game.createSprite("./assets/cell.png");