<?php
	class Setting
	{
		var $settings = array();
		
		function __construct()
		{
			$this->host = $settings['db']['host'] = '192.168.100.39';
			$this->port = $settings['db']['port'] = '3306';
			$this->name = $settings['db']['name'] = 'update';
			$this->username = $settings['db']['username'] = 'update';
			$this->password = $settings['db']['password'] = 'update';
			$this->charset = $settings['db']['charset'] = 'utf8';
		}
	}
	new Setting();