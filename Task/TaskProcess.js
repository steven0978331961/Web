window.onload = function ()
{
	//1.畫面存取─PHP取前5筆資料，寫資料進Grid
	//2.查詢─PHP取所有資料，寫資料進Grid，寫頁數
	//3.頁數Grid讀取
	//4.編輯 popup window，儲存後資料更新
	//5.刪除資料
	//6.完成、中止資料更新
	var data;
	var page_num = 1;
	var datanum = document.getElementById("DataNum").value;
	document.getElementById("search").onclick = function() {FormShow("Search")};
	document.getElementById("Prev-Page").onclick = function () {page_num = (page_num == 1? 1 : page_num - 1); GridView();};
	document.getElementById("Next-Page").onclick = function () {page_num = (page_num == Math.ceil(data.length/datanum)? page_num : page_num + 1);GridView();};
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
			var j = datanum;
			var i = (page_num-1)*datanum;
			if ((data.length - i) < datanum)
				j = data.length;
			var result = "";
			for(;i < j; i++)
			{
				result = result +
					'<tr class = "full-msg">' +
						'<td>' + data[i].M_subject + '</td>' +
						'<td>' + data[i].T_name + '</td>' +
						'<td>' + data[i].T_department + '</td>' + 
						'<td>' + data[i].T_deadline + '</td>' + 
						'<td>' + data[i].T_coll + '</td>' + 
						'<td>' + data[i].T_status + '</td>' +						
						'<td>' +
							'<button class="edit" type="button">編輯</button>' +
							'<button class="delete" type="button">刪除</button>' +
							'<button class="finish" type="button">完成</button>' +
							'<button class="stop" type="button">中止</button>' +
						'</td>' +
					'</tr>';
			}
		}
		document.getElementById("result").innerHTML = result;
		var del = document.getElementsByClassName("delete");
		for(var i = 0; i < del.length; i++)
			del[i].onclick = function() {Delete(this.id)};
		
		var det = document.getElementsByClassName("detail");
		for(var i = 0; i < det.length; i++)
			det[i].onclick = function() {Detail(this.id)};
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
			'<li><a href = "#" class = "page_cnt" id = "Page-'+(i+1)+'">'+(i+1)+'</a></li>';
		}
		document.getElementById("pagelist").innerHTML = btn;
		var page = document.getElementsByClassName("page_cnt");
		for(var i = 0; i < page.length; i++)
			page[i].onclick = function() {PageChange(this.id)};
	}
}