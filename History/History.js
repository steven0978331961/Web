window.onload = function ()
{
	//1.畫面存取─PHP取前5筆資料，寫資料進Grid，寫頁數
	//2.查詢─PHP取所有資料，寫資料進Grid，寫頁數
	//3.頁數Grid讀取
	//4.Detail popup window
	//5.刪除資料
	//6.跳頁至AddMeeting並帶入資料
	var data;
	var temp_id;
	var page_num = 1;
	var datanum = document.getElementById("DataNum").value;
	document.getElementById("DataNum").onchange = function () {ViewNumChange();};
	document.getElementById("search").onclick = function() {FormShow("Search");};
	document.getElementById("Prev-Page").onclick = function () {page_num = (page_num == 1? 1 : page_num - 1); GridView();};
	document.getElementById("Next-Page").onclick = function () {page_num = (page_num == Math.ceil(data.length/datanum)? page_num : page_num + 1);GridView();};
	FormShow("New");
	
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
				if(data == "nothing")
					PageList(1);
				else
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
			var j = page_num*datanum;
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
							'<button type="button" class="btn btn-success btn-sm detail" data-toggle="modal" data-target="#myModal" id="detail-' + data[i].M_id + '">詳細資料</button>' +
							'<button type="button" class="btn btn-primary btn-sm edit"  id="edit-' + data[i].M_id + '">編輯</button>' +
							'<button type="button" class="btn btn-danger btn-sm delete"  id="delete-' + data[i].M_id + '">刪除</button>' +
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
	function Delete(id)
	{
		var row = document.getElementById(id.substring(id.indexOf("-")+1)).sectionRowIndex;
		if(confirm("是否確認刪除會議："+data[row].M_subject+"？"))
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
						data.splice(row, 1);
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
	}

	function Detail(id)
	{
		temp_id = id.substring(id.indexOf("-")+1);
		
	}
	$('#myModal').on('show.bs.modal', function ()
	{
		var detData = new FormData();
		detData.append("action", "Detail");
		detData.append("M_id", temp_id);
		var request = new XMLHttpRequest();
		request.onreadystatechange = function()
		{
			if(request.readyState == 4 && request.status == 200)
			{
				var temp = JSON.parse(request.responseText);
				if(temp != "DetailFail")
				{
					document.getElementById("d_MdSubject").innerHTML = temp.M_subject;
					document.getElementById("d_MdDate").innerHTML = temp.M_date;
					document.getElementById("d_MdStartTime").innerHTML = temp.M_starttime;
					document.getElementById("d_MdEndTime").innerHTML = temp.M_endtime;
					document.getElementById("d_MdUsers").innerHTML = temp.M_users;
					document.getElementById("d_MdRecoders").innerHTML = temp.M_recoder;	
					document.getElementById("d_MdDepart").innerHTML = temp.M_department;
					document.getElementById("d_MdContent").innerHTML = temp.M_content;
					document.getElementById("d_MdFiles").innerHTML = temp.M_files;
					document.getElementById("d_MdName").innerHTML = temp.T_name;
					document.getElementById("d_MdDeadline").innerHTML = temp.T_deadline;
					document.getElementById("d_MdColl").innerHTML = temp.T_coll;
					document.getElementById("d_MdStatus").innerHTML = temp.T_status;
				}
			}
		};
		request.open("POST", "History.php");
		request.send(detData);

	})
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
}