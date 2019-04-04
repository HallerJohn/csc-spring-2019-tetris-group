/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');

context.scale(20, 20);

var audio=document.getElementById("bgm");
audio.volume=0.5;
audio.playbackRate=1.0; // Able to increase speed of song over time

var drop=new Audio() // Boop Sound for Hard Drop
drop.src = "music/TetrisDrop.mp3";
drop.volume=1;

//Starting with the T block but will add more later
//creates a rondom block now but we should rename field to block or part or object
var field = chooseField();
var txf;//used to distinguish from a 3x3 and 4x4
var pos;//used to determine the position of a I Block

// Counts Tetrominos Dropped (ctrl+shift+J to view terminal)
// ***Minor Bug*** Does not count first block dropped for some reason
var tCount=0;
var iCount=0;
var oCount=0;
var jCount=0;
var lCount=0;
var zCount=0;
var sCount=0;

//chooses a random block to create
function chooseField() {
    var block = Math.floor(Math.random() * 7);
    var field;
    //block=6; //temporal to solve I Bugs
    
    switch (block) {
        case 0: //T-block
            tCount++;
            field = [
                [0, 0, 0],
                [1, 1, 1],
                [0, 1, 0]
            ];
            txf = 0;
            break;
        case 1: //O-block
            oCount++;
            field = [
                [0, 2, 2],
                [0, 2, 2],
                [0, 0, 0]
            ];
            txf=0;
            break;
        case 2: //s-block
            sCount++;
            field = [
                [0, 3, 3],
                [3, 3, 0],
                [0, 0, 0]
            ];
            txf=0;
            break;
        case 3: //z-block
            zCount++;
            field = [
                [4, 4, 0],
                [0, 4, 4],
                [0, 0, 0]
            ];
            txf=0;
            break;
        case 4: //J-block
            jCount++;
            field = [
                [0, 0, 5],
                [0, 0, 5],
                [0, 5, 5]
            ];
            txf=0;
            break;
        case 5: //L-block
            lCount++;
            field = [
                [6, 0, 0],
                [6, 0, 0],
                [6, 6, 0]
            ];
            txf=0;
            break;
        case 6: //I-block
            iCount++;
            field = [
                [0, 0, 0, 0],
                [7, 7, 7, 7],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ];
            txf=1;
            pos=0;
            break;
    }
    console.log("--------------");
    console.log("T-Blocks:%d\n",tCount);
    console.log("I-Blocks:%d\n",iCount);
    console.log("O-Blocks:%d\n",oCount);
    console.log("L-Blocks:%d\n",lCount);
    console.log("J-Blocks:%d\n",jCount);
    console.log("S-Blocks:%d\n",sCount);
    console.log("Z-Blocks:%d\n",zCount);
    console.log("--------------");
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

function draw() {
    context.fillStyle = '#000';
    context.fillRect(0, 0, canvas.width, canvas.height);
    writeField(matrix, {x: 0, y: 0});//print collision matrix to show blocks that hit bottom
    writeField(playerData.field, playerData.position);//print current block being controlled
    writeField(ghost.field, ghost.position,1);//print ghost block
}

//These are use to control the drop speed
var fps = 1;//drops per second
var now = Date.now();
var then = Date.now();
var counter =0; // Counts the number of milliseconds up to interval
var interval = 1000 / fps;
var delta;

function updateField() {
    requestAnimationFrame(updateField);
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
}

//writing the block to the canvas
function writeField(field, adjust,ghost=0) {
    field.forEach((row, y) => {
        row.forEach((value, x) => {
            if(ghost){//if writing for the ghost
                if(value!==0){
                    context.fillStyle = 'rgba(255, 255, 255,.20)';//transparent color // Slightly easier to see
                    context.fillRect(x + adjust.x, y + adjust.y, 1, 1);
                }
            }
            else if(value!==0){
                switch(value){
                    case 1:{
                            context.fillStyle = 'yellow';
                            context.fillRect(x + adjust.x, y + adjust.y, 1, 1);
                            break;
                    }case 2:{
                            context.fillStyle = 'limegreen';
                            context.fillRect(x + adjust.x, y + adjust.y, 1, 1);
                            break;
                    }case 3:{
                            context.fillStyle = '#4dff4d';
                            context.fillRect(x + adjust.x, y + adjust.y, 1, 1);
                            break;
                    }case 4:{
                            context.fillStyle = 'red';
                            context.fillRect(x + adjust.x, y + adjust.y, 1, 1);
                            break;
                    }case 5:{
                            context.fillStyle = 'blue';
                            context.fillRect(x + adjust.x, y + adjust.y, 1, 1);
                            break;
                    }case 6:{
                            context.fillStyle = 'orange';
                            context.fillRect(x + adjust.x, y + adjust.y, 1, 1);
                            break;
                    }case 7:{
                            context.fillStyle = 'purple';
                            context.fillRect(x + adjust.x, y + adjust.y, 1, 1);
                            break;
                    }case -1:{
                            context.fillStyle = 'rgba(255, 255, 255,.05)';
                            context.fillRect(x + adjust.x, y + adjust.y, 1, 1);
                    }
                }
            }
        });
    });
}

var matrix = createMatrix(12, 20);//create the collision matrix

var playerData = {//data for the block the player is controlling and that field
    position: {x: 5, y: 0},
    field: field
};

var ghost = {//ghost block
    position: {x:playerData.position.x, y:playerData.position.y},
    field:field
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
            reset();//reset player to the top
        }
    }
}

function reset() {//resets player position after a block is placed
    drop.play();
    playerData.position.y = 0;
    playerData.position.x = 5;
    playerData.field = chooseField(); // choose new block with reset location
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

function rotate(dir) {
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

//this function determines wich line of array is all 1's and then moves all the
//rest down and then rechecks line
function lineDel(matrix) {
    var count = 0;//used to see if row is all 1's
    for (var i = 19; i>=0; i--) {
        for (var j = 11; j>=0; j--) {
            if(matrix[i][j]!==0){
                count++; //adds to count to determine if there is 12 ones 
//                 console.log(count);
            }
        }
//         console.log('end of loop');
        if(count>=12){
//             console.log('hi');
            for (var j = 0; j < 12; j++) {
                for(var k=i;k>0;k--)//must be one less then then array set because there will be nothing to copy at the end
                matrix[k][j] = matrix[k-1][j];
            }
            i++; //reset line to determine if new line is also all 1's
        }
        count =0; //reset count for next line
    }
}

updateField();

document.onkeydown = function (event) {//controls
    switch (event.keyCode) {
        case 37:
        {       //left arrow key
            move('x', -1);
            break;
        }case 39:
        {      //right arrow key
            move('x', 1);
            break;
        }case 40:
        {      //down arror key
            move('y', 1);
            counter = 0; // If block is lowered, reset interval
            break;
        }case 38:
        {
            fullDrop();// up arrow for hard drop
            drop.play(); // Boop Sound
            counter = 925; // If hard drop us pressed, force counter to be above interval
            break;
        }case 69:
        {      //'E' key, Clockwise
            Arotate(1);
            break;
        }case 81:
        {      //'Q' key, Counter-Clockwise
            Arotate(-1);
            break;
        }case 32:
        {
            fullDrop();
            break;
        }
    }
}
;
