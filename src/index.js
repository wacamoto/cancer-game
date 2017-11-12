var Game = Engine('stage');
var W = 30;
var H = 30;

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

var origin = [];


for(var y=0; y<W; y++) {
    for(var x=0; x<H; x++) {
        
        var cell = Game.createSprite(["./assets/blue.png", "./assets/red.png"]);
        cell.costumeId = 0;
        cell.scale = 0.6;
        cell.x = 120*x;
        cell.y = 103.6*y;

        // 初始化的位置
        cell.orignX = 120*x;
        cell.orignY = 103.6*y;

        if (y%2 == 0) {
            cell.x += 60;
            cell.orignX += 60;
        }

        cells.push(cell);
    }
}

var o = cells[Math.floor(Math.random()*W*H)];
origin.push(o);

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

    var tmp = cells[899].x;
    if (tmp < width-100) {
        for (var x=0; x<cells.length; x++) {
            cells[x].x += width - 100 - tmp; 
            cells[x].orignX += width - 100 - tmp;
        }
    }

    var tmp = cells[899].y;
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

    for(var i=0; i< origin.length; i++){
        if(origin[i].scale < 2){
            origin[i].scale +=0.005;
        }else{
            origin[i].costumeId = 1;
            var index = cells.indexOf(origin[i]);

            if (origin.indexOf(cells[index+1]) == -1 && Math.random() < 0.001){
                if(cells[index+1]!=undefined) origin.push(cells[index+1]);
            } 
            if (origin.indexOf(cells[index-1]) == -1 && Math.random() < 0.001){
                if(cells[index-1]!=undefined) origin.push(cells[index-1]);
            } 
            if (origin.indexOf(cells[index+W]) == -1 && Math.random() < 0.001){
                if(cells[index+W]!=undefined) origin.push(cells[index+W]);
            } 
            if (origin.indexOf(cells[index-W]) == -1 && Math.random() < 0.001){
                if(cells[index-W]!=undefined) origin.push(cells[index-W]);
            } 
            if (origin.indexOf(cells[index+W+1]) == -1 && Math.random() < 0.001){
                if(cells[index+W+1]!=undefined) origin.push(cells[index+W+1]);
            } 
            if (origin.indexOf(cells[index-W+1]) == -1 && Math.random() < 0.001){
                if(cells[index-W+1]!=undefined) origin.push(cells[index-W+1]);
            }
        }
    }
});