<?php


if($_GET){
	echo json_decode( $_GET["a"]);
	echo "Yes";
//foreach ($_GET["a"] as $key => $value) {
  
//}



}


if($_POST){

 // if(!empty($_POST["a"]==2) ){ echo $_POST["a"]; }
  /*
echo "YES";

	if(!empty($_POST["Name"])){echo "ID:".$_POST["Name"]."<br />";}else{echo "No Id<br />";} echo "<p>";
	if(!empty($_POST["Phone"])  ){echo "Phone:" .$_POST["Phone"]. "<br/>";} else {echo "NO Phone<br/>";} echo"<p>";	
    if(!empty($_POST["Email"])  ){echo "Email:" .$_POST["Email"]. "<br/>";} else {echo "NO Email<br/>";} echo"<p>";
    if(!empty($_POST["Date"])  ){echo "Date:" .$_POST["Date"]. "<br/>";} else {echo "NO Date<br/>";} echo"<p>";
    if(!empty($_POST["Time"])  ){echo "Time:" .$_POST["Time"]. "<br/>";} else {echo "NO Time<br/>";} echo"<p>";
    if(!empty($_POST["Appetizer"])  ){echo "Appetizer:" .$_POST["Appetizer"]. "<br/>";} else {echo "NO Appetizer<br/>";} echo"<p>";
    if(!empty($_POST["Soup"])  ){echo "Soup:" .$_POST["Soup"]. "<br/>";} else {echo "NO Soup<br/>";} echo"<p>";
    if(!empty($_POST["MainCourse"])  ){echo "MainCourse:" .print_r($_POST["MainCourse"]). "<br/>";} else {echo "NO MainCourse<br/>";} echo"<p>";
    if(!empty($_POST["LittleCourse"])  ){echo "LittleCourse:" .print_r($_POST["LittleCourse"]). "<br/>";} else {echo "NO LittleCourse<br/>";} echo"<p>";
    if(!empty($_POST["drink"])  ){echo "drink:" .$_POST["drink"]. "<br/>";} else {echo "NO drink<br/>";} echo"<p>";
    if(!empty($_POST["Spiciness"])  ){echo "Spiciness:" .$_POST["Spiciness"]. "<br/>";} else {echo "NO Spiciness<br/>";} echo"<p>";
    if(!empty($_POST["Color"])  ){echo "Color:" .$_POST["Color"]. "<br/>";} else {echo "NO Color<br/>";} echo"<p>";
    if(!empty($_POST["FoodNumber"])  ){echo "FoodNumber:" .$_POST["FoodNumber"]. "<br/>";} else {echo "NO FoodNumber<br/>";} echo"<p>";
    if(!empty($_POST["Other"])  ){echo "Other:" .$_POST["Other"]. "<br/>";} else {echo "NO Other<br/>";} echo"<p>";
    
    if(!empty($_POST["DeletePeople"])  ){echo "DeletePeople:" .$_POST["DeletePeople"]. "<br/>";} else {echo "NO DeletePeople<br/>";} echo"<p>";

    if(!empty($_POST["SearchPeople"])  ){echo "SearchPeople:" .$_POST["SearchPeople"]. "<br/>";} else {echo "NO SearchPeople<br/>";} echo"<p>";
    if(!empty($_POST["SearchPhone"])  ){echo "SearchPhone:" .$_POST["SearchPhone"]. "<br/>";} else {echo "NO SearchPhone<br/>";} echo"<p>";

    if(!empty($_POST["UpdatePeople"])  ){echo "UpdatePeople:" .$_POST["UpdatePeople"]. "<br/>";} else {echo "NO UpdatePeople<br/>";} echo"<p>";
    if(!empty($_POST["UpdatePhone"])  ){echo "UpdatePhone:" .$_POST["UpdatePhone"]. "<br/>";} else {echo "NO UpdatePhone<br/>";} echo"<p>";
*/
    /*
    SQLUse_insert($_POST["Name"]
    ,$_POST["Phone"]
    ,$_POST["Email"]
    ,$_POST["Date"]
    ,$_POST["Time"]
    ,$_POST["Appetizer"]
    ,$_POST["Soup"]
    ,$_POST["MainCourse"]
    ,$_POST["LittleCourse"]
    ,$_POST["drink"]
    ,$_POST["Spiciness"]
    ,$_POST["Color"]
    ,$_POST["FoodNumber"]
    ,$_POST["Other"]
    );
    */
	//print_r($_POST);



if(!empty($_POST["SearchPeople"])  ){
	SQLUse_Select($_POST["SearchPeople"]);

}


 if(!empty($_POST["DeletePeople"])  ){
   //echo json_encode(Test());
 	SQLUse_Delete($_POST["DeletePeople"]);
    }

 if(!empty($_POST["UpdatePeople"]) && !empty($_POST["UpdatePhone"])  ){
   //echo json_encode(Test());

  SQLUse_Update($_POST["UpdatePeople"],$_POST["UpdatePhone"]);
    }

    //SQLUse_Delete($_POST["DeletePeople"]);
    //SQLUse_Update($_POST["UpdatePeople"],$_POST["UpdatePhone"] );
   // SQLUse_Select($_POST["SearchPeople"]);
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

 try{
 	 $Connect=new PDO("mysql:host=$SeverName;dbname=$DbName",$UserName);
	 $Connect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
 	
 	$CreateTable="CREATE TABLE IF NOT EXISTS Food4(id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY
 	,Name VARCHAR(30)NOT NULL
 	,Phone VARCHAR(30)NOT NULL
 	,Email VARCHAR(40)NOT NULL
 	,Date1 VARCHAR(20)NOT NULL
 	,Time1 VARCHAR(20)NOT NULL
 	,Appetizer VARCHAR(20)NOT NULL
 	,Soup VARCHAR(20)NOT NULL
 	,MainCourse VARBINARY (20)NOT NULL
 	,LittleCourse VARCHAR(20)NOT NULL
 	,drink VARCHAR(20)NOT NULL
 	,Spiciness VARCHAR(20)NOT NULL
 	,Color VARCHAR(20)NOT NULL
 	,FoodNumber INT(20)NOT NULL
 	,Other VARCHAR(100)NOT NULL
 	,reg_date TIMESTAMP
 	 )";
 	 $Connect->exec($CreateTable);
 	 // echo "Connect OK";
 	 // echo"<br/>";



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

function Test(){
	return [["name"=>'123',"num"=>'456'],["name"=>'1234',"num"=>'4567']];
}


function SQLUse_Select($SearchPeople){

 $SeverName="localhost";
 $DbName="test";
 $UserName="root";
 $PassWord="0000";
 try{/*
   $Connect=new PDO("mysql:host=$SeverName;dbname=$DbName",$UserName);
   $Connect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

   $Select=$Connect->query("SELECT Name FROM Food4 WHERE id=4 ");
   　print_r($Select);

*/
$Connect=new PDO("mysql:host=$SeverName;dbname=$DbName",$UserName);
$Connect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
/*
$SQL = 'SELECT Name=:SearchPeople FROM Food4 ';



    foreach ($Connect->query($SQL) as $row) {
        print $row['name'] . "\t";
       
    }
*/
$SQL = 'SELECT Name FROM Food4 WHERE id=:SearchPeople ';
$Select= $Connect->prepare($SQL);
$Select->bindParam("SearchPeople",$SearchPeople);
$Select->execute()  ;

$records = $Select->fetchAll();

    //Specify the col_name
    foreach($records as $record)
    {
        echo $record["Name"];
    }

  //echo ($Select->execute());

  }
   catch(PDOException $e){
        echo $e ->getMessage();
 }


}







function SQLUse_Delete($DeletePeople){

 $SeverName="localhost";
 $DbName="test";
 $UserName="root";
 $PassWord="0000";


 try{

$Connect=new PDO("mysql:host=$SeverName;dbname=$DbName",$UserName);
$Connect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$SQL = 'DELETE  FROM  Food4 WHERE id=:Name ';
$Delete=$Connect->prepare($SQL );
$Delete->bindParam(":Name",$DeletePeople);
$Delete->execute();


  }
   catch(PDOException $e){
        echo $e ->getMessage();
 }

 echo("Delete OK");
 echo("egeg");
}



function SQLUse_Update($UpdatePeople,$UpdatePhone){

 $SeverName="localhost";
 $DbName="test";
 $UserName="root";
 $PassWord="0000";


 try{

$Connect=new PDO("mysql:host=$SeverName;dbname=$DbName",$UserName);
$Connect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$SQL = 'UPDATE  Food4 SET  Phone=:UpdatePhone  WHERE id=:UpdatePeople ';
$Delete=$Connect->prepare($SQL );
$Delete->bindParam(":UpdatePhone",$UpdatePhone);
$Delete->bindParam(":UpdatePeople",$UpdatePeople);
$Delete->execute();


  }
   catch(PDOException $e){
        echo $e ->getMessage();
 }

 echo ("Update  OK");
}






?>