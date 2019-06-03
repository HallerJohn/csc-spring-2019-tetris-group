<?php

session_start();
include ('functions.php');
require ('dbConnect.php');

$score = $_COOKIE['score'];

$q = "INSERT INTO tetris_entity_leaderboard (score) VALUES ('$score')";
mysqli_query($conn, $q);

setCookie('score','',time() -3600);

$account_id = $_SESSION['account_id'];
$query = "INSERT INTO tetris_xref_accounts_leaderboard (account_id) VALUES ('$account_id')";
mysqli_query($conn, $query);


