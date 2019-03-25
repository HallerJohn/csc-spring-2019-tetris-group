/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

const canvas=document.getElementById('tetris');
const context=canvas.getContext('2d');

context.scale(20,20);



//Starting with the T block but will add more later
var field = [
    [0,0,0],
    [1,1,1],
    [0,1,0]
];

function createMatrix(height,width){//Matrix used to test against player field for collision
    var matrix=[];
    
    for(let i=0;i<width;i++){//fill array with more arrays
        matrix[i]=[];
    }
    for(let i=0;i<width;i++){//fill 2d array with 0s
        for(let j=0;j<height;j++){
            matrix[i][j]=0;
        }
    }
    return matrix;
}

function copyData(matrix,playerData){//copies player position onto collision matrix
    playerData.field.forEach((row,y)=>{
        row.forEach((value,x)=>{
           if(value){//if value is non zero
               matrix[y+playerData.position.y][x+playerData.position.x]=value;
           } 
        });
    });
}

function collision(matrix,playerData){//detects collision with walls/blocks
    var f=playerData.field;
    var p=playerData.position;
    for(let y=0;y<f.length;y++){
        for(let x=0;x<f[y].length;x++){
            if(f[y][x]!==0&&(matrix[y+p.y]&&matrix[y+p.y][x+p.x])!==0){//detect if the walls exist or a collision
                return true;
            }
        }
    }
    return false;
}

function draw(){
    context.fillStyle= '#000';
    context.fillRect(0,0,canvas.width,canvas.height);
    writeField(matrix,{x:0,y:0});//print collision matrix to show blocks that hit bottom
    writeField(playerData.field,playerData.position);//print current block being controlled
}

//These are use to control the drop speed
var fps=1;//drops per second
var now;
var then=Date.now();
var interval=1000/fps;
var delta;

function updateField(){
    requestAnimationFrame(updateField);
    now=Date.now();
    delta=now-then;
    if(delta>interval){
        then=now-(delta%interval);
        move('y',1);
    }
    draw();    
}

//writing the block to the canvas
function writeField(field,adjust){
    field.forEach((row,y)=>{
        row.forEach((value,x)=>{
            if(value!==0){
                context.fillStyle='red';
                context.fillRect(x+adjust.x,y+adjust.y,1,1);
            }
        });
    });
}

var matrix=createMatrix(12,20);//create the collision matrix

var playerData={//data for the block the player is controlling and that field
    position: {x:5,y:0},
    field: field
};

 function move(axis,dir){//switched back to this move function since the collision matrix already detects sides
     if(axis==='x'){
         playerData.position.x+=dir;
         if(collision(matrix,playerData)){//if player hits something on x-axis it will move it back
             playerData.position.x-=dir;
             
         }
        }
     else if(axis==='y'){
         playerData.position.y+=dir;
         if(collision(matrix,playerData)){//if player hit something on y-axis
             playerData.position.y--;//move it back up
             copyData(matrix,playerData);//copy to collision matrix
             reset();//reset player to the top
         }
     }
 }
 
 function reset(){//resets player position after a block is placed
     playerData.position.y=0;
     playerData.position.x=5;
     playerData.field = [ // reset the rotation
    [0,0,0],
    [1,1,1],
    [0,1,0]
];
 }
 
 function fullDrop(){
     while(!collision(matrix,playerData)){
         playerData.position.y++;
     }
     playerData.position.y--;
 }

//function move(axis,dir){
//   
//   // Side and Bottom detection does NOT take rotated piece into consideration yet!!
//   
//   if(axis==='x'){
//       // if x position is at one of the walls, only allows movement away
//       if (playerData.position.x!==9&&playerData.position.x!==0)
//           playerData.position.x+=dir;
//       else if (playerData.position.x === 9 && dir ===-1)
//           playerData.position.x+=dir; // Side Detection
//       else if (playerData.position.x === 0 && dir ===1)
//           playerData.position.x+=dir;} // Side Detection
//   
//   else if(axis==='y'){
//       // if y postitoin is at the bottom, stops vertical movement
//       if (playerData.position.y<=16)
//           playerData.position.y+=dir; // Bottom Detection
//   console.log("X val="+playerData.position.x);
//   }
//}

function Arotate(dir){//this is a function for collision during rotating
    rotate(dir);//normal rotation
    if(collision(matrix,playerData)){//if a collsion happens after rotating
        rotate(-dir);//rotate it back to make rotating action invalid
    }
}


function rotate(dir){  
    if(dir === 1)    //Clockwise Rotation
    {
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
    }
    else if(dir === -1)  //Counter-Clockwise
    {
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
    }
}
updateField();

document.onkeydown=function(event){//controls
    switch(event.keyCode){
        case 37:{       //left arrow key
                move('x',-1);
                break;
        }case 39:{      //right arrow key
                move('x',1);
                break;
        }case 40:{      //down arror key
                move('y',1);
                break;
        }case 38:{
                move('y',-1);//TESTING ONLY REMOVE BEFORE FINAL GAME!!!!
                break;
        }case 69:{      //'E' key, Clockwise
                Arotate(1);
                break;
        }case 81:{      //'Q' key, Counter-Clockwise
                Arotate(-1);
                break;
        }case 32:{
                fullDrop();
                break;
        }
    }
};
   
