<?php

require('../server/dbConnect.php');

$q = "SELECT `tetris_entity_accounts`.`username`, `tetris_entity_leaderboard`.`score` FROM `44085`.`tetris_xref_accounts_leaderboard` AS `tetris_xref_accounts_leaderboard`, `44085`.`tetris_entity_accounts` AS `tetris_entity_accounts`, `44085`.`tetris_entity_leaderboard` AS `tetris_entity_leaderboard` WHERE `tetris_xref_accounts_leaderboard`.`account_id` = `tetris_entity_accounts`.`account_id` AND `tetris_entity_leaderboard`.`score_id` = `tetris_xref_accounts_leaderboard`.`score_id` ORDER BY score DESC LIMIT 10";
$rs = mysqli_query($conn, $q);





?>
<html>
    <head>
        <title>Leader Boards</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="styleSheet.css">
    </head>
    <body>
        <div class="board">
            <img class="options" src="../pics/tetrisBackGround.jpg" alt="Main Menu Background">
            <img id="lbDB" src="../pics/leaderboardsDB.jpg" alt="Leader Board Display">
            <table id="leaderboardC">
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
