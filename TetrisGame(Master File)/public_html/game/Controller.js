/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


document.onkeydown = function (event) {//controls
    if(!pause){
        switch (event.keyCode) {
            case 37:
            {       //left arrow key
                event.preventDefault();
                move('x', -1);
                break;
            }case 39:
            {      //right arrow key
                event.preventDefault();
                move('x', 1);
                break;
            }case 40:
            {      //down arror key
                event.preventDefault();
                move('y', 1);
                counter = 0; // If block is lowered, reset interval
                break;
            }case 32:
            {
                event.preventDefault();
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
            }
        }
    }
    switch (event.keyCode){
            case 80:{ // 'P' key, Pause
                paused();
                break;
        }
    }
};