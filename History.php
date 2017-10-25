<?php session_start(); ?>
<?php
	date_default_timezone_set("Asia/Taipei");
	include_once('configs.php');
	
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
	class det
	{
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
		function __construct($a, $b, $c, $d, $e, $f, $g, $h, $i, $j, $k, $l, $m, $n, $o)
		{
			$this->M_subject = $a;
			$this->M_department = $b;
			$this->M_users = $c;
			$this->M_content = $d;
			$this->M_date = $e;
			$this->M_starttime = $f;
			$this->M_endtime = $g;
			$this->M_recoder = $h;
			$this->M_files = $i;
			$this->T_name = $j;
			$this->T_department = $k;
			$this->T_deadline = $l;
			$this->T_coll = $m;
			$this->T_status = $n;
			$this->T_finishdate = $o;
		}
	}
	class His extends DB
	{
		var $historys = array();
		var $arr_detail = array();
		function __construct()
		{
			parent ::__construct();
		}
		function FormShow()
		{	
			$query = "SELECT `M_id`, `M_subject`, `M_department`, `M_users`, `M_date`, `M_recoder`, `M_files` FROM `Meetings` WHERE `M_status` = 1 ";
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
				$tmp = explode(",", $_POST['s_MtDepart']);
				for($i = 0; $i < count($tmp); $i++)
				{
					$query = $query.'AND `M_department` LIKE :s_MtDepart'.$i.' ';
					$conn = "";
					$tmp[$i] = '%'.$tmp[$i].'%';
				}
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
				$sth->bindParam(':s_MtEndDate', $_POST['s_MtEndDate']);
			}
			if(isset($_POST['s_MtDepart']) != '')
			{
				for($i = 0; $i < count($tmp); $i++)
				{
					$p_depart = ':s_MtDepart'.$i;
					$sth->bindParam($p_depart, $tmp[$i], PDO::PARAM_STR);
				}
			}
			$sth->execute();
			$result = $sth->fetchAll(PDO::FETCH_BOTH);
			$M_users = array();
			$M_files = array();
			foreach ($result as $row) 
			{
				$M_users = unserialize($row['M_users']);
				$M_files = unserialize($row['M_files']);
				array_push($this->historys, new history($row['M_id'], $row['M_subject'], json_decode($row['M_department'], JSON_UNESCAPED_UNICODE), $M_users,
                           $row['M_date'], $row['M_recoder'], $M_files));
			}
			if(count($result) == 0)
				echo json_encode("nothing");
			else
				echo json_encode($this->historys);
		}
		function Del()
		{
			$query = "UPDATE `Meetings` SET `M_status` = 0 WHERE `M_id` = :M_id AND `M_recoder` = :M_recoder";
			$sth = $this->database->prepare($query);
			$sth->bindParam(':M_id', $_POST['M_id'], PDO::PARAM_INT);
			$sth->bindParam(':M_recoder', $_SESSION['U_id'], PDO::PARAM_INT);
			$sth->execute();
			
			$query = "SELECT COUNT(`M_id`) AS CNT FROM `Meetings` WHERE `M_id` = :M_id AND `M_status` = 0";
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
			$query = 'SELECT `M_subject`, `M_department`, `M_users`, `M_content`, `M_date`, `M_starttime`, `M_endtime`, `M_recoder`, `M_files`, `M_status`, '.
			         '`T_name`, `T_department`, `T_deadline`, `T_coll`, CASE `T_status` WHEN 0 THEN "進行中" WHEN 1 THEN "完成" WHEN 2 THEN "中止" WHEN 3 THEN "刪除" END AS "T_status", `T_finishdate` '.
					 'FROM `Meetings` LEFT JOIN `Taskprocess` ON `Meetings`.`M_subject` = `T_subject` WHERE `M_id` = :M_id';
			$sth = $this->database->prepare($query);
			$sth->bindParam(':M_id', $_POST['M_id'], PDO::PARAM_INT);
			$sth->execute();
			$result = $sth->fetchAll(PDO::FETCH_BOTH);
			$M_users = array();
			$M_files = array();
			$T_coll = array();
			$M_content = array();		
			foreach ($result as $row) 
			{
				$M_users = unserialize($row['M_users']);
				$M_files = unserialize($row['M_files']);
				$T_coll = unserialize($row['T_coll']);
				$M_content = unserialize($row['M_content']);
				array_push($this->arr_detail, new det($row['M_subject'], json_decode($row['M_department'], JSON_UNESCAPED_UNICODE), $M_users, $M_content, $row['M_date'], $row['M_starttime'],$row['M_endtime'], $row['M_recoder'], $M_files, $row['T_name'], json_decode($row['T_department'], JSON_UNESCAPED_UNICODE), $row['T_deadline'],$T_coll, $row['T_status'], $row['T_finishdate']));
			}
			if($result == null)
				echo json_encode("DetailFail");
			else
				echo json_encode($this->arr_detail);
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