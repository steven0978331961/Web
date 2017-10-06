

var Store_MeetingPelple=[];
var Store_HelperPoeple=[];


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
		     Who_Di.value+="  "+MeetingPeople[i].id;

	    }
	
	}

}



function PassPeople_ToParent(Store_Id,ArrayName) {
    var MeetingPeople=document.getElementsByName(ArrayName);
    window.opener.GetPeople_FromChild(Store_Id,MeetingPeople);
    window.close();
} 



function Summit (){
	document.getElementById("AddMeeting").submit();
	//alert(document.getElementById("Content").innerHTML );

}

function RemoveB(){
	b=document.getElementById("b1");
	b.parentNode.remove(b);

}


