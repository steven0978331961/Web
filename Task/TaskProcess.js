window.onload = function ()
{
	//1.畫面存取─PHP取前5筆資料，寫資料進Grid
	//2.查詢─PHP取所有資料，寫資料進Grid，寫頁數
	//3.頁數Grid讀取
	//4.編輯 popup window，儲存後資料更新
	//5.刪除資料
	//6.完成、中止資料更新
	var data;
	var temp;
	var page_num = 1;
	var datanum = document.getElementById("DataNum").value;
	document.getElementById("DataNum").onchange = function () {ViewNumChange();};
	document.getElementById("search").onclick = function () {FormShow("Search");};
	document.getElementById("Prev-Page").onclick = function () {page_num = (page_num == 1? 1 : page_num - 1); GridView();};
	document.getElementById("Next-Page").onclick = function () {page_num = (page_num == Math.ceil(data.length/datanum)? page_num : page_num + 1);GridView();};
	document.getElementById("save").onclick = function () {Save()};
	FormShow("New");
	
	function FormShow(btn)
	{
		var viewData = new FormData();
		viewData.append("action", btn);
		if(document.getElementById("t_MtName").value != "")
			viewData.append("t_MtName", document.getElementById("t_MtName").value);
		if(document.getElementById("t_MtStartDate").value != "")
			viewData.append("t_MtStartDate", document.getElementById("t_MtStartDate").value);
		if(document.getElementById("t_MtEndDate").value != "")
			viewData.append("t_MtEndDate", document.getElementById("t_MtEndDate").value);
		if(document.getElementById("t_TpName").value != "")
			viewData.append("t_TpName", document.getElementById("t_TpName").value);
		if(document.getElementById("t_TpDepartment").value != "")
			viewData.append("t_TpDepartment", document.getElementById("t_TpDepartment").value);
		if(document.getElementById("t_TpStatus").value != "")
			viewData.append("t_TpStatus", document.getElementById("t_TpStatus").value);
		var request = new XMLHttpRequest();
		request.onreadystatechange = function()
		{
			if(request.readyState == 4 && request.status == 200)
			{
				data = JSON.parse(request.responseText);
				GridView();
				if(data == "nothing")
					PageList(1);
				else
					PageList(data.length);
			}
		};
		request.open("POST", "TaskProcess.php");
		request.send(viewData);
	}
	function GridView()
	{
		
		//grid資料依datanum 筆數顯示
		if (data == "nothing")
		{
			result = '<tr><td colspan = 10 >查無資料</td></tr>';
		}
		else
		{
			var j = page_num*datanum;
			var i = (page_num-1)*datanum;
			if ((data.length - i) < datanum)
				j = data.length;
			var result = "";
			for(;i < j; i++)
			{
				result = result +
					'<tr class = "full-msg" id = "row-' + i + '">' +
						'<td>' + data[i].T_subject + '</td>' +
						'<td>' + data[i].T_name + '</td>' +
						'<td>' + data[i].T_department + '</td>' + 
						'<td>' + data[i].T_deadline + '</td>' + 
						'<td>' + data[i].T_coll + '</td>' + 
						'<td>' + data[i].T_status + '</td>' +						
						'<td>' +
							'<button type="button" class="btn btn-primary btn-sm edit" data-toggle="modal" data-target="#myModal" id = "edit-' + i + '">編輯</button>' +
							'<button type="button" class="btn btn-danger btn-sm delete"  id = "delete-' + i + '">刪除</button>' +
							'<button type="button" class="btn btn-success btn-sm finish"  id = "finish-' + i + '">完成</button>' +
							'<button type="button" class="btn btn-warning btn-sm stop"  id = "stop-' + i + '">中止</button>' +
						'</td>' +
					'</tr>';
			}
		}
		document.getElementById("result").innerHTML = result;
		var fin = document.getElementsByClassName("finish");
		for(var i = 0; i < fin.length; i++)
			fin[i].onclick = function() {ActionDFS(this.id, 1)};
		
		var stop = document.getElementsByClassName("stop");
		for(var i = 0; i < stop.length; i++)
			stop[i].onclick = function() {ActionDFS(this.id, 2)};
		
		var del = document.getElementsByClassName("delete");
		for(var i = 0; i < del.length; i++)
			del[i].onclick = function() {ActionDFS(this.id, 3)};
		
		var det = document.getElementsByClassName("edit");
		for(var i = 0; i < det.length; i++)
			det[i].onclick = function() {Edit(this.id)};
	}
	function ActionDFS(id, st)
	{
		var row = document.getElementById("row-"+ id.substring(id.indexOf("-")+1)).sectionRowIndex;
		switch(st)
		{
			case 1:
			{
				act = "完成";
				break;
			}
			case 2:
			{
				act = "中止";
				break;
			}
			case 3:
			{
				act = "刪除";
				break;
			}
			default:
				break;
		}
		if(confirm("是否確認"+act+"工作項目："+data[row].T_name+"？"))
		{
			var DFSData = new FormData();
			DFSData.append("action", "DeleleFinishStop");
			DFSData.append("T_subject", data[row].T_subject);
			DFSData.append("T_name", data[row].T_name);
			DFSData.append("T_st", st);
			var request = new XMLHttpRequest();
			request.onreadystatechange = function()
			{
				if(request.readyState == 4 && request.status == 200)
				{
					if(JSON.parse(request.responseText) == "DFSSuccess")
					{
						data.splice(row, 1);
						GridView();
						PageList(data.length);
					}
					else
						alert(act+"失敗！");
				}
			};
			request.open("POST", "TaskProcess.php");
			request.send(DFSData);
		}
	}
	function ViewNumChange()
	{
		datanum = document.getElementById("DataNum").value;
		page_num = 1;
		GridView();
		if(data == "nothing")
			PageList(1);
		else
			PageList(data.length);
	}
	function PageChange(id)
	{
		page_num = parseInt(id.substring(id.indexOf("-")+1));
		GridView();
	}
	function PageList(num)
	{
		//頁數顯示
		var j = Math.ceil(num/datanum);
		var btn = "";
		for (i = 0; i < j; i++)
		{
			btn = btn +
			'<li><button class = "btn btn-outline-primary btn-sm page_cnt" id = "Page-'+(i+1)+'">'+(i+1)+'</button></li>';
		}
		document.getElementById("pagelist").innerHTML = btn;
		var page = document.getElementsByClassName("page_cnt");
		for(var i = 0; i < page.length; i++)
			page[i].onclick = function() {PageChange(this.id)};
	}
	
	//Edit
	function Edit(id)
	{
		temp = data[id.substring(id.indexOf("-")+1)];
	}
	$('#myModal').on('show.bs.modal', function ()
	{
		document.getElementById("t_mdSubject").innerHTML = temp.T_subject;
		document.getElementById("t_mdName").innerHTML = temp.T_name;
		document.getElementById("t_Mddeadline").value = temp.T_deadline;
		document.getElementById("t_MdColl").value = temp.T_coll;
		document.getElementById("t_MdDepartment").value = temp.T_department;
		document.getElementById("t_MdStatus").value = temp.T_stat;
	})
	function Save()
	{
		temp.clear;
		$('#myModal').modal('hide');
		var saveData = new FormData();
		saveData.append("action", "Save");
		saveData.append("T_subject", document.getElementById("t_mdSubject").innerHTML);
		saveData.append("T_name", document.getElementById("t_Mddeadline").innerHTML);
		saveData.append("T_deadline",document.getElementById("t_Mddeadline").value);
		saveData.append("T_coll", document.getElementById("t_MdColl").value);
		saveData.append("T_department", document.getElementById("t_MdDepartment").value);
		saveData.append("T_status", document.getElementById("t_MdStatus").value);
		var request = new XMLHttpRequest();
		request.onreadystatechange = function()
		{
			if(request.readyState == 4 && request.status == 200)
			{
				if(JSON.parse(request.responseText) == "SaveSuccess")
				{
					data.splice(row, 1, JSON.parse(request.responseText));
					GridView();
					PageList(data.length);
				}
				else
					alert("儲存失敗！");
			}
		};
		request.open("POST", "TaskProcess.php");
		request.send(saveData);
	}
}