var Id=document.getElementById("Name");
var Phone=document.getElementById("Phone");
var Email=document.getElementById("Email");
var Date1=document.getElementById("Date");
var Time=document.getElementById("Time");
var Appetizer=document.getElementsByName("Appetizer");
var Soup=document.getElementsByName("Soup");
var MainCourse=document.getElementById("MainCourseForm");
var LittleCourse=document.getElementById("LittleCourse");
var drink=document.getElementsByName("drink");
var Spiciness=document.getElementById("Spiciness");
var FoodNumber=document.getElementById("FoodNumber");
var Other=document.getElementById("Other");
var Color=document.getElementById("Color");
var SpicNumber=document.getElementById("SpicNumber");
var RealY;

var RealMo;
var RealDate;
var NowDate;

if(Date1!=null){
	console.log(Date1);
    SetTime();
    SpicNumber.innerHTML=Spiciness.value;
}



function FinalCheck(){

	if(CheckName() && CheckDate() && CheckTime() &&checkPhone() && CheckChooseNumber(MainCourse.elements) && CheckChooseNumber(LittleCourse.elements)&& CheckSingle(Id) && CheckSingle(Phone) && CheckSingle(Email) && CheckSingle(Date1) &&CheckSingle(Time) && 
	CheckSingle(Spiciness) && CheckSingle(FoodNumber) && CheckSingle(Other) && CheckSingle(Color) ){
        CountMoney() ;
        //alert(CountMoney() );
	}

}

function CheckName(){
	if(Id.value.trim().length==0){alert("名子不能為空"); return false;}
	return true;
}

function CheckEmail(){
emailRule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
if(!emailRule.test(Email.value)){
    alert("您的郵件格式不正確");}
}


function ChangeSpic(){
SpicNumber.innerHTML=Spiciness.value;
}

function MeatNumber(){
	if(FoodNumber.value<1){
		FoodNumber.value=1;
		alert("餐點數量不可以小於一份歐");
	}
}

//確認單選項是否都有填到
function CheckSingle(item){
	
	if(item.id!="Other" &&  item.value==""){
		alert(""+item.id+"沒填到優");
		return false;
	}
	return true;

}


//確認多選餐點數量
function CheckChooseNumber(a){
	switch(a) {
    case MainCourse.elements:
      if(CountChoose(MainCourse.elements)!=2){
      	alert("主餐只能選兩樣");
      }else {
      	return true;
      }
      break;
    case LittleCourse.elements:
      if(CountChoose(LittleCourse.elements)!=3){
      	 alert("小菜只能選三樣");
      }else {
      	return true;
      }
      break;
    default:
        alert("錯誤");

    }

}

//計算多選餐點所選擇的數量
function  CountChoose(a){
	var number=0;
    for(var i=0;i<a.length;i++){
		if(a[i].checked){
			number+=1;

		}
	}
    return number;
}

//初始日期和時間
function SetTime(){
	var d = new Date();
	y=d.getFullYear();
	mo=d.getMonth();
	Da=d.getDate();
	h=d.getHours();
	m=d.getMinutes();
	if(h+1<=9){
		h=9;
	}
	if(h+1>=21){
		h=19;
	}
	Date1.value=""+y+"-"+( (mo+1)<10 ? '0' : '')+(mo+1) +"-"+( (Da+1)<10 ? '0' : '')+(Da) +"";
	Time.value=""+( (h+1)<10?'0':'')+ (h+1) +":"+(m<10?'0':'')+m+"";
	Date1.min=""+y+"-"+( (mo+1)<10 ? '0' : '')+(mo+1) +"-"+( (Da+1)<10 ? '0' : '')+(Da+1) +"";
   

    DateValue=Date1.value;
   /* NowDate=Date1.value;
    RealY=DateValue.split("-")[0];
    RealMo=DateValue.split("-")[1];
    RealDate=DateValue.split("-")[2];
*/
	//alert(RealDate);
}

function CheckDate(){
	/*if(Date1.value.split("-")[0]!=RealY  &&  Date1.value.split("-")[1]<RealMo && ){
		return false;
	}
	return true;*/
	//var TimeN=Date1.value-DateValue;
	//alert(new Date(DateValue)-new Date(Date1.value));
	//alert(TimeN);

	if( new Date(Date1.value)-  new Date(DateValue) <86400000*10  && new Date(Date1.value)-  new Date(DateValue)>=0 ){
		return true;
	}
	else{
		alert("只能訂10天內歐");
		SetTime();
		return false;
	}

}

