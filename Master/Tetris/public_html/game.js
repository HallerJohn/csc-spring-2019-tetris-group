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

function draw(){
    context.fillStyle= '#000';
    context.fillRect(0,0,canvas.width,canvas.height);
    writeField(playerData.field,playerData.position);
}

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

var playerData={
    position: {x:5,y:0},
    field: field
};
function move(axis,dir){
    if(axis==='x')playerData.position.x+=dir;
    else if(axis==='y')playerData.position.y+=dir;
    console.log("X val="+playerData.position.x);
}

updateField();

document.onkeydown=function(event){
    switch(event.keyCode){
        case 37:{
                move('x',-1);
                break;
        }case 39:{
                move('x',1);
                break;
        }case 40:{
                move('y',1);
                break;
        }case 38:{
                move('y',-1);//TESTING ONLY REMOVE BEFORE FINAL GAME!!!!
        }
    }
};
    