<?php
class test{

var $settings = array();
		public  $ccc=5;
		function __construct()
		{
			$this->host  = '127.0.0.1';
			
		}
}

class test2 extends test{
public $db=0;
	function __construct()
		{
parent ::__construct();
  $this->db=$this->host;
  echo $this->db;
    }
}
$a= new test2();

//echo $a->db;


?>