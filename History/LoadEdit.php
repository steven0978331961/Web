<?php
	date_default_timezone_set("Asia/Taipei");
	include_once('config.php');
	
	class history
	{
		var $M_id;
		var $M_subject;
		var $M_department;
		var $M_users;
		var $M_date;
		var $M_recoder;
		var $M_files;
		
		function __construct($i, $s, $dp, $u, $d, $r, $f)
		{
			$this->M_id = $i;
			$this->M_subject = $s;
			$this->M_department = $dp;
			$this->M_users = $u;
			$this->M_date = $d;
			$this->M_recoder = $r;
			$this->M_files = $f;
		}
	}
	class His extends DB
	{
		var $historys = array();
		function __construct()
		{
			parent ::__construct();
		}
		function getEdit()
		{	
			$query = "SELECT * FROM `Meetings` WHERE `M_id` = :M_id AND `M_status` = 1";
			$sth = $this->database->prepare($query);
			$sth->bindParam(':M_id', $_POST['M_id'], PDO::PARAM_INT);
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
	$mb = new His();
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