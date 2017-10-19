
var Store_MeetingPelple=[];
var Store_HelperPoeple=[];
var File_Name=[];
var File_Name_Array=[];
TaskArray= new Array();
document.write("<script src='LoadEdit.js'></script>");
document.write("<script src='ckeditor/ckeditor.js'></script>");
//document.write("<script src='https://cdn.ckeditor.com/ckeditor5/1.0.0-alpha.1/inline/ckeditor.js'></script>");

function Add_Plugin(){	
	CKEDITOR.replace( 'content', {width:700, height:300  });
}




function Open_ChildWindows(URL){
	Childw=window.open(URL, 'People', config='height=500,width=500');

}

/*
function Print_MeetingPeople(Store_Name){
	//console.log(Store_Name);
	console.log(Store_MeetingPelple);
    if(Store_Name.length>0){
	    for(i=0;i< Store_Name.length;i++){
		    if(Store_Name[i].checked==true){
		alert(Store_Name[i].id);
	        }
	
	    }
    }
}
*/


function Load_People(Store_Id){
	var MeetingPeople=document.getElementsByName("MeetingPeople");

	switch (Store_Id){
	case 1 :
	    Load_Data=window.opener.Store_MeetingPelple;
	   	break;
	case 2:
	    Load_Data=window.opener.Store_HelperPoeple;
	break;
    }

    for(i=0;i< Load_Data.length;i++){
        if(Load_Data[i].checked==true){
		    MeetingPeople[i].checked=true;

	    }
	
	}
}




function Reset_People(Store_Id){
	//console.log(MeetingPeople);
    var Store_Name;

	switch (Store_Id){
	case 1 :
	    var Who_Di=document.getElementById("Who_Di");
	    MeetingPeople=Store_MeetingPelple;
	   	break;
	case 2:
	    var Who_Di=document.getElementById("Who_Di2");
	    MeetingPeople=Store_HelperPoeple;
	break;
    }

    Who_Di.innerHTML="  ";
    for(i=0;i< MeetingPeople.length;i++){
        if(MeetingPeople[i].checked==true){
		     Who_Di.innerHTML+=""+MeetingPeople[i].id+";  ";

	    }
	
	}
}

function PassPeople_ToParent(Store_Id,ArrayName){
  var MeetingPeople=document.getElementsByName(ArrayName);
  switch (Store_Id){
	case 1 :
	    window.opener.Store_MeetingPelple=document.getElementsByName(ArrayName);
	   	break;
	case 2:
	   window.opener.Store_HelperPoeple=document.getElementsByName(ArrayName);

	break;
    }
  
   window.opener.Reset_People(Store_Id);
   window.close();


}





function Summit (){

	///var url = "http://localhost:8080/AddMeeting.php"
	//window.location.href=url +"?a="+TaskArray;


if(checkNull()==true){
  var temp = document.getElementById("AddMeeting");  
    var opt = document.createElement("textarea");
    opt.name = "TaskArray";
    opt.value=JSON.stringify(TaskArray);
    temp.appendChild(opt);


    var opt2 = document.createElement("textarea");
    opt2.name = "Participate";
    opt2.value=JSON.stringify(Store_MeetingPelple);
    temp.appendChild(opt2);


    var opt3 = document.createElement("textarea");
    opt3.name = "FileName";
    opt3.value=JSON.stringify(File_Name);
    temp.appendChild(opt3);
 




	var data =CKEDITOR.instances.content.getData();
	document.getElementById("AddMeeting").submit();
}
	//alert(document.getElementById("Content").innerHTML );

}

function RemoveB(){
	b=document.getElementById("b1");
	b.parentNode.remove(b);

}
function TestT(){
    console.log("gegegg");
}




function TaskPrint(item,index,arr){
	var Table=document.getElementById("Task").insertRow(-1);
	var Table_Id=Table.insertCell(0);
	var Table_Item=Table.insertCell(1);
	var Table_Date=Table.insertCell(2);
	var Table_Coll=Table.insertCell(3);
	var Table_Button=Table.insertCell(4);
	Table_Id.innerHTML=index;
    Table_Item.innerHTML=item[0];
    Table_Date.innerHTML=item[1];
    Table_Coll.innerHTML=item[3];

    Table_Button.innerHTML="<button type='button'  class='w3-btn w3-round-large'   Id="+index+" onclick='DeleteTask(this);'>刪除</button>";


}


function  DealTask(){

	var WorkName=document.getElementById("WorkName").value;
	var DateLine=document.getElementById("DateLine").value;
	var State=document.getElementById("State").value;
	var Who_Di2= document.getElementById("Who_Di2").innerHTML;
	TaskArray.push([WorkName,DateLine,State,Who_Di2]);
    document.getElementById("Task").innerHTML="<tr><th>Id</th><th>項目</th><th>日期</th><th>合作人</th><th>刪除</th></tr>";
    TaskArray.forEach(TaskPrint );   	//alert(TaskArray.length);
 //alert(TaskArray[0][0]);


}

function DeleteTask(myobj){

	var DeleteTaskId=myobj.id;
	if(  DeleteTaskId<TaskArray.length  &&  DeleteTaskId>=0  ){
		TaskArray.splice(DeleteTaskId,1);
		document.getElementById("Task").innerHTML="<tr><th>Id</th><th>項目</th><th>日期</th><th>合作人</th><th>刪除</th></tr>";
	    TaskArray.forEach(TaskPrint ); 
	   
}

}


function  checkNull(){
	if(document.getElementById("Subject").value.length>0  
	     ){
		return true;
	}

return false;

}

function FileChange(){


	var file=document.getElementById("file");
	var File_Update=document.getElementById("File_Update");

document.getElementById("FileDeal").submit();

	//file.outerHTML=file.outerHTML+"<br/>"+"gegseg";
	//file.files.length
	//file.files.splice(0,1);
	/*var file_size=0;
	for( var i=0;i<file.files.length ;i++){
		file_size+=file.files[i].size;

	}

*/

/*
var file2=new Array();
for( var i=0;i<file.files.length ;i++){
	    file2[i]=new Array();
		file2[i]["name"]=file.files[i].name;
		file2[i]["size"]=file.files[i].size;
		file2[i]["tmp_name"]=file.files[i].tmp_name;

	}

    var re = /\.(jpg|png|doc)$/i;


    
    File_Update.innerHTML="已上傳檔案:";


console.log( file.files[0]  );
var a= JSON.stringify(file2);
console.log( JSON.parse(a)   );
	xmlhttp=new XMLHttpRequest();
	xmlhttp.onreadystatechange=function()
  {
  if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
    //File_Update.innerHTML=JSON.parse(xmlhttp.responseText)+"<br/>";

    File_Update.innerHTML=xmlhttp.responseText;
    }
  }
  xmlhttp.open("Post","FileDeal.php",true);
  xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  xmlhttp.send("_FILES['file']="+ file );
*/


}