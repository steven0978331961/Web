<?php


$location = 'C:/xampp/uploads/';

	//$wantPrint= json_decode($_POST["a"]) ;
	/*for( $i=0;$i<=$wantPrint.count;$i++){
	    echo $wantPrint[i].name;
    }*/

 

foreach ($_FILES["file"]["name"] as $Key  =>$KeyValue) {
  //  echo($_FILES['file']['tmp_name'][$Key]);
 // echo($KeyValue);
    if(move_uploaded_file($_FILES['file']['tmp_name'][$Key],$location . iconv("UTF-8", "big5",$_FILES["file"]["name"][$Key]) ) ){

        echo   (  $_FILES["file"]["name"][$Key]."   檔案上傳完成<br/>");
    } 
    else{
    	echo $_FILES["file"]["name"][$Key]."    檔案上傳失敗";
    } ;
}


    

?>