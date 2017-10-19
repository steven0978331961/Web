function LoadContent()
{
	var id = getID();
	if(id != false)
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
	return false;
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
				var M_users = JSON.parse(data[0].M_users);
				var users = "";
				for(var k = 0; k < M_users.length; k++)
				{
					if(k > 0)
						users = users + "; ";
					users = users + M_users[k];
				}
				//寫入資料
				document.getElementById("Subject").value = data[0].M_subject;
				document.getElementsByName("Date")[0].value = data[0].M_date;
				document.getElementsByName("StartTime")[0].value = data[0].M_starttime;
				document.getElementsByName("FinalTime")[0].value = data[0].M_endtime;
				document.getElementById("Who_Di").innerHTML = users;
				document.getElementById("content").value = data[0].M_content;
				document.getElementsByName("Department")[0].value = data.M_department;
				//document.getElementById("file").innerHTML = data.M_files;
				for(var i = 0; i< data.length; i++)
				{
					document.getElementById("WorkName").value = data[i].T_name;
					document.getElementsByName("DateLine")[0].value = data[i].T_deadline;
					document.getElementById("State").value = data[i].T_status;
					document.getElementById("Who_Di2").innerHTML = data[i].T_coll;
					document.getElementById("dealtask").click();
				}
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
function saveEdit()
{
	var id = getID();
	if(id != false)
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
}