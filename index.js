var Game = Engine('stage');

var cursor = Game.cursor;

Game.set({
    width: 800, // Default: 640px
    height: 600, // Default: 480px
    debugMode: true // Default: false
});
Game.preload([
    "./assets/cell.png",
],function() {
    Game.start();
});
Game.setBackdrop("#333");


var cells =[];
var dragging = false;

for(var x=0; x<100; x++) {
    for(var y=0; y<100; y++) {
        
        var cell = Game.createSprite("./assets/cell.png");
        cell.scale = 0.2;
        cell.x = 30*x;
        cell.y = 25.9*y;

        // 初始化的位置
        cell.orignX = 30*x;
        cell.orignY = 25.9*y;

        if (y%2 == 0) {
            cell.x += 15;
            cell.orignX += 15;
        }

        cells.push(cell);
    }
}

var pos = {};
Game.when("mousedown", function () {
    dragging = true;
    pos.x = cursor.x;
    pos.y = cursor.y;
});

Game.when("mouseup", function () {
    dragging = false;
    for(var i=0; i<cells.length; i++) {
        cells[i].orignX = cells[i].x;
        cells[i].orignY = cells[i].y;
    }
});


Game.forever(function () {

    if (dragging) {
        offsetX = cursor.x - pos.x;
        offsetY = cursor.y - pos.y;


        for(var i=0; i<cells.length; i++) {
            cells[i].x = cells[i].orignX + offsetX;
            cells[i].y = cells[i].orignY + offsetY;
        }
    }

});