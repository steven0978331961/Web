<?php
include_once("PODAction.php");



if($_POST){


//echo $_POST["TaskArray"];
// var_dump( json_decode($_POST["TaskArray"]));

$location = 'C:/xampp/htdocs/uploads/';


if(isset($_FILES['file']['tmp_name'])!=false){
  if(move_uploaded_file($_FILES['file']['tmp_name'],$location . iconv("UTF-8", "big5",$_FILES["file"]["name"]) ) ){
      //print_r($_FILES["file"]["name"]) ;
      global $File_Name;
      $File_Name= $_FILES["file"]["name"]; 
      echo "上傳成功";
    
    } 
}


if(isset($_POST["Subject"])!=false){
  global $File_Name;
  echo $File_Name;
  SQLUse_Create();  
  SQLUse_insert( $_POST["Subject"]
  ,$_POST["Participate"]
  ,$_POST['content']
  ,$_POST["Date"]
  ,$_POST["StartTime"]
  ,$_POST["FinalTime"]
  ,"null"
  ,$_POST["FileName"]
  ,$_POST["Department"]
  ,"0" 
  ,"0");
  echo  "紀錄完成";
}


if( isset($_POST["TaskArray"] )!=false ){
  $Sp_TaskArray=json_decode($_POST["TaskArray"]);
  foreach ($Sp_TaskArray as $key => $value) {    
      SQLUse_insertTask($value[0],"notknow",$value[1],$value[3] ,"0",NULL,$_POST["Department"]);
  }
}
/*foreach ($_FILES["file"]["name"] as $Key  =>$KeyValue) {
  //  echo($_FILES['file']['tmp_name'][$Key]);
 // echo($KeyValue);
    move_uploaded_file($_FILES['file']['tmp_name'][$Key],$location . iconv("UTF-8", "big5",$_FILES["file"]["name"][$Key]) )   ;
}
*/



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
 	
 	$CreateTable1="CREATE TABLE IF NOT EXISTS Meetings(M_id  INT(5) UNSIGNED AUTO_INCREMENT PRIMARY KEY
 	,M_subject VARCHAR(10)  COLLATE utf8mb4_unicode_ci  NOT NULL
 	,M_users VARCHAR(50)  COLLATE utf8mb4_unicode_ci NOT NULL
 	,M_content  Text    COLLATE utf8mb4_unicode_ci NOT NULL
 	,M_date  Date    COLLATE utf8mb4_unicode_ci NOT NULL
 	,M_starttime TIME NOT NULL
 	,M_endtime  TIME NOT NULL
 	,M_recoder VARCHAR(50)    COLLATE utf8mb4_unicode_ci NOT NULL
 	,M_files VARCHAR(100)   COLLATE utf8mb4_unicode_ci NOT NULL
 	,M_department VARCHAR(20)   COLLATE utf8mb4_unicode_ci NOT NULL
 	,M_createTime TIME NOT NULL
 	,M_status INT(1) NOT NULL
 	,reg_date TIMESTAMP
 	 ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='會議紀錄' ";

 	 $CreateTable2="CREATE TABLE IF NOT EXISTS TaskProcess(T_id  INT(5) UNSIGNED AUTO_INCREMENT PRIMARY KEY
 	,T_subject VARCHAR(10)   COLLATE utf8mb4_unicode_ci NOT NULL
 	,T_name VARCHAR(50)   COLLATE utf8mb4_unicode_ci NOT NULL
 	,T_deadline  DATE NOT NULL
 	,T_coll  VARCHAR(50)    COLLATE utf8mb4_unicode_ci NOT NULL  COMMENT '協作者'
 	,T_status INT(4) NOT NULL
 	,T_finishdate  DATE 
 	,T_department VARCHAR(50)NOT NULL

 	,reg_date TIMESTAMP
 	 )";

 $a= new PODAction();
 $a->Creat_Table( $CreateTable1);
 $a->Creat_Table( $CreateTable2);


}


function SQLUse_insert($M_subject
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
){        //insert
        $Prepare="INSERT INTO meetings(M_subject,M_users,M_content,M_date,M_starttime,M_endtime,M_recoder,M_files
        ,M_department,M_createTime ,M_status)Values(:M_subject,:M_users,:M_content,:M_date,:M_starttime,:M_endtime,:M_recoder,:M_files
        ,:M_department,:M_createTime ,:M_status )" ;

        $Susers= serialize($M_users) ;
        $SContent=serialize($M_content);        
        $SFile=serialize($M_files);      

        $Insert_Array=array(
          ":M_subject"=>$M_subject,
          ":M_users"=>$Susers,
          ":M_content"=>$SContent,
          ":M_date"=>$M_date,
          ":M_starttime"=>$M_starttime,
          ":M_endtime"=>$M_endtime,
          ":M_recoder"=>$M_recoder,
          ":M_files"=>$SFile,
          ":M_department"=>$M_department ,
          ":M_createTime"=>$M_createTime,
          ":M_status"=>$M_status
        );

        $a= new PODAction();
        $a->Insert_Table($Prepare,$Insert_Array);


}





function SQLUse_insertTask($T_subject
,$T_name 
,$T_deadline
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

        $Insert= $Connect->prepare("INSERT INTO taskprocess(T_subject,T_name,T_deadline,T_coll,T_status,T_finishdate,T_department)
          Values(:T_subject,:T_name,:T_deadline,:T_coll,:T_status,:T_finishdate,:T_department )" );
        $Insert->bindParam(":T_subject",$T_subject);      
        $Insert->bindParam(":T_name",$T_name);      
        $Insert->bindParam(":T_deadline",$T_deadline);
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