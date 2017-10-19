<?php
	date_default_timezone_set("Asia/Taipei");
	include_once('configs.php');
	class edit
	{
		var $M_id;
		var $M_subject;
		var $M_department;
		var $M_users;
		var $M_content;
		var $M_date;
		var $M_starttime;
		var $M_endtime;
		var $M_recoder;
		var $M_files;
		var $T_name;
		var $T_department;
		var $T_deadline;
		var $T_coll;
		var $T_status;
		var $T_finishdate;
		function __construct($a, $b, $c, $d, $e, $f, $g, $h, $i, $j, $k, $l, $m, $n, $o, $p)
		{
			$this->M_id = $a;
			$this->M_subject = $b;
			$this->M_department = $c;
			$this->M_users = $d;
			$this->M_content = $e;
			$this->M_date = $f;
			$this->M_starttime = $g;
			$this->M_endtime = $h;
			$this->M_recoder = $i;
			$this->M_files = $j;
			$this->T_name = $k;
			$this->T_department = $l;
			$this->T_deadline = $m;
			$this->T_coll = $n;
			$this->T_status = $o;
			$this->T_finishdate = $p;
		}
	}
	class LoadEdit extends DB
	{
		var $edits = array();
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
			$M_users = array();
			$M_content = array();
			$M_files = array();
			$T_coll = array();			
			foreach ($result as $row) 
			{
				$M_users = unserialize($row['M_users']);
				$M_content = unserialize($row['M_content']);
				$M_files = unserialize($row['M_files']);
				$T_coll = unserialize($row['T_coll']);
				array_push($this->edits, new edit($row['M_id'], $row['M_subject'], $row['M_department'], $M_users, $M_content, $row['M_date'], $row['M_starttime'],$row['M_endtime'], $row['M_recoder'], $M_files, $row['T_name'], $row['T_department'], $row['T_deadline'],$T_coll, $row['T_status'], $row['T_finishdate']));
			}
			if(count($result) == 0)
				echo "nodata";
			else
				echo json_encode($this->edits);
		}
		function Remark()
		{
			$query = "UPDATE `Meetings` SET `M_status` = 0 WHERE `M_id` = :M_id";
			$sth = $this->database->prepare($query);
			$sth->bindParam(':M_id', $_POST['id'], PDO::PARAM_INT);
			$sth->execute();
			
			$query = "SELECT COUNT(`M_id`) AS CNT FROM `Meetings` WHERE `M_id` = :M_id AND `M_status` = 0";
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