<?php 
//this function redirects the user to the given url
function redirect_user ($page = 'index.php') {
	
	$url = 'http://' . $_SERVER['HTTP_HOST'] . dirname($_SERVER['PHP_SELF']);
	$url = rtrim($url, '/\\');
	
	$url .= '/' . $page;
	
        console_log('URL = '.$url);
	header("Location: $url");
	exit();
} 
//This function validates the email and password with the database
function check_login($conn, $email = '', $pass = '') {
	$errors = array(); // Initialize error array.
	// Validate the email address:
	if (empty($email)) {
		$errors[] = 'You forgot to enter your email address.';
	} else {
		$e = mysqli_real_escape_string($conn, trim($email));
	}
	// Validate the password:
	if (empty($pass)) {
		$errors[] = 'You forgot to enter your password.';
	} else {
		$p = mysqli_real_escape_string($conn, trim($pass));
	}
	if (empty($errors)) { 
		// Retrieve the user_id and first_name for that email/password combination:
		$q = "SELECT account_id, username FROM tetris_entity_accounts WHERE email='$e' AND password='$p'";		
		$r = @mysqli_query ($conn, $q); // Run the query.
		
		if (mysqli_num_rows($r) == 1) {
			
			$row = mysqli_fetch_array ($r, MYSQLI_ASSOC);
	
			return array(true, $row);
			
		} else { 
			$errors[] = 'The email address and password entered do not match those on file.';
		}
		
	} 
	
	return array(false, $errors);
}
//helper function to log data to console
function console_log( $data ) {
  $output  = "<script>console.log( 'PHP debugger: ";
  $output .= json_encode(print_r($data, true));
  $output .= "' );</script>";
  echo $output;
}
function check_regex($string){
    $re = '((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,20})';
    if(preg_match($re,$string)){
        return true;
    }else{
        return false;
    }
}