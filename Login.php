<?php session_start(); ?>
<?php
	date_default_timezone_set("Asia/Taipei");
	include_once('configs.php');
	class Log extends DB
	{
		function __construct()
		{
			parent ::__construct();
		}
		function FormShow()
		{
			if(isset($_SESSION['U_id']))
				header('Location: Frame.html');
			else
			{
				unset($_SESSION['U_id']);
				unset($_SESSION['U_name']);
				unset($_SESSION['U_department']);
				unset($_SESSION['U_role']);
			}
		}
		function Check()
		{
			$query = 'SELECT count(`U_id`) AS CNT FROM `users` WHERE `U_account` = :ac AND `U_password` = PASSWORD(:pass)';
			$sth = $this->database->prepare($query);
			$sth->bindParam(':ac', $_POST['account'], PDO::PARAM_STR);
			$sth->bindParam(':pass', $_POST['password'], PDO::PARAM_STR);
			$sth->execute();
			$result = $sth->fetch();
			if($result['CNT'] == 1)
				echo true;
			else
				echo "帳號密碼有誤";
		}
		function Login()
		{
			$query = "SELECT `U_id`, `U_name`, `U_department`, `U_role` FROM `users` WHERE `U_account` = :ac AND `U_password` = PASSWORD(:pass)";
			$sth = $this->database->prepare($query);
			$sth->bindParam(':ac', $_POST['account'], PDO::PARAM_STR);
			$sth->bindParam(':pass', $_POST['password'], PDO::PARAM_STR);
			$sth->execute();
			$result = $sth->fetchAll(PDO::FETCH_BOTH);
			if (count($result) == 1)
			{
				$_SESSION['U_id'] = $result[0]['U_id'];
				$_SESSION['U_name'] = $result[0]['U_name'];
				$_SESSION['U_department'] = $result[0]['U_department'];
				$_SESSION['U_role'] = $result[0]['U_role'];
				echo "Frame.html";
			}
			else
				echo "Login.html";
		}
		function Role()
		{
			if(isset($_SESSION['U_id']))
			{
				$role = array("U_id"=>$_SESSION['U_id'],"U_name"=>$_SESSION['U_name'],"U_department"=>$_SESSION['U_department'],"U_role"=>$_SESSION['U_role']);
				echo json_encode($role);
			}
			else
			{
				unset($_SESSION['U_id']);
				unset($_SESSION['U_name']);
				unset($_SESSION['U_department']);
				unset($_SESSION['U_role']);
				echo json_encode("false");
			}	
		}
		function Name()
		{
			$tmp = explode(",",$_POST['name']);
			$name = str_replace(",",'","',implode(',',$tmp));
			$query = 'SELECT `U_id`, `U_name` FROM `users` WHERE `U_id` IN ("'.$name.'")';
			$sth = $this->database->prepare($query);
			$sth->execute();
			$result = $sth->fetchAll(PDO::FETCH_BOTH);
			$arr = array();
			foreach ($result as $row) 
			{
				array_push($arr, $row);
			}
			echo json_encode($arr);
		}
		function Users()
		{
			$query = 'SELECT `U_id`, `U_name` FROM `users` WHERE `U_department` LIKE "%'.$_POST['depart'].'%"';
			$sth = $this->database->prepare($query);
			$sth->execute();
			$result = $sth->fetchAll(PDO::FETCH_BOTH);
			$arr = array();
			foreach ($result as $row) 
			{
				array_push($arr, $row);
			}
			echo json_encode($arr);
		}
	}
	$action = $_POST['action'];
	$mb = new Log();
	switch($action)
	{
		case "formshow":
		{
			$mb -> FormShow();
			break;	
		}
		case "check":
		{
			$mb -> Check();
			break;
		}
		case "login":
		{
			$mb -> Login();
			break;
		}
		case "getrole":
		{
			$mb -> Role();
			break;
		}
		case "getname":
		{
			$mb -> Name();
			break;
		}
		case "getusers":
		{
			$mb -> Users();
			break;
		}
	}
