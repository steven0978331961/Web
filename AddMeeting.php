<?php
if($_POST){
	
echo $_POST["Subject"];echo "<br/>";
echo $_POST["Date"];echo "<br/>";
echo $_POST["StartTime"];echo "<br/>";
echo $_POST["FinalTime"];echo "<br/>";
echo $_POST["Participate"];echo "<br/>";
echo $_POST["Content"];echo "<br/>";
echo $_POST["Department"];echo "<br/>";
echo $_POST["file"][0];echo "<br/>";
echo $_POST["WorkName"];echo "<br/>";
echo $_POST["DateLine"];echo "<br/>";
echo $_POST["WorkPeople"];echo "<br/>";
echo $_POST["State"];echo "<br/>";
$text = $_POST['content'];
echo $text;
//SQLUse_Create();
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
 	,M_starttime TIMESTAMP NOT NULL
 	,M_endtime  TIMESTAMP NOT NULL
 	,M_recoder VARCHAR(50)NOT NULL
 	,M_files VARCHAR(100)NOT NULL
 	,M_department VARCHAR(20)NOT NULL
 	,M_createTime TIMESTAMP NOT NULL
 	,M_status INT(1) NOT NULL
 	,reg_date TIMESTAMP
 	 )";

 	 $CreateTable2="CREATE TABLE IF NOT EXISTS TaskProcess(M_id  INT(5) UNSIGNED AUTO_INCREMENT PRIMARY KEY
 	,T_subect VARCHAR(10)NOT NULL
 	,T_name VARCHAR(50)NOT NULL
 	,T_deadline  Text NOT NULL
 	,T_coll  Date NOT NULL
 	,T_status TIMESTAMP NOT NULL
 	,T_finishdate  TIMESTAMP NOT NULL
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


function SQLUse_insert($Name
,$Phone
,$Email
,$Date1
,$Time1
,$Appetizer
,$Soup
,$MainCourse
,$LittleCourse
,$drink 
,$Spiciness
,$Color
,$FoodNumber
,$Other){

 $SeverName="localhost";
 $DbName="test";
 $UserName="root";
 $PassWord="0000";




 	 // echo "Connect OK";
 	 // echo"<br/>";

try{

        //insert

      	$Insert= $Connect->prepare("INSERT INTO Food4(Name,Phone,Email,Date1,Time1,Appetizer,Soup,MainCourse,LittleCourse,drink,Spiciness,Color,FoodNumber,Other)Values(:Name,:Phone,:Email,:Date1,:Time1,:Appetizer,:Soup,:MainCourse,:LittleCourse,:drink,:Spiciness,:Color,:FoodNumber,:Other )" );
      	$Insert->bindParam(":Name",$Name);
      	$Insert->bindParam(":Phone",$Phone);
      	$Insert->bindParam(":Email",$Email);
      	$Insert->bindParam(":Date1",$Date1);
      	$Insert->bindParam(":Time1",$Time1);
      	$Insert->bindParam(":Appetizer",$Appetizer);
      	$Insert->bindParam(":Soup",$Soup);
      	$SMainCourse= serialize($MainCourse) ;
      	$Insert->bindParam(":MainCourse", $SMainCourse ) ;

      	$SLittleCourse= serialize($LittleCourse);

      	$Insert->bindParam(":LittleCourse",$SLittleCourse );
      	$Insert->bindParam(":drink",$drink);
      	$Insert->bindParam(":Spiciness",$Spiciness);
      	$Insert->bindParam(":Color",$Color);
      	$Insert->bindParam(":FoodNumber",$FoodNumber);
      	$Insert->bindParam(":Other",$Other);


      	$Insert->execute();

  


 	//$Connect->exec($Insert); 
 	    //echo "Insert OK";
 	  //  echo"<br/>";

 }
 catch(PDOException $e){
        echo $e ->getMessage();
 }
}







?>