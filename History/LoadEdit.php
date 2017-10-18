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
			$result = $sth->fetchAll(PDO::FETCH_BOTH);
			$arr = array();
			$M_users = array();	
			$M_content = array();
			$M_files = array();
			foreach ($result as $row) 
			{
				$M_users = unserialize($row['M_users']);
				$M_content = unserialize($row['M_content']);
				$M_files = unserialize($row['M_files']);
				array_push($arr, $row['M_subject'], $row['M_department'], $M_users, $M_content, $row['M_date'], $row['M_starttime'], $row['M_endtime'],
								 $row['M_recoder'], $M_files, $row['T_name'], $row['T_department'], $row['T_deadline'], $row['T_coll'], $row['T_status'], $row['T_finishdate']);
			}
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