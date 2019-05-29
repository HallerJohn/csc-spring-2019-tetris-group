/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var canvas = document.getElementById('tetris');
var scoreCanvas = document.getElementById('score');
var nextCanvas = document.getElementById('next');
var context = canvas.getContext('2d');
var scoreContext = scoreCanvas.getContext('2d');
var nextContext = nextCanvas.getContext('2d');
var lineCanvas = document.getElementById('linesBC');
var lineContext = lineCanvas.getContext('2d');
var levelCanvas = document.getElementById('levelC');
var levelContext = levelCanvas.getContext('2d');
var statCanvas = document.getElementById('statC');
var statContext = statCanvas.getContext('2d');
var endCanvas = document.getElementById('end');
var endContext = endCanvas.getContext('2d');

context.scale(20, 20);
nextContext.scale(20,20);

var audio=document.getElementById("bgm");
audio.volume=0.5;
audio.playbackRate=1.0; // Able to increase speed of song over time

var drop=new Audio(); // Boop Sound for Hard Drop
drop.src = "music/TetrisDrop.mp3";
drop.volume=1;

var playGame=true;
var txf;//used to distinguish from a 3x3 and 4x4
var pos;//used to determine the position of a I Block
var score=0;//used to keep track of score, must be set to zero in new game but save high score later.
var highScore=0; //needs to get its number from data base.
var line=0;//how many lines are deleted
var level=0;
var scoreTetris=0;//used to see if a tetris is scored in a row
var pause=false;//used to determine if the game is paused
var pausecounter=0;//true state
var level = 1;//Used to indicate current speed
var threshold = 0;//Used to increase speed every 500 points

// Counts Tetrominos Dropped (ctrl+shift+J to view terminal)
// ***Minor Bug*** Does not count first block dropped for some reason
var tCount=0;
var iCount=0;
var oCount=0;
var jCount=0;
var lCount=0;
var zCount=0;
var sCount=0;


//These are use to control the drop speed
var fps = 1;//drops per second
var now = Date.now();
var then = Date.now();
var counter =0; // Counts the number of milliseconds up to interval
var interval = 1000 / fps;
var delta;

var fieldAry = new Array;

initField();

function dropField(){
    fieldAry[0]=fieldAry[1];
    fieldAry[1]=fieldAry[2];
    fieldAry[2]=fieldAry[3];
    fieldAry[3]=chooseField();
    if(fieldAry[0].length===4)txf=1;
    else if(fieldAry[0].length===3)txf=0;
    console.log('The block data =');
    console.log(fieldAry[0][0][1]);
    if(fieldAry[0][0][1]===2){
        playerData.square = true;
    }
}

function initField(){
    for(let i=0;i<4;i++){
        fieldAry[i]=chooseField();
    }
    if(fieldAry[0].length===4)txf=1;
    else if(fieldAry[0].length===3)txf=0;
}

var next = {
    position: {x: 5, y: 0}
};

function paused(){
    if(pausecounter===0){
        pausetext(pausecounter);
    }
    if(pausecounter===1){

        endContext.beginPath();    // clear existing drawing paths
        endContext.save();         // store the current transformation matrix

  // Use the identity matrix while clearing the canvas
        endContext.setTransform(1, 0, 0, 1, 0, 0);
        endContext.clearRect(0, 0, endCanvas.width, endCanvas.height);
        endContext.restore();        // restore the transform
        
        pausetext(pausecounter);
    }
    if(pausecounter===0){
        pausecounter=1;
    }
    else{
        pausecounter=0;
    }
    pause=!pause;
    
    if(!playGame){
        window.location.reload();
    }
}

//Starting with the T block but will add more later
//creates a rondom block now but we should rename field to block or part or object
//var field = chooseField();