//驗證日期和時間
function CheckTime(){

//alert( Time.value  ) ; 
    t=Time.value;
    h=t.split(":")[0];
    m=t.split(":")[1]

	if(h<=9){
		h=9;
		 alert("選擇時間不再營業時間內");
        return false;
	}
	if(h>=21){
		alert("選擇時間不再營業時間內");

		h=19;
	    
        return false;
	}


	Time.value=""+h +":"+m+"";
	return true;

}



//認證手機
function checkPhone(){
	re=/09+[0-9]{2}-+[0-9]{6}/;
	if(!re.test(Phone.value) ){
		alert("手機格式錯誤");
		return false;
	}
	return true;
}




//計算錢錢
function CountMoney(){
var TotalMoney=0;
var Appetizer_Price=[50,100,50,100,50];
var Soup_Price=[100,50,100];
var MainCourse_Price=[50,100,50,100,50];
var LittleCourse_Price=[100,50,100,50];
var drink_Price=[100,50,100,50];

 for(var i=0;i<Appetizer.length;i++){
		if(Appetizer[i].checked){
			TotalMoney+=Appetizer_Price[i];

		}
	}

 for(var i=0;i<Soup.length;i++){
		if(Soup[i].checked){
			TotalMoney+=Soup_Price[i];

		}
	}
 for(var i=0;i<MainCourse.length;i++){
		if(MainCourse[i].checked){
			TotalMoney+=MainCourse_Price[i];

		}
	}
 for(var i=0;i<LittleCourse.length;i++){
		if(LittleCourse[i].checked){
			TotalMoney+=LittleCourse_Price[i];

		}
	}
 for(var i=0;i<drink.length;i++){
		if(drink[i].checked){
			TotalMoney+=drink_Price[i];

		}
	}
TotalMoney=TotalMoney*FoodNumber.value;
alert(document.getElementById("FoodForm").elements[0].id);

document.getElementById("FoodForm").submit();
document.getElementById("MainCourseForm").submit();
document.getElementById("LittleCourseForm").submit();

return TotalMoney;
}



function Delete(){
document.getElementById("DeletePeople").value ;
xmlhttp=new XMLHttpRequest();
xmlhttp.onreadystatechange=function()
  {
  if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
   // console.log( JSON.parse(xmlhttp.responseText));   
    document.getElementById("DeletePeople").value=xmlhttp.responseText;
    }
  }
/*
xmlhttp.open("GET","Food.php?a=2",true);
xmlhttp.send();
*/
xmlhttp.open("POST","Food.php",true);
xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
xmlhttp.send("DeletePeople="+document.getElementById('DeletePeople').value);
	// document.getElementById("DeleteFoodForm").submit();
}





function Update(){
document.getElementById("UpdatePeople").value ;
document.getElementById("UpdatePhone").value ;

xmlhttp=new XMLHttpRequest();
xmlhttp.onreadystatechange=function()
  {
  if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
   // console.log( JSON.parse(xmlhttp.responseText));   
   document.getElementById("UpdatePeople").value=xmlhttp.responseText;
    document.getElementById("UpdatePhone").value=xmlhttp.responseText;
    }
  }
/*
xmlhttp.open("GET","Food.php?a=2",true);
xmlhttp.send();
*/
xmlhttp.open("POST","Food.php",true);
xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
xmlhttp.send("UpdatePeople="+document.getElementById("UpdatePeople").value+"&UpdatePhone="+document.getElementById("UpdatePhone").value);

	 //document.getElementById("UpdateFoodForm").submit();


}



function Search(){
document.getElementById("SearchPeople").value ;


xmlhttp=new XMLHttpRequest();
xmlhttp.onreadystatechange=function()
  {
  if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
   // console.log( JSON.parse(xmlhttp.responseText));   
   document.getElementById("SearchPeople").value=xmlhttp.responseText;

    }
  }
/*
xmlhttp.open("GET","Food.php?a=2",true);
xmlhttp.send();
*/
xmlhttp.open("POST","Food.php",true);
xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
xmlhttp.send("SearchPeople="+document.getElementById("SearchPeople").value);





	// document.getElementById("SearchFoodForm").submit();


}

function XMLTEST(){
xmlhttp=new XMLHttpRequest();

xmlhttp.onreadystatechange=function()
  {
  if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
   // console.log( JSON.parse(xmlhttp.responseText));

   
    document.getElementById("SearchPeople").value=xmlhttp.responseText;
    }
  }
/*
xmlhttp.open("GET","Food.php?a=2",true);
xmlhttp.send();
*/
xmlhttp.open("POST","Food.php",true);
xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
xmlhttp.send("a=2");



}