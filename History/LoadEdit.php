<?php
	date_default_timezone_set("Asia/Taipei");
	include_once('config.php');

	class LoadEdit extends DB
	{
		function __construct()
		{
			parent ::__construct();
		}
		function getEdit()
		{	
			$query = "SELECT * FROM `Meetings` LEFT JOIN `Taskprocess` ON `Meetings`.`M_subject` = `Taskprocess`.`T_subject` WHERE `M_id` = :M_id AND `M_status` = 1";
			$sth = $this->database->prepare($query);
			$sth->bindParam(':M_id', $_POST['id'], PDO::PARAM_INT);
			$sth->execute();
			$result = $sth->fetch();
			if(count($result) == 0)
				echo "nodata";
			else
				echo json_encode($result);
		}
		function Remark()
		{
			$query = "UPDATE `Meetings` SET `M_status` = 1 WHERE `M_id` = :M_id";
			$sth = $this->database->prepare($query);
			$sth->bindParam(':M_id', $_POST['id'], PDO::PARAM_INT);
			$sth->execute();
			
			$query = "SELECT COUNT(`M_id`) AS CNT FROM `Meetings` WHERE `M_id` = :M_id AND `M_status` = 1";
			$sth = $this->database->prepare($query);
			$sth->bindParam(':M_id', $_POST['M_id'], PDO::PARAM_INT);
			$sth->execute();
			$result = $sth->fetch();
			if($result['CNT'] == 1)
				echo json_encode("RemarkSuccess");
			else
				echo json_encode("RemarkFail");
		}
	}
	$action = $_POST['action'];
	$mb = new LoadEdit();
	switch($action)
	{
		case "getEdit":
		{
			$mb -> getEdit();
			break;
		}
		case "remark":
		{
			$mb -> Remark();
			break;
		}
	}