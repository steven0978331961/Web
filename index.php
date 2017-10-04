<?php
	if($_POST){
		echo "使用了<font color='red'>post</font>方式傳遞資料,<br />「<font color='red'>網址列</font>」上不會顯示傳遞的資料訊息<br /><br />";
		if(!empty($_POST["user_ID"])){echo "ID:".$_POST["user_ID"]."<br />";}else{echo "No Id<br />";} echo "<p>";
		if(!empty($_POST["user_Name"])){echo "Name:".$_POST["user_Name"]."<br />";}else{echo "No Name<br />";}echo "<p>";
		if(!empty($_POST["user_Gender"])){echo "Gender:".$_POST["user_Gender"]."<br />";}else{echo "No Gender<br />";}echo "<p>";
	    if(!empty($_POST["user_Phone"])){echo "Phone:".$_POST["user_Phone"]."<br />";}else{echo "No Phone<br />";}echo "<p>";
	    if(!empty($_POST["user_Mail"])){echo "Mail:".$_POST["user_Mail"]."<br />";}else{echo "No Mail<br />";}echo "<p>";

		

		echo "<p>";
		print_r($_POST);
		echo "</p>";
	}


//判斷 $_GET 內容
	if($_GET){
		echo "使用了<font color='red'>get</font>方式傳遞資料,請看「<font color='red'>網址列</font>」上顯示的網址內容<br /><br />";
		//if($_GET["user_name"]!=""){echo "姓名:".$_GET["user_Class"]."<br />";}else{echo "無名氏<br />";}
		//if($_GET["user_pass"]!=""){echo "密碼:".$_GET["user_pass"]."<br />";}else{echo "無密碼<br />";}
		
        echo $_GET["value"];
        echo "<p>";
        echo $_GET["Day"];
		echo "<p>";
		var_dump($_GET);
		echo "</p>";
	}


	echo "<p><a href='transPHP.html'>返回</a></p>";
?>