document.write("<script src='LoadEdit.js'></script>");
document.write("<script src='ckeditor/ckeditor.js'></script>");

var Meeting_ID=new Array();
var Helper_ID=new Array();
var TaskArray= new Array();
var File_Store_Name=new Array();
var User_ID;

var All_People=[['大衛',01],['起停',02],['義傑',03],['於安',04],['欣偉',05],['不想取A',06],['不想取B',07],['不想取C',08],['不想取D',09],['不想取E',10]
,['編輯A',11],['編輯B',12],['編輯C',13],['編輯D',14],['編輯E',15]]



///剛開始載入的函數
function Add_Plugin(){	
	CKEDITOR.replace( 'content', {width:566, height:300  });
	SetTime();

	GetID();

}



//選擇部門更換表單選項
function Change_CheckBox(obj){
	var MeetingPeople_div=document.getElementById("MeetingPeople_div");
	MeetingPeople_div.innerHTML="";
	console.log(obj.value);
	switch(obj.value){
		case "one":
		    for(var i=0;i<5;i++){
		    	if(Check_MeetingId_Repeat(All_People[i][1])==true  )
		    	    MeetingPeople_div.innerHTML+="<input type='checkbox' name='MeetingPeople'  id="+All_People[i][1]+" value="+All_People[i][0]+" onchange='Tick_AddMeeting(this)'  checked='true'>"+All_People[i][0]+"<br/>";
		        else 
		            MeetingPeople_div.innerHTML+="<input type='checkbox' name='MeetingPeople'  id="+All_People[i][1]+" value="+All_People[i][0]+" onchange='Tick_AddMeeting(this)'>"+All_People[i][0]+"<br/>";
  
		    }
		break;
		case "two":
			for(var i=5;i<10;i++){
			    if(Check_MeetingId_Repeat(All_People[i][1])==true  )
		    	    MeetingPeople_div.innerHTML+="<input type='checkbox' name='MeetingPeople'  id="+All_People[i][1]+" value="+All_People[i][0]+" onchange='Tick_AddMeeting(this)'  checked='true'>"+All_People[i][0]+"<br/>";
		        else 
		            MeetingPeople_div.innerHTML+="<input type='checkbox' name='MeetingPeople'  id="+All_People[i][1]+" value="+All_People[i][0]+" onchange='Tick_AddMeeting(this)'>"+All_People[i][0]+"<br/>";
  
			    }
		break ;
		case "three":
			for(var i=10;i<15;i++){
			    if(Check_MeetingId_Repeat(All_People[i][1])==true  )
		    	    MeetingPeople_div.innerHTML+="<input type='checkbox' name='MeetingPeople'  id="+All_People[i][1]+" value="+All_People[i][0]+" onchange='Tick_AddMeeting(this)'  checked='true'>"+All_People[i][0]+"<br/>";
		        else 
		            MeetingPeople_div.innerHTML+="<input type='checkbox' name='MeetingPeople'  id="+All_People[i][1]+" value="+All_People[i][0]+" onchange='Tick_AddMeeting(this)'>"+All_People[i][0]+"<br/>";
  
			    }
		break;
	}



}

//確認參與會議的人之後，判斷有勾選的人是否在參與ID陣列上，如果沒有加上去；並判斷無勾選的人是否在名單上，如果有刪除掉
function Tick_AddMeeting(obj){
console.log(obj.id   );
        if(obj.checked==true && Check_MeetingId_Repeat(obj.id)==false ){
		    Meeting_ID.push(obj.id);
		    //console.log(Check_MeetingId_Repeat("01")    );
	    }
	    else if(obj.checked==false && Check_MeetingId_Repeat(obj.id)==true){
	    	Delete_MeetingPeople(obj.id);
	    }
	    console.log(Meeting_ID);
        Show_Who_Meeting(); 
}


//確認參與會議的人之後，判斷有勾選的人是否在參與ID陣列上，如果沒有加上去；並判斷無勾選的人是否在名單上，如果有刪除掉
function Press_AddMeeting(){
	/*
	var MeetingPeople=document.getElementsByName("MeetingPeople");
    
    for(i=0;i< MeetingPeople.length;i++){
        if(MeetingPeople[i].checked==true && Check_MeetingId_Repeat(MeetingPeople[i].id)==false ){
		    Meeting_ID.push(MeetingPeople[i].id);
		    //console.log(Check_MeetingId_Repeat("01")    );
	    }
	    else if(MeetingPeople[i].checked==false && Check_MeetingId_Repeat(MeetingPeople[i].id)==true){
	    	Delete_MeetingPeople(MeetingPeople[i].id);
	    }
    }
    console.log(Meeting_ID);
    Show_Who_Meeting();    
    */
    $('#MeetingPeople').modal('hide');
}



