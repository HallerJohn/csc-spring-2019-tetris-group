<?php

session_start();
if($_SERVER['REQUEST_METHOD']=='POST'){
    require('../server/functions.php');
    require('../server/dbConnect.php');
    
    list ($check, $data) = check_login($conn, $_POST['email'], $_POST['password']);
    if($check){
        $_SESSION['account_id'] = $data['account_id'];
        $_SESSION['username'] = $data['username'];
        $_SESSION['agent'] = md5($_SERVER['HTTP_USER_AGENT']);
        
        redirect_user('MainMenu.html');
    }
    mysqli_close($conn);
    
    
}
$page_title = 'Login';




?>
<html>
    <head>
        <title>Start Page</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="styleSheet.css">
    </head>
    <body>
        <div>
            <img id="ssBackground" src="../pics/nintendoStartScreen.jpg" alt="Start Screen">
            <form method="post" action="tetrisStartPage.php">
                Email:<br>
                <input type="text" name ="email" ><br>
                Password:<br>
                <input type="password" name="password" id='password'><br><br>
                <input type="submit" value="Login">
            </form>
            <a href="../server/register.php">
                <img id="startButton" src="../pics/register.jpg" alt="Start Button">
            </a>
        </div>
    </body>
</html>