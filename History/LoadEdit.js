function LoadContent()
{
	var id = getID();
	getContent(id);
}
function getID()
{
	var url = location.href;
	if(url.indexOf("?") > -1)
	{
		var temp = url.split("?");
		var vars = temp[1].split("&");
		return vars[0];
	}
}
function getContent(id)
{
	var request = new XMLHttpRequest();
	request.onreadystatechange = function()
	{
		if(request.readyState == 4 && request.status == 200)
		{
			if(JSON.parse(request.responseText) != "nodata")
			{
				//寫入資料
			}
			else
			{
				alert("無資料可修改！");
				document.location.href="AddMeeting.html";
			}
		}
	};
	request.open("POST", "LoadEdit.php");
	request.send("action=getEdit&"+id);
}
function saveEdit(id)
{
	var request = new XMLHttpRequest();
	request.onreadystatechange = function()
	{
		if(request.readyState == 4 && request.status == 200)
		{
			if(JSON.parse(request.responseText) == "RemarkFail")
			{
				alert("修改失敗！");
			}
		}
	};
	request.open("POST", "LoadEdit.php");
	request.send("action=remark&"+id);
}