//把ID從Meeting_ID刪掉
function Delete_MeetingPeople(ID){

	function isEqual(element) {
        return element == ID;
    }

	if(  Meeting_ID.length>0  && Meeting_ID.findIndex(isEqual)!=-1   ){
		Meeting_ID.splice(Meeting_ID.findIndex(isEqual),1)		
	   
    }
}

//把參與者名單的ID和員工名單核對後輸出員工姓名
function Show_Who_Meeting(){
    var Who_Meeting=document.getElementById("Who_Meeting");
    Who_Meeting.innerHTML="";
    for(var i=0;i<Meeting_ID.length;i++){
    	for(var i2=0;i2<All_People.length;i2++){
	    	if(Meeting_ID[i]==All_People[i2][1]){
	    		Who_Meeting.innerHTML+=All_People[i2][0]+";";
	    	}
        }
    }


}

























//選擇部門更換表單選項
function Change_CheckBox2(obj){
	var HelperPeople_div=document.getElementById("HelperPeople_div");
	HelperPeople_div.innerHTML="";
	console.log(obj.value);
	switch(obj.value){
		case "one":
		    for(var i=0;i<5;i++){
		    	if(Check_HelpID_Repeat(All_People[i][1])==true  )
		    	    HelperPeople_div.innerHTML+="<input type='checkbox' name='HelpPeople'  id="+All_People[i][1]+" value="+All_People[i][0]+" onchange='Tick_AddHelper(this)'  checked='true'>"+All_People[i][0]+"<br/>";
		        else 
		            HelperPeople_div.innerHTML+="<input type='checkbox' name='HelpPeople'  id="+All_People[i][1]+" value="+All_People[i][0]+" onchange='Tick_AddHelper(this)'>"+All_People[i][0]+"<br/>";
  
		    }
		break;
		case "two":
			for(var i=5;i<10;i++){
			    if(Check_HelpID_Repeat(All_People[i][1])==true  )
		    	    HelperPeople_div.innerHTML+="<input type='checkbox' name='HelpPeople'  id="+All_People[i][1]+" value="+All_People[i][0]+" onchange='Tick_AddHelper(this)'  checked='true'>"+All_People[i][0]+"<br/>";
		        else 
		            HelperPeople_div.innerHTML+="<input type='checkbox' name='HelpPeople'  id="+All_People[i][1]+" value="+All_People[i][0]+" onchange='Tick_AddHelper(this)'>"+All_People[i][0]+"<br/>";
  
			    }
		break ;
		case "three":
			for(var i=10;i<15;i++){
			    if(Check_HelpID_Repeat(All_People[i][1])==true  )
		    	    HelperPeople_div.innerHTML+="<input type='checkbox' name='HelpPeople'  id="+All_People[i][1]+" value="+All_People[i][0]+" onchange='Tick_AddHelper(this)'  checked='true'>"+All_People[i][0]+"<br/>";
		        else 
		            HelperPeople_div.innerHTML+="<input type='checkbox' name='HelpPeople'  id="+All_People[i][1]+" value="+All_People[i][0]+" onchange='Tick_AddHelper(this)'>"+All_People[i][0]+"<br/>";
  
			    }
		break;
	}



}

//確認參與會議的人之後，判斷有勾選的人是否在參與ID陣列上，如果沒有加上去；並判斷無勾選的人是否在名單上，如果有刪除掉
function Tick_AddHelper(obj){
//console.log(obj.id   );
        if(obj.checked==true &&  Check_HelpID_Repeat(obj.id)==false ){
		    Helper_ID.push(obj.id);
		    //console.log(Check_MeetingId_Repeat("01")    );
	    }
	    else if(obj.checked==false && Check_HelpID_Repeat(obj.id)==true){
	    	Delete_AddHelper(obj.id);
	    }
	    console.log(Helper_ID);
        Show_Who_Help(); 
}



//把ID從Helper_ID刪掉
function Delete_AddHelper(ID){

	function isEqual(element) {
        return element == ID;
    }

	if(  Helper_ID.length>0  && Helper_ID.findIndex(isEqual)!=-1   ){
		Helper_ID.splice(Helper_ID.findIndex(isEqual),1)		
	   
    }
}

