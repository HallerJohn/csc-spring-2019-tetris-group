<?php

session_start();
require('../server/dbConnect.php');

$username = $_SESSION['username'];
$account_id = $_SESSION['account_id'];


$q = "SELECT `tetris_entity_accounts`.`username`, `tetris_entity_leaderboard`.`score` FROM `44085`.`tetris_xref_accounts_leaderboard` AS `tetris_xref_accounts_leaderboard`, `44085`.`tetris_entity_accounts` AS `tetris_entity_accounts`, `44085`.`tetris_entity_leaderboard` AS `tetris_entity_leaderboard` WHERE `tetris_xref_accounts_leaderboard`.`account_id` = $account_id AND `tetris_entity_leaderboard`.`score_id` = `tetris_xref_accounts_leaderboard`.`score_id` ORDER BY `tetris_entity_leaderboard`.`score` DESC LIMIT 10";
$rs = mysqli_query($conn, $q);





?>

<html>
    <head>
        <title>High Scores</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="styleSheet.css">
    </head>
    <body>
        <div class="board">
            <img class="options" src="../pics/tetrisBackGround.jpg" alt="Main Menu Background">
            <img id="hsDB" src="../pics/highscoresmenuDB.jpg" alt="High Scores Display">
            <table id="highScoreC">
                <tr>
                    <th>Username</th>
                    <th>Score</th>
                </tr>
                <?php
                    while($results = mysqli_fetch_array($rs)){
                        echo ('<tr>');
                        echo ('<td>'.$results['username'].'</td>');
                        echo ('<td>'.$results['score'].'</td>');
                        echo('</tr>');
                    }
                ?>
            </table>
        </div>
    </body>
</html>