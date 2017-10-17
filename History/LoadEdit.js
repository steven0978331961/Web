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
			var data = JSON.parse(request.responseText);
			if(data != "nodata")
			{
				//寫入資料
				document.getElementById("Subject").value = data.M_subject;
				document.getElementsByName("Date")[0].value = data.M_date;
				document.getElementsByName("StartTime")[0].value = data.M_starttime;
				document.getElementsByName("FinalTime")[0].value = data.M_endtime;
				document.getElementById("Who_Di").value = data.M_users;
				document.getElementById("content").value = data.M_content;
				document.getElementsByName("Department")[0].value = data.M_department;
				document.getElementById("file").innerHTML = data.M_files;
				document.getElementById("WorkName").value = data.T_name;
				document.getElementsByName("DateLine")[0].value = data.T_deadline;
				document.getElementById("State").value = data.T_status;
				document.getElementById("Who_Di2").value = data.T_coll;
				document.getElementById("Subject").value = data.M_subject;
			}
			else
			{
				alert("無資料可修改！");
				document.location.href="AddMeeting.html";
			}
		}
	};
	request.open("POST", "LoadEdit.php");
	request.setRequestHeader("Content-Type","application/x-www-form-urlencoded;");
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