//把參與者名單的ID和員工名單核對後輸出員工姓名
function Show_Who_Help(){
    var Who_Help=document.getElementById("Who_Help");
    Who_Help.innerHTML="";
    for(var i=0;i<Helper_ID.length;i++){
    	for(var i2=0;i2<All_People.length;i2++){
	    	if(Helper_ID[i]==All_People[i2][1]){
	    		Who_Help.innerHTML+=All_People[i2][0]+";";
	    	}
        }
    }


}


//確認參與會議的人之後，判斷有勾選的人是否在參與ID陣列上，如果沒有加上去；並判斷無勾選的人是否在名單上，如果有刪除掉
function Press_HelpPeople(){
	/*var HelpPeople=document.getElementsByName("HelpPeople");
	var Who_Help=document.getElementById("Who_Help");
	Who_Help.innerHTML="";
	Helper_ID=[];
    for(i=0;i< HelpPeople.length;i++){
        if(HelpPeople[i].checked==true){
		    Helper_ID.push(HelpPeople[i].id);
		    Who_Help.innerHTML+=""+HelpPeople[i].value+";  ";
	    }
    }*/
    $('#HelpPeople').modal('hide');
}








































function Press_HelpPeople(){
	var HelpPeople=document.getElementsByName("HelpPeople");
	var Who_Help=document.getElementById("Who_Help");
	Who_Help.innerHTML="";
	Helper_ID=[];
    for(i=0;i< HelpPeople.length;i++){
        if(HelpPeople[i].checked==true){
		    Helper_ID.push(HelpPeople[i].id);
		    Who_Help.innerHTML+=""+HelpPeople[i].value+";  ";
	    }
    }
    $('#HelpPeople').modal('hide');
}

function TaskPrint(item,index,arr){
	var Table=document.getElementById("Task").insertRow(-1);
	
	var Table_Item=Table.insertCell(0);
	var Table_Dead=Table.insertCell(1);
	var Table_Coll=Table.insertCell(2);
	var Table_Button=Table.insertCell(3);
	
    Table_Item.innerHTML=item[0];
    Table_Dead.innerHTML=item[1];
    Table_Coll.innerHTML=item[2];

    Table_Button.innerHTML="<button type='button'   id="+item[0] +" onclick='DeleteTask(this);'   class='btn btn-primary'>刪除</button>";


}


function  DealTask(){
	if(  AddTaskCheck() ){

		var WorkName=document.getElementById("WorkName").value;
		var DeadLine=document.getElementById("DeadLine").value;
		var Who_Help= document.getElementById("Who_Help").innerHTML;
		TaskArray.push([WorkName,DeadLine,Who_Help]);
	    document.getElementById("Task").innerHTML="<tr><td  width='30%'>項目</td><td width='15%' >日期</td><td>合作人</td><td  width='15%'>刪除</td></tr>";
	    TaskArray.forEach(TaskPrint );   	

    }

}

///查看有無同名的任務，有的畫找到他把它山掉
function DeleteTask(myobj){
	var DeleteTaskId=myobj.id;
	console.log(myobj.id);

	function isEqual(element) {
    return element[0] == DeleteTaskId;
    }

	if(  TaskArray.length>0  && TaskArray.findIndex(isEqual)!=-1   ){
		TaskArray.splice(TaskArray.findIndex(isEqual),1)
		document.getElementById("Task").innerHTML="<tr><th width='30%'>項目</th><th  width='15%'>日期</th><th>合作人</th><th  width='15%'>刪除</th></tr>";
	    TaskArray.forEach(TaskPrint ); 
	   
    }
}




var i = 0;
var File_ID=0;
var Save_ID=1;

function DeleteFile(myobj){
	var DeleteFileId=myobj.id;
    
for(var i=1;i<$("#show").find('tbody').children(0).length;i++){
	if(DeleteFileId== $("#show").find('tbody').children(0)[i].id ){
		console.log($("#show").find('tbody').children(i)[1].id);
		document.getElementById("show").deleteRow(i);

	}


	 xhr = new XMLHttpRequest();
xhr.open("POST","test.php",true);
xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
xhr.send("DeleteFile="+DeleteFileId);



}


}

// 開啟選擇檔案的對話框，讓使用者可以選擇檔案
function open_file_option() {
document.getElementById("file").click();
}

function Send_FileName(File_Name){
	
  for(var i=0;i<File_Name.length;i++){
   File_Store_Name.push(File_Name[i].name);
   	}

console.log(File_Store_Name);
  
}

