<?php

if($_POST){
echo $_POST;




$location = 'C:/xampp/htdocs/uploads/';
if(file_exists($location.$_POST["DeleteFile"]) ){
    echo"檔案為jpeg檔" ;
    unlink($location.$_POST["DeleteFile"]);


}
}

?>