<?php
//各項設定檔


///伺服器的設定檔
class Config{
	public  $SettingArray=array();

	function __construct(){
		$this->host=$SettingArray['db']['host']='localhost';
		$this->port = $SettingArray['db']['port'] = '3306';
		$this->name = $SettingArray['db']['name'] = 'test';
		$this->username = $SettingArray['db']['username'] = 'root';
		$this->password = $SettingArray['db']['password'] = '0000';
		$this->charset = $SettingArray['db']['charset'] = 'utf8';
		$this->collate=$SettingArray['db']['collate']='utf8mb4_unicode_ci';
	}

}


?>