// 檔案選擇好之後，會呼叫這個方法
function fileSelected() {
if (checkFilePass()) { // 檢查每一個檔案格式、大小...確認沒問題，才可以上傳
    uploadFile();
}
}

// 檢查檔案格式、大小
function checkFilePass() {
    var files = document.getElementById('file').files;
    
    for (var i = 0; i < files.length; i++) {
        if (files[i].type === 'image/jpeg'|| files[i].type === 'image/png'  ) {
            if (files[i].size > 15 * 1024 * 1024) {
                alert("單一圖片不可以超過 15 MB：" + files[i].name);
                return false;
            }
        } 
        else {
            alert(" 不支持格式：" + files[i].name);
        return false;
        }
    } 
    return true;
}

// 上傳檔案的 "前置作業"
function uploadFile() {
	try {
	    var files = document.getElementById('file').files;
	    for (var i = 0; i < files.length; i++) {
	    	File_ID+=1;
	        var progressNumber = "progressNumber" + File_ID;
	        var serverReturnMessage = "serverReturnMessage" + File_ID;

	        var fileSize = "0 KB";
	        if (files[i].size > 1024 * 1024 * 1024) {
	            fileSize = Math.round(files[i].size / 1024 / 1024 / 1024) + " GB";}
	        else if (files[i].size > 1024 * 1024) {
	            fileSize = Math.round(files[i].size / 1024 / 1024) + " MB";} 
	        else if (files[i].size > 1024) {
	        	fileSize = Math.round(files[i].size / 1024) + " KB";} 
	        else if (files[i].size <= 1024) {
	        	fileSize = files[i].size + " B";
	        }

	    // 上傳之前，先把表格建立好，包含檔案名稱、大小
	    document.getElementById('show').innerHTML 
	    += "<tr id="+ File_ID+ " >"
	    + "<td width='40%'  align=\"center\">" + files[i].name + "</td>"
	    + "<td width='10%' align=\"center\">" + fileSize + "</td>"
	    + "<td width='10%' align=\"center\" id=\"" + progressNumber + "\">waiting...</td>"
	    + "<td align=\"center\" id=\"" + serverReturnMessage + "\"></td>"
	    + "<td width='15%' align=\"center\" ><button type='button' id=" +File_ID+ " onclick='DeleteFile(this);'   class='btn btn-primary'>刪除</button></td>"
	    + "</tr>";
	    }
	    upload(); // 第一次呼叫 upload()
	    } 
	catch (e) {
	    alert('Error : ' + e);
	}
}

// 上傳成功，呼叫這個方法
function uploadComplete(evt) {
    var serverReturnMessage = "serverReturnMessage" + Save_ID;
    Save_ID+=1;
    
     try{
    document.getElementById(serverReturnMessage).innerHTML = evt.target.responseText;}
    catch(e){}

    var files = document.getElementById('file').files;
    i+=1;
    if ((  i) < files.length) {
        upload(); // 遞迴呼叫 upload()，會等待上一個檔案下載好之後，才會下載另一個檔案
    } 
    if(i==files.length){
        console.log(i);
        i=0;
    	Send_FileName(files);


    }
}

function uploadFailed(evt) {
    alert('發生錯誤');
}

function uploadCanceled(evt) {
    alert('取消上傳');
}

// 上傳檔案 (一個時間點只會有一個檔案被上傳)
function upload() {
    var files = document.getElementById('file').files[i];
    console.log(files);
    var progressNumber = 'progressNumber' + Save_ID;
    
    console.log(progressNumber);

	var fd = new FormData();
	fd.append('file', files);
	fd.append('id', document.getElementById('id').value);
	var xhr = new XMLHttpRequest();
	xhr.upload.addEventListener('progress', function (evt) { // 顯示上傳進度
	if (evt.lengthComputable) {
		
	    var percentComplete = Math.round(evt.loaded * 100 / evt.total);
	    try{
	    document.getElementById(progressNumber).innerHTML = percentComplete.toString() + '%';
	    } catch(e){}

	} 
	else {
	    document.getElementById(progressNumber).innerHTML = 'unable to compute';
	}
	}, false);
	xhr.addEventListener("load", uploadComplete, false);
	xhr.addEventListener("error", uploadFailed, false);
	xhr.addEventListener("abort", uploadCanceled, false);
	xhr.open('POST', 'AddMeeting.php', true); // 上傳 URL + 非同步上傳
	xhr.send(fd);
}



