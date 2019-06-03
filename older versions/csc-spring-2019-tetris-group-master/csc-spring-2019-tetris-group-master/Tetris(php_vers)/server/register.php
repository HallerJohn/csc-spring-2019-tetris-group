<?php
if($_SERVER['REQUEST_METHOD']=='POST'){
    require ('dbConnect.php');
    $errors = array();
    
    
    //Check if first name was input
    if(empty($_POST['username'])){
        $errors[] = "You did not enter a username";
    } else {
        $username = mysqli_real_escape_string($conn,trim($_POST['username']));
    }
    
    //Check if email address was input
    if(empty($_POST['email'])){
        $errors[] = "You did not enter an email address";
    } else {
        $query = mysqli_query($conn,"SELECT email FROM haller_survey_entity_accounts WHERE email='".$_POST['email']."'");
        if(mysqli_num_rows($query)!=0){
            $errors [] = "That email is associated with another account";
        } else {
            $email = mysqli_real_escape_string($conn,trim($_POST['email']));
        }
    }
    
    //Check if password is empty
    if(empty($_POST['pass1'])){
            $errors[] = 'You did not enter a password.';
        } else {
            if($_POST['pass1']==$_POST['pass2']){
                if(preg_match("((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+]).{6,20})",$_POST['pass1'])){
                    $password = mysqli_real_escape_string($conn,trim($_POST['pass1']));
                }else{
                    $errors[] = "Your password needs one lowercase, one uppercase, one number, one special character, and be between 6-20 characters";
                }
            } else {
                $errors[] = 'Your passwords did not match.';
            }
        }
    
    //if no errors
    if(empty($errors)){
        $query = "INSERT INTO tetris_entity_accounts (email, username, password, registration_date) VALUES ('$email', '$username', '$password', NOW())";
        if ($conn->query($query) === TRUE){
            echo "You have succesfully registered";
        } else {
            echo "error: ".$query . "<br>" . $conn->error;
        }
        mysqli_close($conn);
        exit();
    } else {
        echo '<h1>Error!</h1>'
        . '<p class="error">The following errors occured:<br />';
        foreach($errors as $msg){
            echo " - $msg<br />\n";
        }
        echo '</p><p>Please try again.</p><br /></p>';
    }
    
}
?>

<h1>Register</h1>
<form action="register.php" method="post">
	<p>Username: <input type="text" name="username" size="15" maxlength="20" value="<?php if (isset($_POST['username'])) echo $_POST['username']; ?>" /></p>
	<p>Email Address: <input type="text" name="email" size="20" maxlength="60" value="<?php if (isset($_POST['email'])) echo $_POST['email']; ?>"  /> </p>
	<p>Password: <input type="password" name="pass1" size="10" maxlength="20" value="<?php if (isset($_POST['pass1'])) echo $_POST['pass1']; ?>"  /></p>
	<p>Confirm Password: <input type="password" name="pass2" size="10" maxlength="20" value="<?php if (isset($_POST['pass2'])) echo $_POST['pass2']; ?>"  /></p>
	<p><input type="submit" name="submit" value="Register" /></p>
</form>