//chooses a random block to create
function chooseField() {
    var block = Math.floor(Math.random() * 7);
    var field;
    //block=6; //temporal to solve I Bugs
    
    switch (block) {
        case 0: //T-block
            tCount++;
            field = [
                [1, 1, 1],
                [0, 1, 0],
                [0, 0, 0]
            ];
            //txf = 0; this is initialiced in the dropfield function
            break;
        case 1: //O-block
            oCount++;
            field = [
                [0, 2, 2],
                [0, 2, 2],
                [0, 0, 0]
            ];
            //txf=0;
            break;
        case 2: //s-block
            sCount++;
            field = [
                [0, 3, 3],
                [3, 3, 0],
                [0, 0, 0]
            ];
            //txf=0;
            break;
        case 3: //z-block
            zCount++;
            field = [
                [4, 4, 0],
                [0, 4, 4],
                [0, 0, 0]
            ];
            //txf=0;
            break;
        case 4: //J-block
            jCount++;
            field = [
                [0, 0, 5],
                [0, 0, 5],
                [0, 5, 5]
            ];
            //txf=0;
            break;
        case 5: //L-block
            lCount++;
            field = [
                [6, 0, 0],
                [6, 0, 0],
                [6, 6, 0]
            ];
            //txf=0;
            break;
        case 6: //I-block
            iCount++;
            field = [
                [7, 7, 7, 7],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ];
            //txf=1;
            pos=0;
            break;
    }
    
//    console.log("--------------");
//    console.log("T-Blocks:%d\n",tCount);
//    console.log("I-Blocks:%d\n",iCount);
//    console.log("O-Blocks:%d\n",oCount);
//    console.log("L-Blocks:%d\n",lCount);
//    console.log("J-Blocks:%d\n",jCount);
//    console.log("S-Blocks:%d\n",sCount);
//    console.log("Z-Blocks:%d\n",zCount);
//    console.log("--------------");
    return field;
}

function createMatrix(height, width) {//Matrix used to test against player field for collision
    var matrix = [];

    for (let i = 0; i < width; i++) {//fill array with more arrays
        matrix[i] = [];
    }
    for (let i = 0; i < width; i++) {//fill 2d array with 0s
        for (let j = 0; j < height; j++) {
            matrix[i][j] = 0;
        }
    }
    return matrix;
}

function copyData(matrix, playerData) {//copies player position onto collision matrix
    playerData.field.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value) {//if value is non zero
                matrix[y + playerData.position.y][x + playerData.position.x] = value;
            }
        });
    });
}

function collision(matrix, playerData) {//detects collision with walls/blocks
    gameOver(matrix);
    var f = playerData.field;
    var p = playerData.position;
    for (let y = 0; y < f.length; y++) {
        for (let x = 0; x < f[y].length; x++) {
            if (f[y][x] !== 0 && (matrix[y + p.y] && matrix[y + p.y][x + p.x]) !== 0) {//detect if the walls exist or a collision
                return true;
            }
        }
    }
    return false;
}

function updateField() {
        //requestAnimationFrame(updateField);
        now = Date.now(); // Now becomes current time
        delta = now - then; // Get your delta between now and last update
        then = now; // change last update to now

        counter += delta; // Increase counter by the number of milliseconds since last update

        if (counter > interval) { // If counter is greater than current interval
            counter = 0; // Reset counter
            move('y', 1); // Drop block by one
        }
        ghostMove();//update ghost position
        draw();
        writeNext();
        drawScore();
        lineF();
        drawlevel();
        drawstats();
}

var matrix = createMatrix(12, 24);//create the collision matrix

var playerData = {//data for the block the player is controlling and that field
    position: {x: 5, y: 4},
    field: fieldAry[0],
    square: false
};

var ghost = {//ghost block
    position: {x:playerData.position.x, y:playerData.position.y},
    field:fieldAry[0]
};

function move(axis, dir) {//switched back to this move function since the collision matrix already detects sides
    
        if (axis === 'x') {
            playerData.position.x += dir;
            ghostMove();//update ghost position
            if (collision(matrix, playerData)) {//if player hits something on x-axis it will move it back
                playerData.position.x -= dir;
                ghostMove();//update ghost position
            }
        } else if (axis === 'y') {
            playerData.position.y += dir;
            if (collision(matrix, playerData)) {//if player hit something on y-axis
                playerData.position.y--;//move it back up
                copyData(matrix, playerData);//copy to collision matrix
                lineDel(matrix);//check if line needs to be deleted
                reset(matrix);//reset player to the top
            }
        }
}

