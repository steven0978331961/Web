<?php
	date_default_timezone_set("Asia/Taipei");
	include_once('config.php');
	
	class TaskProcess
	{
		var $T_subject;
		var $T_name;
		var $T_deadline;
		var $T_coll;
		var $T_status;
		var $T_finishdate;
		var $T_department;
		
		function __construct($s, $n, $d, $c, $st, $f, $dp)
		{
			$this->T_subject = $s;
			$this->T_name = $n;
			$this->T_deadline = $d;
			$this->T_coll = $c;
			$this->T_status = $st;
			$this->T_finishdate = $f;
			$this->T_department = $dp;
		}
	}
	class Task extends DB
	{
		var $taskp = array();
		function __construct()
		{
			parent ::__construct();
		}
		function FormShow()
		{	
			//new、search
			$query = "SELECT `T_subject`, `T_name`, `T_deadline`, `T_coll`, `T_status`, `T_finishdate`, `T_department` ".
					 "FROM `Taskprocess` JOIN `Meetings` ON `Taskprocess`.`T_subject` = `Meetings`.`M_subject` ";
			$conn = "WHERE";
			if(isset($_POST['t_MtName']) != '')
			{
				$query = $query.$conn."AND `T_subject` LIKE :t_MtName ";
				$conn = "";
				$TkName = '%'.$_POST['t_MtName'].'%';
			}
			if(isset($_POST['t_MtStartDate']) != '')
			{
				$query = $query.$conn."AND Date(`M_date`) >= STR_TO_DATE(:t_MtStartDate, '%Y-%m-%d') ";
				$conn = "";
			}
			if(isset($_POST['t_MtEndDate']) != '')
			{
				$query = $query.$conn."AND Date(`M_date`) <= STR_TO_DATE(:t_MtEndDate, '%Y-%m-%d') ";
				$conn = "";
			}
			if(isset($_POST['t_TpName']) != '')
			{
				$query = $query.$conn."AND `T_name` LIKE :t_TpName ";
				$conn = "";
				$TpName = '%'.$_POST['t_TpName'].'%';
			}
			if(isset($_POST['t_TpDepartment']) != '')
			{
				$query = $query.$conn."AND `T_department` = :t_TpDepartment ";
				$conn = "";
			}
			if(isset($_POST['t_TpStatus']) != '')
			{
				$query = $query.$conn."AND `T_status` = :t_TpStatus ";
				$conn = "";
			}	
			$query = $query."ORDER BY `TaskProcess`.`reg_date` DESC ";
			$var = 1;
			$query = str_replace("WHEREAND","WHERE",$query,$var);
			if($_POST['action'] == "new")
				$query = $query."LIMIT 10";
			$sth = $this->database->prepare($query);
			if(isset($_POST['t_MtName']) != '')
			{
				$sth->bindParam(':t_MtName', $TkName, PDO::PARAM_STR);
			}
			if(isset($_POST['t_MtStartDate']) != '')
			{
				$sth->bindParam(':t_MtStartDate', $_POST['t_MtStartDate'], PDO::PARAM_STR);
			}
			if(isset($_POST['t_MtEndDate']) != '')
			{
				$sth->bindParam(':t_MtEndDate', $_POST['t_MtEndDate'], PDO::PARAM_STR);
			}
			if(isset($_POST['t_TpName']) != '')
			{
				$sth->bindParam(':t_TpName', $TpName, PDO::PARAM_STR);
			}
			if(isset($_POST['t_TpDepartment']) != '')
			{
				$sth->bindParam(':t_TpDepartment', $_POST['t_TpDepartment'], PDO::PARAM_STR);
			}
			if(isset($_POST['t_TpStatus']) != '')
			{
				$sth->bindParam(':t_TpStatus', $_POST['t_TpStatus'], PDO::PARAM_INT);
			}
			$sth->execute();
			$result = $sth->fetchAll(PDO::FETCH_BOTH);			
			foreach ($result as $row) 
			{
				array_push($this->taskp, new TaskProcess($row['T_subject'], $row['T_name'], $row['T_deadline'], $row['T_coll'],
														 $row['T_status'], $row['T_finishdate'], $row['T_department']));
			}
			if(count($result) == 0)
				echo json_encode("nothing");
			else
				echo json_encode($this->taskp);
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
	}
	$action = $_POST['action'];
	$mb = new Task();
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