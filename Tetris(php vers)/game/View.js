/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//writing the block to the canvas
function writeField(contxt, field, adjust,ghost=0) {
    var contxt=contxt;
    field.forEach((row, y) => {
        row.forEach((value, x) => {
            if(ghost){//if writing for the ghost
                if(value!==0){
                    contxt.fillStyle = 'rgba(255, 255, 255,.20)';//transparent color // Slightly easier to see
                    contxt.fillRect(x + adjust.x, y + adjust.y, 1, 1);
                }
            }
            else if(value!==0){
                switch(value){
                    case 1:{
                            contxt.fillStyle = 'purple';
                            contxt.fillRect(x + adjust.x, y + adjust.y, 1, 1);
                            break;
                    }case 2:{
                            contxt.fillStyle = 'yellow';
                            contxt.fillRect(x + adjust.x, y + adjust.y, 1, 1);
                            break;
                    }case 3:{
                            contxt.fillStyle = 'limegreen';
                            contxt.fillRect(x + adjust.x, y + adjust.y, 1, 1);
                            break;
                    }case 4:{
                            contxt.fillStyle = 'red';
                            contxt.fillRect(x + adjust.x, y + adjust.y, 1, 1);
                            break;
                    }case 5:{
                            contxt.fillStyle = 'blue';
                            contxt.fillRect(x + adjust.x, y + adjust.y, 1, 1);
                            break;
                    }case 6:{
                            contxt.fillStyle = 'orange';
                            contxt.fillRect(x + adjust.x, y + adjust.y, 1, 1);
                            break;
                    }case 7:{
                            contxt.fillStyle = 'cyan';
                            contxt.fillRect(x + adjust.x, y + adjust.y, 1, 1);
                            break;
                    }case -1:{
                            contxt.fillStyle = 'rgba(255, 255, 255,.05)';
                            contxt.fillRect(x + adjust.x, y + adjust.y, 1, 1);
                            break;
                    }
                }
            }
        });
    });
}

function writeNext(){
    nextContext.fillStyle = '#000';
    nextContext.fillRect(0, 0, nextCanvas.width, nextCanvas.height);
    nextContext.fillStyle = "White";
    nextContext.font = "5px impact";
    nextContext.fillText("NEXT", 0, 5);
    writeField(nextContext, fieldAry[1], {x: 3, y: 7});
    writeField(nextContext, fieldAry[2], {x: 3, y: 12});
    writeField(nextContext, fieldAry[3], {x: 3, y: 17});
    
}

function draw() {
    context.fillStyle = '#000';
    context.fillRect(0, 4, canvas.width, canvas.height);
    writeField(context, ghost.field, ghost.position,1);//print ghost block BEFORE real blocks
    writeField(context, matrix, {x: 0, y: 0});//print collision matrix to show blocks that hit bottom
    writeField(context, playerData.field, playerData.position);//print current block being controlled
}

function drawScore(){
    scoreContext.fillStyle = '#000';
    scoreContext.fillRect(0, 0, scoreCanvas.width, scoreCanvas.height);
    scoreContext.fillStyle = "White";
    scoreContext.font = "30px impact";
    scoreContext.fillText("HIGH SCORE", 10, 30);
    scoreContext.fillStyle = "White";
    scoreContext.font = "30px impact";
    scoreContext.fillText(highScore, 10, 60);
    scoreContext.fillStyle = "White";
    scoreContext.font = "30px impact";
    scoreContext.fillText("SCORE", 10, 90);
    scoreContext.fillStyle = "White";
    scoreContext.font = "30px impact";
    scoreContext.fillText(score, 10, 120);
}

function lineF(){
    lineContext.fillStyle = '#000';
    lineContext.fillRect(0, 0, lineCanvas.width, lineCanvas.height);
    lineContext.fillStyle = "White";
    lineContext.font = "600 70px sans-serif";
    lineContext.fillText("LINE - "+line, 5, 90, lineCanvas.width);
}

function drawlevel(){
    levelContext.fillStyle = '#000';
    levelContext.fillRect(0, 0, levelCanvas.width, levelCanvas.height);
    levelContext.fillStyle = "White";
    levelContext.font = "600 50px sans-serif";
    levelContext.fillText("LEVEL ", 80, 50, levelCanvas.width);
    levelContext.fillStyle = "White";
    levelContext.font = "600 50px sans-serif";
    levelContext.fillText(level, 80, 100, levelCanvas.width);
}
function drawstats(){
    statContext.fillStyle = '#000';
    statContext.fillRect(0, 0, statCanvas.width, statCanvas.height);
    statContext.fillStyle = "White";
    statContext.font = "600 20px sans-serif";
    statContext.fillText("STATISTICS ", 100, 22, statCanvas.width);
    statContext.fillStyle = "White";
    statContext.font = "600 15px sans-serif";
    statContext.fillText("T-BLOCK:      "+tCount, 30, 39, statCanvas.width);
    statContext.fillStyle = "White";
    statContext.font = "600 15px sans-serif";
    statContext.fillText("J-BLOCK:      "+jCount, 30, 56, statCanvas.width);
    statContext.fillStyle = "White";
    statContext.font = "600 15px sans-serif";
    statContext.fillText("Z-BLOCK:      "+zCount, 30, 73, statCanvas.width);
    statContext.fillStyle = "White";
    statContext.font = "600 15px sans-serif";
    statContext.fillText("O-BLOCK:      "+oCount, 30, 90, statCanvas.width);
    statContext.fillStyle = "White";
    statContext.font = "600 15px sans-serif";
    statContext.fillText("S-BLOCK:      "+sCount, 30, 107, statCanvas.width);
    statContext.fillStyle = "White";
    statContext.font = "600 15px sans-serif";
    statContext.fillText("L-BLOCK:      "+lCount, 30, 124, statCanvas.width);
    statContext.fillStyle = "White";
    statContext.font = "600 15px sans-serif";
    statContext.fillText("I-BLOCK:      "+iCount, 30, 141, statCanvas.width);
}

function pausetext(pausecounter){
    if(pausecounter===0){
    endContext.font = "100px impact";
    endContext.fillStyle = "White";
    endContext.fillText("  GAME",15,200);
    endContext.fillText("PAUSED",15,300);
    document.getElementById("pause").childNodes[0].nodeValue=
            "Unpause!!";}
    else{
        document.getElementById("pause").childNodes[0].nodeValue=
   "->Pause<-";
    }
}

function gameover(){
    
    endContext.font = "100px impact";
    endContext.fillStyle = "Lightblue";
    endContext.fillText("GAME", 15, 200);
    endContext.fillText("OVER", 110, 300);
    document.getElementById("pause").childNodes[0].nodeValue=
   "restart?";
}
