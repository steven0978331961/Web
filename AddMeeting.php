<?php


if($_POST){

//echo $_POST["TaskArray"];
// var_dump( json_decode($_POST["TaskArray"]));

$text = $_POST['content'];
$location = 'C:/xampp/uploads/';



SQLUse_Create();



SQLUse_insert( $_POST["Subject"]
,$_POST["Participate"]
,$_POST['content']
,$_POST["Date"]
,$_POST["StartTime"]
,$_POST["FinalTime"]
,"null"
,$_FILES["file"]["name"]
,$_POST["Department"]
,"0" 
,"0");


$Sp_TaskArray=json_decode($_POST["TaskArray"]);
foreach ($Sp_TaskArray as $key => $value) {
   
    
    SQLUse_insertTask($value[0],"notknow",$value[1],$value[3] ,"0","0",$_POST["Department"]);
}

foreach ($_FILES["file"]["name"] as $Key  =>$KeyValue) {
  //  echo($_FILES['file']['tmp_name'][$Key]);
 // echo($KeyValue);
    move_uploaded_file($_FILES['file']['tmp_name'][$Key],$location . iconv("UTF-8", "big5",$_FILES["file"]["name"][$Key]) )   ;
}




/*
echo $_POST["Date"];echo "<br/>";
echo $_POST["StartTime"];echo "<br/>";
echo $_POST["FinalTime"];echo "<br/>";
echo $_POST["Participate"];echo "<br/>";

echo $_POST["Department"];echo "<br/>";
//echo $_POST["file"][0]["error"];echo "<br/>";
echo $_POST["WorkName"];echo "<br/>";
echo $_POST["DateLine"];echo "<br/>";
echo $_POST["WorkPeople"];echo "<br/>";
echo $_POST["State"];echo "<br/>";

*/

//echo "檔案名稱: " . $_FILES["file"]["name"]."<br/>";
//echo "檔案名稱: " . $_FILES["file"]["tmp_name"]."<br/>";








/*
if ($_FILES["file"]["name"] > 0){

move_uploaded_file($tmp_name,$location . $name ) ;

}*/



}




function SQLUse_Create(){


 $SeverName="localhost";
 $DbName="test";
 $UserName="root";
 $PassWord="0000";

 try{
 	 $Connect=new PDO("mysql:host=$SeverName;dbname=$DbName",$UserName);
	 $Connect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
 	
 	$CreateTable1="CREATE TABLE IF NOT EXISTS Meetings(M_id  INT(5) UNSIGNED AUTO_INCREMENT PRIMARY KEY
 	,M_subjuct VARCHAR(10)NOT NULL
 	,M_users VARCHAR(50)NOT NULL
 	,M_content  Text NOT NULL
 	,M_date  Date NOT NULL
 	,M_starttime TIME NOT NULL
 	,M_endtime  TIME NOT NULL
 	,M_recoder VARCHAR(50)NOT NULL
 	,M_files VARCHAR(100)NOT NULL
 	,M_department VARCHAR(20)NOT NULL
 	,M_createTime TIME NOT NULL
 	,M_status INT(1) NOT NULL
 	,reg_date TIMESTAMP
 	 )";

 	 $CreateTable2="CREATE TABLE IF NOT EXISTS TaskProcess(M_id  INT(5) UNSIGNED AUTO_INCREMENT PRIMARY KEY
 	,T_subect VARCHAR(10)NOT NULL
 	,T_name VARCHAR(50)NOT NULL
 	,T_dateline  DATE NOT NULL
 	,T_coll  VARCHAR(50) NOT NULL
 	,T_status INT(4) NOT NULL
 	,T_finishdate  DATE NOT NULL
 	,T_department VARCHAR(50)NOT NULL

 	,reg_date TIMESTAMP
 	 )";
 	 $Connect->exec($CreateTable1);
 	 $Connect->exec($CreateTable2);
    }
     catch(PDOException $e){
        echo $e ->getMessage();
 }
}


function SQLUse_insert($M_subjuct
,$M_users
,$M_content
,$M_date
,$M_starttime
,$M_endtime
,$M_recoder
,$M_files
,$M_department
,$M_createTime 
,$M_status
){

 $SeverName="localhost";
 $DbName="test";
 $UserName="root";
 $PassWord="0000";




 	 // echo "Connect OK";
 	 // echo"<br/>";

try{
       $Connect=new PDO("mysql:host=$SeverName;dbname=$DbName",$UserName);
       $Connect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        //insert

      	$Insert= $Connect->prepare("INSERT INTO meetings(M_subjuct,M_users,M_content,M_date,M_starttime,M_endtime,M_recoder,M_files
        ,M_department,M_createTime ,M_status)Values(:M_subjuct,:M_users,:M_content,:M_date,:M_starttime,:M_endtime,:M_recoder,:M_files
        ,:M_department,:M_createTime ,:M_status )" );
      	$Insert->bindParam(":M_subjuct",$M_subjuct);

        $Susers= serialize($M_users) ;
      	$Insert->bindParam(":M_users",$Susers);

        $SContent=serialize($M_content);
      	$Insert->bindParam(":M_content",$SContent);
      	$Insert->bindParam(":M_date",$M_date);
      	$Insert->bindParam(":M_starttime",$M_starttime);
      	$Insert->bindParam(":M_endtime",$M_endtime);
      	$Insert->bindParam(":M_recoder",$M_recoder);
        
        $SFile=serialize($M_files);      
      	$Insert->bindParam(":M_files", $SFile ) ;

    

      	$Insert->bindParam(":M_department",$M_department );
      	$Insert->bindParam(":M_createTime",$M_createTime);
      	$Insert->bindParam(":M_status",$M_status);



      	$Insert->execute();

  


 	//$Connect->exec($Insert); 
 	    //echo "Insert OK";
 	  //  echo"<br/>";

 }
 catch(PDOException $e){
        echo $e ->getMessage();
 }
}


function SQLUse_insertTask($T_subect
,$T_name 
,$T_dateline
,$T_coll 
,$T_status
,$T_finishdate
,$T_department
){

 $SeverName="localhost";
 $DbName="test";
 $UserName="root";
 $PassWord="0000";


try{
       $Connect=new PDO("mysql:host=$SeverName;dbname=$DbName",$UserName);
       $Connect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $Insert= $Connect->prepare("INSERT INTO taskprocess(T_subect,T_name,T_dateline,T_coll,T_status,T_finishdate,T_department)
          Values(:T_subect,:T_name,:T_dateline,:T_coll,:T_status,:T_finishdate,:T_department )" );
        $Insert->bindParam(":T_subect",$T_subect);      
        $Insert->bindParam(":T_name",$T_name);      
        $Insert->bindParam(":T_dateline",$T_dateline);
        $ST_coll= serialize($T_coll) ;
        $Insert->bindParam(":T_coll",$ST_coll);
        $Insert->bindParam(":T_status",$T_status);
        $Insert->bindParam(":T_finishdate",$T_finishdate);
        $Insert->bindParam(":T_department",$T_department);
        $Insert->execute();
 }
 catch(PDOException $e){
        echo $e ->getMessage();
 }
}




?>