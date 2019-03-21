<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class Field{
    private $width;
    private $height;
    private $grid=array();
    
    public function Field(){
        $this->width=10;
        $this->height=25;
        for($i=0;$i<$this->height;$i++){
            for($j=0;$j<$this->width;$j++){
                $this->grid[$i][$j]=0;
            }
        }
        $this->display();
    }
    public function display(){
        for($i=0;$i<$this->height;$i++){
            for($j=0;$j<$this->width;$j++){
                if($this->grid[$i][$j]==0){
                    echo "<img src= Images/WhiteTile.png width=25 height=25 />";
                }
            }
            echo ("<br>");
        }
    }
    
    
}