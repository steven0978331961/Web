<?php
include_once("Config.php");


///POD操作的封裝
class PODAction{
	var $Config;
	function __construct(){
		 global $Config;
		 $Config=new Config();	
	}

	function Creat_Table($Create_Array){
        global  $Config;
		//echo $Config->host;
		try{
 	        $Connect=new PDO("mysql:host=".$Config->host.";dbname=".$Config->name,$Config->username );
	        $Connect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	        $Connect->exec("set names utf8");
	        $Connect->exec($Create_Array);

	    }
	     catch(PDOException $e){
        echo $e ->getMessage();
         }
	}



	function  Insert_Table($Insert_Prepare,$Insert_Array){
		  global  $Config;
		//echo $Config->host;
		try{
			$Connect=new PDO("mysql:host=".$Config->host.";dbname=".$Config->name,$Config->username );
	        $Connect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	        $Connect->exec("set names utf8");
			$Insert= $Connect->prepare($Insert_Prepare);
			$Insert->execute($Insert_Array);



			}
	     catch(PDOException $e){
        echo $e ->getMessage();
         }




	}








}



?>