function reset(matrix) {//resets player position after a block is placed
    drop.play();   
    playerData.square=false;//reset square detector
    
    playerData.position.y = 4;
    alterposition();
    playerData.position.x = 5;
    dropField();
    playerData.field=fieldAry[0];
    //    playerData.field = chooseField(); // choose new block with reset location
}

function alterposition(){// rise the position of new block higher as the rest block approaching to the top border
    var a=6;
    var b=3;
    for (var j = 11; j>=0; j--) {
            if(matrix[a][j]!==0){
                playerData.position.y=b;
                a--;
                b--;
            }
        }
}

function fullDrop() {
        while (!collision(matrix, playerData)) {
             playerData.position.y++;
        }
        playerData.position.y--;
        lineDel(matrix);//check if line needs to be deleted
}

function ghostMove(){
        ghost.position.y=playerData.position.y;//reset ghost to top
        ghost.position.x=playerData.position.x;//reset ghost to x pos of player
        ghost.field=playerData.field;//reset block position
        while(!collision(matrix,ghost)){
            ghost.position.y++;//move ghost down until collision
        }
        ghost.position.y--;//move ghost back up from collision
}


function Arotate(dir) {//this is a function for collision during rotating
    if(!playerData.square){
        if(txf===0){
            rotate(dir);//normal rotation
            //moving the block to check if it is posible the rotation
            if (collision(matrix, playerData)) {//if a collsion happens after rotating
                move('x',dir);  //try to move the block to rotate 
                if (collision(matrix, playerData)) {//if a collsion happens after moving
                    move('x',-dir); //try to  move in other direction to rotate
                    if(collision(matrix,playerData))
                       rotate(-dir);//rotate it back to make rotating action invalid
                }
            }
        }else if(txf===1){
            rotate(dir);//normal rotation
            //moving the block to check if it is posible the rotation
            if (collision(matrix, playerData)) {//if a collsion happens after rotating
                move('x',dir);          //try to move the block to rotate
                if (collision(matrix, playerData)) {//if a collsion happens after moving
                    move('x',2*dir);     //try to move the block to rotate
                    if(collision(matrix,playerData))
                        move('x',-dir);  //try to move the block to rotate
                        if (collision(matrix, playerData)) {//if a collsion happens after moving
                        move('x',-2*dir);//try to move the block to rotate
                            if(collision(matrix,playerData))//if all cases are invalid
                            rotate(-dir);//rotate it back to make action invalid
                    }
                }
            }
        }
    }
}

