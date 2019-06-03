<?php 
//This file connects to the database and queries information to it
    //Establish connection
    $servername = "209.129.8.7";
    $username = "44085";
    $password = "csc17B44085";
    $dbname = "44085";
    // Make the connection:
    $conn = new mysqli($servername, $username, $password, $dbname);
    // Check connection
    if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
    }
    
    ?>