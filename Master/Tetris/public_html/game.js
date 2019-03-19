/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

const canvas=document.getElementById('tetris');
const context=canvas.getContext('2d');

context.scale(20,20);

context.fillstyle= '#000';
context.fillRect(0,0,canvas.width,canvas.height);

//Starting with the T block but will add more later
var field = [
    [0,0,0],
    [1,1,1],
    [0,1,0],
];

//writing the block to the canvas
function writeField(field,adjust){
    field.forEach((row,y)=>{
        row.forEach((value,x)=>{
            if(value!=0){
                context.fillStyle='red';
                context.fillRect(x+adjust.x,y+adjust.y,1,1);
            }
        })
    })
}

var playerData={
    position: {x:5,y:0},
    field: field,
}

writeField(playerData.field,playerData.position);