function rotate(dir) {
    if(!playerData.square){
        if (dir === 1)    //Clockwise Rotation
        {
            if(txf===0){//rotates if player field is a 3x3
                playerData.field = playerData.field.reverse();

                for (var i = 0; i < 3; i++)
                {
                    for (var j = 0; j < i; j++)
                    {
                        var temp = playerData.field[i][j];
                        playerData.field[i][j] = playerData.field[j][i];
                        playerData.field[j][i] = temp;
                    }
                }
            }
            if(txf===1){ //rotates if player field is 4x4
                switch(pos){
                    case 0: playerData.field=field = [
                                [0, 0, 7, 0],
                                [0, 0, 7, 0],
                                [0, 0, 7, 0],
                                [0, 0, 7, 0]
                            ];
                            pos++;
                            break;
                    case 1: playerData.field=field = [
                                [0, 0, 0, 0],
                                [0, 0, 0, 0],
                                [7, 7, 7, 7],
                                [0, 0, 0, 0]
                            ];
                            pos++;
                            break;
                    case 2: playerData.field=field = [
                                [0, 7, 0, 0],
                                [0, 7, 0, 0],
                                [0, 7, 0, 0],
                                [0, 7, 0, 0]
                            ];
                            pos++;
                            break;
                    case 3: playerData.field=field = [
                                [0, 0, 0, 0],
                                [7, 7, 7, 7],
                                [0, 0, 0, 0],
                                [0, 0, 0, 0]
                            ];
                            pos=0;
                            break;
                }
            }
            //this create trouble with the arotate function
            /*if (collision(matrix, playerData)) {//if there is a collision after rotating
                if (playerData.position.x > 0)
                    playerData.position.x--;//if collision on the right
                else
                    playerData.position.x++;//if collision on the left
            }*/
        } else if (dir === -1)  //Counter-Clockwise
        {
            if(txf===0){//rotate couonterclockwise if 3x3
                playerData.field[0] = playerData.field[0].reverse();
                playerData.field[1] = playerData.field[1].reverse();
                playerData.field[2] = playerData.field[2].reverse();

                for (var i = 0; i < 3; i++)
                {
                    for (var j = 0; j < i; j++)
                    {
                        var temp = playerData.field[i][j];
                        playerData.field[i][j] = playerData.field[j][i];
                        playerData.field[j][i] = temp;
                    }
                }
            }    
            if(txf===1){//rotate counter clockwise if 4x4
                switch(pos){
                    case 0: playerData.field=field = [
                                [0, 7, 0, 0],
                                [0, 7, 0, 0],
                                [0, 7, 0, 0],
                                [0, 7, 0, 0]
                            ];
                            pos=3;
                            break;
                    case 1: playerData.field=field = [
                                [0, 0, 0, 0],
                                [7, 7, 7, 7],
                                [0, 0, 0, 0],
                                [0, 0, 0, 0]
                            ];
                            pos--;
                            break;
                    case 2: playerData.field=field = [
                                [0, 0, 7, 0],
                                [0, 0, 7, 0],
                                [0, 0, 7, 0],
                                [0, 0, 7, 0]
                            ];
                            pos--;
                            break;
                    case 3: playerData.field=field = [
                                [0, 0, 0, 0],
                                [0, 0, 0, 0],
                                [7, 7, 7, 7],
                                [0, 0, 0, 0]
                            ];
                            pos--;
                            break;
                }
            }         

            //this create trouble with the arotate function
            /*if (collision(matrix, playerData)) {//if there is a collision after rotating
                if (playerData.position.x > 0)
                    playerData.position.x--;//if collision on the right
                else
                    playerData.position.x++;//if collision on the left
            }*/
        }
    }
}

//this function determines wich line of array is all 1's and then moves all the
//rest down and then rechecks line
function lineDel(matrix) {
    
    var count = 0;//used to see if row is all 1's
    var fs=0;//determines if any lines were destroyed so that the tetris can be checked
    var scoreMultiplier=0;
    for (var i = 23; i>=0; i--) {
        for (var j = 11; j>=0; j--) {
            if(matrix[i][j]!==0){
                count++; //adds to count to determine if there is 12 ones 
//                 console.log(count);
            }
        }
//         console.log('end of loop');
        if(count>=12){
            scoreMultiplier++;
            line++;
            for (var j = 0; j < 12; j++) {
                for(var k=i;k>0;k--)//must be one less then then array set because there will be nothing to copy at the end
                matrix[k][j] = matrix[k-1][j];
            }
            i++; //reset line to determine if new line is also all 1's
            fs=1;
            increaseSpeed();
        }
        count =0; //reset count for next line
    }
    if(fs>0){//scores based off tetris wiki
        if(scoreMultiplier>=4){
            scoreTetris++;
            if(scoreTetris>1)//determines if this is a second tetris in a row
                score+=(100*scoreMultiplier*3);
            else
                score+=(100*scoreMultiplier*2);
        }
        else{
            score+=(100*scoreMultiplier);
            scoreTetris=0;
        }
    }
//    console.log("Score:%d\n",score);
}

function gameOver(matrix){
    for (var j = 11; j>=0; j--) {
            if(matrix[3][j]!==0){
                playGame=false;
            }
        }
        if(playGame===false){
            gameover();
            pause();
               
        }
}

function increaseSpeed() {
    //Increase fps after reaching a certain score
    if((score / 500) > threshold)
    {
        threshold = score / 1000;
        fps+= 0.25;
        interval = 1000 / fps;
        level++;
    }
}

//updateField();

function game(){
    requestAnimationFrame(game);
    if(!pause){    
        updateField();
    }
}

game();