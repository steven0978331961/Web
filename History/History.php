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
		function FormShow()
		{	
			//new、search
			$query = "SELECT `M_id`, `M_subject`, `M_department`, `M_users`, `M_date`, `M_recoder`, `M_files` FROM `Meetings` WHERE `M_status` = 0 ";
			if(isset($_POST['s_MtName']) != '')
			{
				$query = $query."AND `M_subject` LIKE :s_MtName ";
				$MtName = '%'.$_POST['s_MtName'].'%';
			}
			if(isset($_POST['s_MtStartDate']) != '')
			{
				$query = $query."AND Date(`M_date`) >= STR_TO_DATE(:s_MtStartDate, '%Y-%m-%d') ";
			}
			if(isset($_POST['s_MtEndDate']) != '')
			{
				$query = $query."AND Date(`M_date`) <= STR_TO_DATE(:s_MtEndDate, '%Y-%m-%d') ";
			}
			if(isset($_POST['s_MtDepart']) != '')
			{
				$query = $query."AND `M_department` = :s_MtDepart ";
			}
			$query = $query."ORDER BY `M_createtime` DESC ";
			if($_POST['action'] == "new")
				$query = $query."LIMIT 10";
			$sth = $this->database->prepare($query);
			if(isset($_POST['s_MtName']) != '')
			{
				$sth->bindParam(':s_MtName', $MtName, PDO::PARAM_STR);
			}
			if(isset($_POST['s_MtStartDate']) != '')
			{
				$sth->bindParam(':s_MtStartDate', $_POST['s_MtStartDate'], PDO::PARAM_STR);
			}
			if(isset($_POST['s_MtEndDate']) != '')
			{
				$sth->bindParam(':s_MtEndDate', $_POST['s_MtEndDate'], PDO::PARAM_STR);
			}
			if(isset($_POST['s_MtDepart']) != '')
			{
				$sth->bindParam(':s_MtDepart', $_POST['s_MtDepart'], PDO::PARAM_STR);
			}
			$sth->execute();
			$result = $sth->fetchAll(PDO::FETCH_BOTH);			
			foreach ($result as $row) 
			{
				array_push($this->historys, new history($row['M_id'], $row['M_subject'], $row['M_department'], $row['M_users'],
                           $row['M_date'], $row['M_recoder'], $row['M_files']));
			}
			if(count($result) == 0)
				echo json_encode("nothing");
			else
				echo json_encode($this->historys);
		}
		function Del()
		{
			$query = "UPDATE `Meetings` SET `M_status` = 1 WHERE `M_id` = :M_id";
			$sth = $this->database->prepare($query);
			$sth->bindParam(':M_id', $_POST['M_id'], PDO::PARAM_INT);
			$sth->execute();
			
			$query = "SELECT COUNT(`M_id`) AS CNT FROM `Meetings` WHERE `M_id` = :M_id AND `M_status` = 1";
			$sth = $this->database->prepare($query);
			$sth->bindParam(':M_id', $_POST['M_id'], PDO::PARAM_INT);
			$sth->execute();
			$result = $sth->fetch();
			if($result['CNT'] == 1)
				echo json_encode("DeleteSuccess");
			else
				echo json_encode("DeleteFail");
		}
		function Detail()
		{
			$query = "SELECT `M_subject`, `M_department`, `M_users`, `M_content`, `M_date`, `M_starttime`, `M_endtime`, `M_recoder`, `M_files`, `M_status`, ".
			         "`T_name`, `T_department`, `T_deadline`, `T_coll`, `T_status`, `T_finishdate` ".
					 "FROM `Meetings` LEFT JOIN `Taskprocess` ON `Meetings`.`M_subject` = `T_subject` WHERE `M_id` = :M_id";
			$sth = $this->database->prepare($query);
			$sth->bindParam(':M_id', $_POST['M_id'], PDO::PARAM_INT);
			$sth->execute();
			$result = $sth->fetch();
			if($result == null)
				echo json_encode("DetailFail");
			else
				echo json_encode($result);
		}
	}
	$action = $_POST['action'];
	$mb = new His();
	switch($action)
	{
		case "Search":
		{
			$mb -> FormShow();
			break;	
		}
		case "New":
		{
			$mb -> FormShow();
			break;
		}
		case "Edit":
		{
			echo 'Edit';
			break;
		}
		case "Delete":
		{
			$mb -> Del();
			break;
		}
		case "Detail":
		{
			$mb -> Detail();
			break;
		}
	}