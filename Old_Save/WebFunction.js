 function goGoodLuck() {
　                    //alert('這是 javascript 程式造成的互動效果。');
  window.open("https://www.google.com/doodles", "_self");
}

function goImage(){
	window.open("https://www.google.com.tw/imghp?hl=zh-TW&tab=wi", "_self");
}

function goGmail(){
	window.open("https://mail.google.com/mail/u/0/#inbox", "_self");
}

function Search(){
	var Search_obj = document.getElementById("Search_Text");
	var Search_Text=Search_obj.value;
	window.open('http://www.google.com/#hl=zh-TW&source=hp&q=' + Search_Text, 'Google');
}

function CheckId(){
	var Search_obj = document.getElementById("User_Id");
	var Search_Text=Search_obj.value;
	var Id2=document.getElementById("IdAlert");
	if(Search_Text=="123"){
		window.open('file:///C:/Users/steven/Desktop/steven/LogIn02.html', "_self");


	}
	else{
		Search_obj.style.borderColor="red";
		Id2.innerHTML="找不到您的Google帳戶!";
		
	}
}


function CheckNumber(){
	var Search_obj = document.getElementById("User_Number");
	var Search_Text=Search_obj.value;
	var Number=document.getElementById("NumberAlert");
	if(Search_Text=="123"){
		window.open('file:///C:/Users/steven/Desktop/steven/test1.html', "_self");

      
	}
	else{
		Search_obj.style.borderColor="red";
		Number.innerHTML="找不到您的Google密碼!";
		
	}
}


function DropDown()
{

//var div = document.getElementById('scrolldIV');
//div.scrollTop = div.scrollHeight;
alert("egegegegge");
}
// innerHTML
// innerText 
function add()
{

var div = document.getElementById('scrolldIV');
div.scrollTop = div.scrollHeight;
}


function Item_Choose(number){

	switch(number) {
    case "1":
        window.open('https://myaccount.google.com/?utm_source=OGB&utm_medium=app', "_self");
        break;
    case "2":
         window.open('https://www.google.com.tw/webhp?tab=ww', "_self");
        break;
    case "3":
         window.open('https://www.youtube.com/?gl=TW', "_self");
        
        break;
    case "4":
         window.open('https://play.google.com/store?hl=zh-TW&tab=w8', "_self");
        break;
     case "5":
        window.open('https://news.google.com/news/headlines?hl=zh-TW&ned=tw', "_self");
        break;
    case "6":
         window.open('https://www.google.com.tw/maps/@24.1567887,120.6795607,15z?hl=zh-TW', "_self");
        break;
    case "7":
         window.open('https://mail.google.com/mail/u/0/?tab=wm#inbox', "_self");
        break;
    case "8":
         window.open('https://drive.google.com/drive/my-drive', "_self");
        break;
     case "9":
        window.open('https://calendar.google.com/calendar/render?tab=wc#main_7', "_self");
        break;
    case "10":
         window.open('https://plus.google.com/u/0/', "_self");
        break;
    case "11":
         window.open('https://translate.google.com.tw/?hl=zh-TW&tab=wT', "_self");
        break;
    case "12":
         window.open('https://photos.google.com/?pageId=none', "_self");
        break;

      case "13":
        window.open('https://docs.google.com/document/u/0/', "_self");
        break;
    case "14":
         window.open('https://www.blogger.com/blogger.g#welcome', "_self");
        break;
    case "15":
         window.open('https://contacts.google.com/', "_self");
        break;
    case "16":
         window.open('https://hangouts.google.com/', "_self");
        break;
    case "17":
         window.open('https://keep.google.com/u/0/', "_self");
        break;
    case "18":
         window.open('https://classroom.google.com/h', "_self");
        break;
    default:
        window.open('file:///C:/Users/steven/Desktop/steven/LogIn02.html', "_self");

    }
}

function TransTime(){
var value = document.getElementById("user_Class").value;

var Today=new Date();
var value2="今天日期是 " + Today.getFullYear()+ " 年 " + (Today.getMonth()+1) + " 月 " + Today.getDate() + " 日";
location.href="index.php?value="+value+"&Day="+value2; 





}

function CheckPhone(){

var value = document.getElementById("user_Phone").value;
re=/[0-9]{10}/;
if(!re.test(value)){
    alert("您的手機格式不正確");}
}


function CheckEmail(){

var value = document.getElementById("user_Email").value;
emailRule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
if(!emailRule.test(value)){
    alert("您的郵件格式不正確");}
}