function Summit (){

    if(SummitCheck()){
	    var temp = document.getElementById("AddMeeting");  
	    var opt = document.createElement("textarea");
	    opt.name = "TaskArray";
	    opt.value=JSON.stringify(TaskArray);
	    temp.appendChild(opt);

	    var opt2 = document.createElement("textarea");
	    opt2.name = "Meeting_ID";
	    opt2.value=JSON.stringify(Meeting_ID);
	    temp.appendChild(opt2);

	    var opt3 = document.createElement("textarea");
	    opt3.name = "FileName";
	    opt3.value=JSON.stringify(File_Store_Name);
	    temp.appendChild(opt3);
	 



		var data =CKEDITOR.instances.content.getData();
		document.getElementById("AddMeeting").submit();

	//alert(document.getElementById("Content").innerHTML );
    }
}





function GetID(){



xhr = new XMLHttpRequest();
	xhr.onreadystatechange=function()
	  {
	  if (xhr.readyState==4 && xhr.status==200)
	    {
	       console.log(xhr.responseText);
	    }
	  }

xhr.open("POST","AddMeeting.php",true);
xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
xhr.send("User_Quest="+1);

	//xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	//xmlhttp.open("POST","AddMeeting.php",true);
	//xmlhttp.send("a=1");
}







/*從這裡開始是檢查區塊
///////////////////////////////////////
//////////////////////////////////////////////////////////////
*/

//初始日期和時間
function SetTime(){


    //var MeetingDay = document.getElementById("MeetingDay");
    var DeadLine = document.getElementById("DeadLine");



	var d = new Date();
	y=d.getFullYear();
	mo=d.getMonth();
	Da=d.getDate();

	//MeetingDay.innerHTML=""+y+"-"+( (mo+1)<10 ? '0' : '')+(mo+1) +"-"+( (Da+1)<10 ? '0' : '')+(Da) +"";	
	//MeetingDay.min=""+y+"-"+( (mo+1)<10 ? '0' : '')+(mo+1) +"-"+( (Da+1)<10 ? '0' : '')+(Da+1) +"";


	DeadLine.value=""+y+"-"+( (mo+1)<10 ? '0' : '')+(mo+1) +"-"+( (Da+1)<10 ? '0' : '')+(Da) +"";	
	DeadLine.min=""+y+"-"+( (mo+1)<10 ? '0' : '')+(mo+1) +"-"+( (Da+1)<10 ? '0' : '')+(Da+1) +"";

	//console.log(MeetingDay.innerHTML);
   

   /* NowDate=Date1.value;
    RealY=DateValue.split("-")[0];
    RealMo=DateValue.split("-")[1];
    RealDate=DateValue.split("-")[2];
*/
	//alert(RealDate);
}

//新增TASK的檢查
function AddTaskCheck(){
	var WorkName=document.getElementById("WorkName").value;
	var DeadLine=document.getElementById("DeadLine").value;
	

	function flag(value ){
	    return value[0] == WorkName ? true : false;
	}

	if(Helper_ID.length>0 &&TaskArray.some(flag)==false && WorkName.length>3 && DeadLine.length>3){
		return true;
	}
	alert("小心，有選項重複或沒填到呢!");
	return false;
}

//送出的檢查
function SummitCheck(){
	var Who_Meeting=document.getElementById("Who_Meeting").innerHTML;
	var Subject=document.getElementById("Subject").value;
	console.log(Subject);
	var StartTime="2013/12/0"+document.getElementById("StartTime").value;
	var FinalTime="2013/12/0"+document.getElementById("FinalTime").value;
	var Content=CKEDITOR.instances.content.getData();
	console.log();
	

    if(  Subject.length<3 ){
		alert("會議需要名稱!");
		return false;
	}
	if(  Date.parse( FinalTime ) .valueOf()   <   Date.parse( StartTime ) .valueOf()   ){
		alert("結束時間不能比開始時間早");
		return false;
	}
	if(  Who_Meeting.length<3 ){
		alert("需要與會人!");
		return false;
	}
	
	if(  Content.length<3 ){
		alert("會議記錄是空白噢!");
		return false;
	}




    return true;

}

////檢查是否有重複參加會議的ID
function Check_MeetingId_Repeat(value){
	
	function flag(ArrayValue){

	    return ArrayValue == value  ? true : false;
	}
	
	if (Meeting_ID.some(flag)==false  ){
		return false;
	}
	return true;
}



////檢查是否有重複幫忙的ID
function Check_HelpID_Repeat(value){
	
	function flag(ArrayValue){

	    return ArrayValue == value  ? true : false;
	}
	
	if (Helper_ID.some(flag)==false  ){
		return false;
	}
	return true;
}