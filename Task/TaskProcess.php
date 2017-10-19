<?php
	date_default_timezone_set("Asia/Taipei");
	include_once('configs.php');
	
	class TaskProcess
	{
		var $T_subject;
		var $T_name;
		var $T_deadline;
		var $T_coll;
		var $T_stat;
		var $T_status;
		var $T_finishdate;
		var $T_department;
		var $M_recoder;
		
		function __construct($s, $n, $d, $c, $stat, $st, $f, $dp, $M_r)
		{
			$this->T_subject = $s;
			$this->T_name = $n;
			$this->T_deadline = $d;
			$this->T_coll = $c;
			$this->T_stat = $stat;
			$this->T_status = $st;
			$this->T_finishdate = $f;
			$this->T_department = $dp;
			$this->M_recoder = $M_r;
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
			$query = "SELECT `T_subject`, `T_name`, `T_deadline`, `T_coll`, `T_finishdate`, `T_department`, M_recoder, ".
					 '`T_status` AS "T_stat",CASE `T_status` WHEN 0 THEN "進行中" WHEN 1 THEN "完成" WHEN 2 THEN "中止" WHEN 3 THEN "刪除" END AS "T_status" '.
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
			$T_coll = array();			
			foreach ($result as $row) 
			{
				$T_coll = unserialize($row['T_coll']);
				array_push($this->taskp, new TaskProcess($row['T_subject'], $row['T_name'], $row['T_deadline'], $T_coll, $row['T_stat'],
					$row['T_status'], $row['T_finishdate'], $row['T_department'], $row['M_recoder']));
			}
			if(count($result) == 0)
				echo json_encode("nothing");
			else
				echo json_encode($this->taskp);
		}
		function DFS()
		{
			$query = "UPDATE `TaskProcess` SET `T_status` = :T_status WHERE `T_subject` = :T_subject AND `T_name` = :T_name";
			$sth = $this->database->prepare($query);
			$sth->bindParam(':T_status', $_POST['T_st'], PDO::PARAM_INT);
			$sth->bindParam(':T_subject', $_POST['T_subject'], PDO::PARAM_STR);
			$sth->bindParam(':T_name', $_POST['T_name'], PDO::PARAM_STR);
			$sth->execute();
			
			$query = "SELECT COUNT(`T_name`) AS CNT FROM `TaskProcess` WHERE `T_status` = :T_status AND `T_subject` = :T_subject AND `T_name` = :T_name";
			$sth = $this->database->prepare($query);
			$sth->bindParam(':T_status', $_POST['T_st'], PDO::PARAM_INT);
			$sth->bindParam(':T_subject', $_POST['T_subject'], PDO::PARAM_STR);
			$sth->bindParam(':T_name', $_POST['T_name'], PDO::PARAM_STR);
			$sth->execute();
			$result = $sth->fetch();
			if($result['CNT'] == 1)
				echo json_encode("DFSSuccess");
			else
				echo json_encode("DFSFail");
		}
		function Save()
		{
			$Tmp_coll = serialize($_POST['T_coll']);
			$query = "UPDATE `TaskProcess` SET `T_deadline` = :T_deadline, `T_coll` = :T_coll, `T_department` = :T_department, `T_status` = :T_status WHERE `T_subject` = :T_subject AND `T_name` = :T_name";
			$sth = $this->database->prepare($query);	
			$sth->bindParam(':T_deadline', $_POST['T_deadline'], PDO::PARAM_STR);
			$sth->bindParam(':T_coll', $Tmp_coll, PDO::PARAM_STR);
			$sth->bindParam(':T_department', $_POST['T_department'], PDO::PARAM_STR);
			$sth->bindParam(':T_status', $_POST['T_status'], PDO::PARAM_INT);
			$sth->bindParam(':T_subject', $_POST['T_subject'], PDO::PARAM_STR);
			$sth->bindParam(':T_name', $_POST['T_name'], PDO::PARAM_STR);
			$sth->execute();
			
			$query = "SELECT `T_subject`, `T_name`, `T_deadline`, `T_coll`, `T_finishdate`, `T_department`, M_recoder, ".
					 '`T_status` AS "T_stat",CASE `T_status` WHEN 0 THEN "進行中" WHEN 1 THEN "完成" WHEN 2 THEN "中止" WHEN 3 THEN "刪除" END AS "T_status" '.
					 "FROM `Taskprocess` JOIN `Meetings` ON `Taskprocess`.`T_subject` = `Meetings`.`M_subject` ".
					 "WHERE `T_subject` = :T_subject AND `T_name` = :T_name";
			$sth = $this->database->prepare($query);
			$sth->bindParam(':T_subject', $_POST['T_subject'], PDO::PARAM_STR);
			$sth->bindParam(':T_name', $_POST['T_name'], PDO::PARAM_STR);
			$sth->execute();
			$result = $sth->fetchAll(PDO::FETCH_BOTH);
			$T_coll = array();		
			foreach ($result as $row) 
			{
				$T_coll = unserialize($row['T_coll']);
				array_push($this->taskp, new TaskProcess($row['T_subject'], $row['T_name'], $row['T_deadline'], $T_coll, $row['T_stat'],
					$row['T_status'], $row['T_finishdate'], $row['T_department'], $row['M_recoder']));
			}
			if(count($result) == 0)
				echo json_encode("SaveFail");
			else
				echo json_encode($this->taskp);
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
		case "DeleleFinishStop":
		{
			$mb -> DFS();
			break;
		}
		case "Save":
		{
			$mb -> Save();
			break;
		}
	}