 <?php
	include_once('settings.php');
	class DB extends Setting
	{
		var $database = null;
		
		function __construct()
		{
			parent ::__construct();
			$dbhost = $this->host;
			$account = $this->username;
			$password = $this->password;
			$dbname = $this->name;
			
			$this->database = new PDO("mysql:host=".$dbhost.";dbname=".$dbname.";charset=utf8", $account, $password);
			if ($this->database)
			{
				//echo "DB connect";
			}
			else
			{
				die("無法連線資料庫伺服器，請聯絡系統管理員");
			}
		}
		function __desturct()
		{
			 unset($this->database);
		}
	}
	new DB();
