<?php
	class Setting
	{
		var $settings = array();
		
		function __construct()
		{
			$this->host = $settings['db']['host'] = 'localhost';
			$this->port = $settings['db']['port'] = '3306';
			$this->name = $settings['db']['name'] = 'test';
			$this->username = $settings['db']['username'] = 'root';
			$this->password = $settings['db']['password'] = '';
			$this->charset = $settings['db']['charset'] = 'utf8';
		}
	}
	new Setting();