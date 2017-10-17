document.write("<script src='LoadEdit.js'></script>");
var Store_MeetingPelple=[];
var Store_HelperPoeple=[];
TaskArray= new Array();
document.write("<script src='ckeditor/ckeditor.js'></script>");


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

function GetPeople_FromChild( Store_Id,MeetingPeople){
	//console.log(MeetingPeople);
    var Store_Name;

	switch (Store_Id){
	case 1 :
	    var Who_Di=document.getElementById("Who_Di");
	   	break;
	case 2:
	    var Who_Di=document.getElementById("Who_Di2");

	break;
    }

    Who_Di.value="  ";
    for(i=0;i< MeetingPeople.length;i++){
        if(MeetingPeople[i].checked==true){
		     Who_Di.value+=""+MeetingPeople[i].id+";  ";

	    }
	
	}

}



function PassPeople_ToParent(Store_Id,ArrayName) {
    var MeetingPeople=document.getElementsByName(ArrayName);
    window.opener.GetPeople_FromChild(Store_Id,MeetingPeople);
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
	document.getElementById("Task").value+=  "Id:"+index+"   項目:"+item[0]+"   截止日期:"+item[1]+"   參與人:"+item[3]+"\n";
	
}


function  DealTask(){

	var WorkName=document.getElementById("WorkName").value;
	var DateLine=document.getElementById("DateLine").value;
	var State=document.getElementById("State").value;
	var Who_Di2= document.getElementById("Who_Di2").value;
	TaskArray.push([WorkName,DateLine,State,Who_Di2]);
    document.getElementById("Task").value="";
    TaskArray.forEach(TaskPrint );   	//alert(TaskArray.length);
 //alert(TaskArray[0][0]);


}

function DeleteTask(){
	var DeleteTaskId=document.getElementById("DeleteTaskId").value;
	if(  DeleteTaskId<TaskArray.length  &&  DeleteTaskId>=0  ){
		TaskArray.splice(DeleteTaskId,1);
		document.getElementById("Task").value="";
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