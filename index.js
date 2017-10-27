var Game = Engine('stage');

var cursor = Game.cursor;

var width = $(window).width();
var height = $(window).height();

Game.set({
    width: width, // Default: 640px
    height: height, // Default: 480px
    debugMode: true // Default: false
});
Game.preload([
    "./assets/blue.png",
],function() {
    Game.start();
});
Game.setBackdrop("#333");


var cells = [];
var dragging = false;

for(var x=0; x<100; x++) {
    for(var y=0; y<100; y++) {
        
        var cell = Game.createSprite(["./assets/blue.png", "./assets/red.png"]);
        cell.costumeId = 0;
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

    var tmp = cells[0].x;
    if (tmp > 100) {
        for (var x=0; x<cells.length; x++) {
            cells[x].x -= tmp - 100; 
            cells[x].orignX -= tmp - 100;
        }
    }

    var tmp = cells[0].y;
    if (tmp > 100) {
        for (var x=0; x<cells.length; x++) {
            cells[x].y -= tmp - 100; 
            cells[x].orignY -= tmp - 100;
        }
    }

    var tmp = cells[9999].x;
    if (tmp < width-100) {
        for (var x=0; x<cells.length; x++) {
            cells[x].x += width - 100 - tmp; 
            cells[x].orignX += width - 100 - tmp;
        }
    }

    var tmp = cells[9999].y;
    if (tmp < height-100) {
        for (var x=0; x<cells.length; x++) {
            cells[x].y += height - 100 - tmp; 
            cells[x].orignY += height - 100 - tmp;
        }
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

$("#arrow").click(function(){
    $("html, body").animate({scrollTop: $(document).height()}, "slow");
})