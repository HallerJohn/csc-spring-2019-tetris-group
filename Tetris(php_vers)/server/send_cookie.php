<?php

include ('functions.php');
require ('dbConnect.php');

$score = $_COOKIE['score'];

$q = "INSERT INTO tetris_entity_leaderboard (score) VALUES ('$score')";
mysqli_query($conn, $q);


