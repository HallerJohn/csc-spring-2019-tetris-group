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
                left.play();
                move('x', -1);
                break;
            }case 39:
            {      //right arrow key
                event.preventDefault();
                left.play();
                move('x', 1);
                break;
            }case 40:
            {      //down arror key
                event.preventDefault();
                move('y', 1);
                counter = 0; // If block is lowered, reset interval
                break;
            }case 38:
            {
                event.preventDefault();
                fullDrop();// up arrow for hard drop
                playDrop(); // Boop Sound
                counter = 975; // If hard drop is pressed, force counter to be slightly below interval
                break;
            }case 32:
            {
                event.preventDefault();
                fullDrop();// space bar for kinda hard drop
                playDrop(); // Boop Sound
                counter = 0; // If kinda hard drop is pressed, force counter to be 0 to allow movement
                break;
            }case 69:
            {      //'E' key, Clockwise
                rotateSound.play();
                Arotate(1);
                break;
            }case 81:
            {      //'Q' key, Counter-Clockwise
                rotateSound.play();
                Arotate(-1);
                break;
            }case 83:
            {      //'s' key, hold block
                console.log("pressed s key");
                swapHold();
                break;
            }
        }
    }
    switch (event.keyCode){
        case 80 :{ // 'P' key, Pause
                pauseSound.play();
            paused();
            break;
        }case 27 :{ // 'P' key, Pause
                pauseSound.play();
                paused();
                break;
        }
    }
};
