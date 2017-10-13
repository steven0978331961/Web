window.onload = function ()
{
	//1.畫面存取─PHP取前5筆資料，寫資料進Grid，寫頁數
	//2.查詢─PHP取所有資料，寫資料進Grid，寫頁數
	//3.頁數Grid讀取
	//4.Detail popup window
	//5.刪除資料
	//6.跳頁至AddMeeting並帶入資料
	var data;
	var page_num = 1;
	var type = '';
	var datanum = document.getElementById("DataNum").value;
	document.getElementById("search").onclick = function() {FormShow("Search")};
	document.getElementById("Prev-Page").onclick = function () {page_num = (page_num == 1? 1 : page_num - 1); GridView();};
	document.getElementById("Next-Page").onclick = function () {page_num = (page_num == Math.ceil(data.length/datanum)? page_num : page_num + 1);GridView();};
	FormShow("New");
	//PageList Count
	function FormShow(btn)
	{
		var viewData = new FormData();
		viewData.append("action", btn);
		if(document.getElementById("s_MtName").value != "")
			viewData.append("s_MtName", document.getElementById("s_MtName").value);
		if(document.getElementById("s_MtStartDate").value != "")
			viewData.append("s_MtStartDate", document.getElementById("s_MtStartDate").value);
		if(document.getElementById("s_MtEndDate").value != "")
			viewData.append("s_MtEndDate", document.getElementById("s_MtEndDate").value);
		if(document.getElementById("s_MtDepart").value != "")
			viewData.append("s_MtDepart", document.getElementById("s_MtDepart").value);
		var request = new XMLHttpRequest();
		request.onreadystatechange = function()
		{
			if(request.readyState == 4 && request.status == 200)
			{
				data = JSON.parse(request.responseText);
				GridView();
				PageList(data.length);
			}
		};
		request.open("POST", "History.php");
		request.send(viewData);
	}
	function GridView()
	{
		//grid資料依datanum 筆數顯示
		if (data == "nothing")
		{
			result = '<tr><td colspan = 8 >查無資料</td></tr>';
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
					'<tr class = "full-msg" id = "' + data[i].M_id + '">' +
						'<td>' + data[i].M_date + '</td>' +
						'<td>' + data[i].M_subject + '</td>' +
						'<td>' + data[i].M_department + '</td>' + 
						'<td>' + data[i].M_users + '</td>' + 
						'<td>' + data[i].M_files + '</td>' + 					
						'<td>' +
							'<button class="detail" type="button" id="detail-' + data[i].M_id + '">詳細資料</button>' +
							'<button class="edit" type="button" id="edit-' + data[i].M_id + '">編輯</button>' +
							'<button class="delete" type="button" id="delete-' + data[i].M_id + '">刪除</button>' +
						'</td>' +
					'</tr>';
			}
		}
		document.getElementById("result").innerHTML = result;
		var del = document.getElementsByClassName("delete");
		for(var i = 0; i < del.length; i++)
			del[i].onclick = function() {Delete(this.id, i)};
		var det = document.getElementsByClassName("detail");
		for(var i = 0; i < det.length; i++)
			det[i].onclick = function() {Detail(this.id)};
	}
	function Delete(id, n)
	{
		var delData = new FormData();
		delData.append("action", "Delete");
		delData.append("M_id", id.substring(id.indexOf("-")+1));
		var request = new XMLHttpRequest();
		request.onreadystatechange = function()
		{
			if(request.readyState == 4 && request.status == 200)
			{
				if(JSON.parse(request.responseText) == "DeleteSuccess")
				{
					data.splice(n, 1);
					GridView();
					PageList(data.length);
				}
				else
					alert("刪除失敗！");
			}
		};
		request.open("POST", "History.php");
		request.send(delData);
	}
	function Detail(id)
	{
		var detData = new FormData();
		detData.append("action", "Detail");
		detData.append("M_id", id.substring(id.indexOf("-")+1));
		var request = new XMLHttpRequest();
		request.onreadystatechange = function()
		{
			if(request.readyState == 4 && request.status == 200)
			{
				var det = JSON.parse(request.responseText);
				if(det != "DetailFail")
				{
					var winObj = window.open('History_Detail.html');
					winObj.window.onload = function ()
					{
						winObj.document.getElementById("d_MtSubject").innerHTML  = det.M_subject;
						winObj.document.getElementById("d_MtDate").innerHTML  = det.M_date;
						winObj.document.getElementById("d_MtStartTime").innerHTML  = det.M_starttime;
						winObj.document.getElementById("d_MtEndTime").innerHTML  = det.M_endtime;
						winObj.document.getElementById("d_MtUsers").innerHTML  = det.M_users;
						winObj.document.getElementById("d_MtRecoders").innerHTML  = det.M_recoder;
						winObj.document.getElementById("d_MtDepart").innerHTML  = det.M_department;
						winObj.document.getElementById("d_MtContent").innerHTML  = det.M_content;
						winObj.document.getElementById("d_MtFiles").innerHTML  = det.M_files;
						winObj.document.getElementById("d_TpName").innerHTML  = det.T_name;
						winObj.document.getElementById("d_TpDeadline").innerHTML  = det.T_dateline;
						winObj.document.getElementById("d_TpColl").innerHTML  = det.T_coll;
						winObj.document.getElementById("d_TpStatus").innerHTML  = det.T_status;
					}
					
				}
				else
					alert("詳細資料讀取失敗！");
			}
		};
		request.open("POST", "History.php");
		request.send(detData);
	}
	function PageChange(id)
	{
		alert(id);
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