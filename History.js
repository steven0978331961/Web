window.onload = function ()
{
	var role = getRole();
	var data;
	var temp_id;
	var page_num = 1;
	var datanum = document.getElementById("DataNum").value;
	document.getElementById("DataNum").onchange = function () {ViewNumChange();};
	document.getElementById("search").onclick = function() {FormShow("Search");};
	document.getElementById("Prev-Page").onclick = function () {page_num = (page_num == 1? 1 : page_num - 1); GridView();};
	document.getElementById("Next-Page").onclick = function () {page_num = (page_num == Math.ceil(data.length/datanum)? page_num : page_num + 1);GridView();};
	
	getRight();
	FormShow("New");
	
	function getRight()
	{
		var depart = JSON.parse(role["U_department"]);
		for(var i = 0; i < depart.length; i++)
			$('#s_MtDepart').append(new Option(depart[i],depart[i]));
		$('#s_MtDepart').selectpicker('refresh');
		$('#s_MtDepart').selectpicker('selectAll');
	}
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
		if($('#s_MtDepart').length > 0)
			viewData.append("s_MtDepart", $('#s_MtDepart').val());
		var request = new XMLHttpRequest();
		request.onreadystatechange = function()
		{
			if(request.readyState == 4 && request.status == 200)
			{
				data = JSON.parse(request.responseText);
				if(data == "nothing")
					PageList(1);
				else
					PageList(data.length);
				GridView();
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
			var M_users;
			var M_files;
			var users;
			var files;
			for(;i < j; i++)
			{
				var users = "";
				M_users = getName(JSON.parse(data[i].M_users));
				for(var k = 0; k < M_users.length; k++)
				{
					if(k > 0)
						users = users + ",";
					users = users + M_users[k]['U_name'];
				}
				
				var files = "";
				M_files = JSON.parse(data[i].M_files);
				for(var k = 0; k < M_files.length; k++)
				{
					if(k > 0)
						files = files + ",";
					files = files + M_files[k];
				}
				result = result +
					'<tr class = "full-msg" id = "' + data[i].M_id + '">' +
						'<td>' + data[i].M_date + '</td>' +
						'<td>' + data[i].M_subject + '</td>' +
						'<td>' + data[i].M_department + '</td>' + 
						'<td>' + users + '</td>' + 
						'<td>' + files + '</td>' + 					
						'<td>' ;
				if((users.indexOf(role["U_id"]) > -1) || (role["U_role"] == 0))
				{
					result = result + '<button type="button" class="btn btn-success btn-sm detail" data-toggle="modal" data-target="#myModal" id="detail-' + data[i].M_id + '">詳細資料</button>' ;
				}
				if((role["U_id"] == data[i].M_recoder) || (role["U_role"] == 0))
				{
					result = result +
							'<button type="button" class="btn btn-primary btn-sm edit"  id="edit-' + data[i].M_id + '">編輯</button>' +
							'<button type="button" class="btn btn-danger btn-sm delete"  id="delete-' + data[i].M_id + '">刪除</button>' ;
				}
				result = result + '</td>' + '</tr>';
			}
		}
		document.getElementById("result").innerHTML = result;
		var del = document.getElementsByClassName("delete");
		for(var i = 0; i < del.length; i++)
			del[i].onclick = function() {Delete(this.id)};
		var det = document.getElementsByClassName("detail");
		for(var i = 0; i < det.length; i++)
			det[i].onclick = function() {Detail(this.id)};
		var edi = document.getElementsByClassName("edit");
		for(var i = 0; i < edi.length; i++)
			edi[i].onclick = function() {Edit(this.id)};
		var pa = document.getElementsByName("page");
		for(var i = 0; i < pa.length; i++)
			pa[i].className = "btn btn-info btn-sm page_cnt";
		document.getElementById("Page-"+page_num).className = "btn btn-primary btn-sm page_cnt";
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
					var users = "";
					M_users = getName(JSON.parse(temp[0].M_users));
					for(var k = 0; k < M_users.length; k++)
					{
						if(k > 0)
							users = users + ",";
						users = users + M_users[k]['U_name'];
					}
					var M_files;
					var files = "";
					M_files = JSON.parse(temp[0].M_files);
					for(var k = 0; k < M_files.length; k++)
					{
						if(k > 0)
							files = files + ",";
						files = files +"<a download href='uploads/" +M_files[k]+"'>"+M_files[k]+"</a>";
					}
					document.getElementById("d_MdSubject").innerHTML = temp[0].M_subject;
					document.getElementById("d_MdDate").innerHTML = temp[0].M_date;
					document.getElementById("d_MdStartTime").innerHTML = temp[0].M_starttime;
					document.getElementById("d_MdEndTime").innerHTML = temp[0].M_endtime;
					document.getElementById("d_MdUsers").innerHTML = users;
					document.getElementById("d_MdRecoders").innerHTML = getName(temp[0].M_recoder)[0]['U_name'];	
					document.getElementById("d_MdDepart").innerHTML = temp[0].M_department;
					document.getElementById("d_MdContent").innerHTML = temp[0].M_content;
					document.getElementById("d_MdFiles").innerHTML = files;
					if(temp[0].T_name != null)
					{
						var result = "";
						for(var i = 0; i < temp.length; i++)
						{
							var coll = "";
							console.log(temp[0].T_coll);
							T_coll = getName(temp[0].T_coll.replace(/;+/g,','));
							for(var k = 0; k < T_coll.length; k++)
							{
								if(k > 0)
									coll = coll + ",";
								coll = coll + T_coll[k]['U_name'];
							}
							result = result + '<tr>' +			
											  	'<td>' + temp[i].T_name + '</td>' +
											  	'<td>' + temp[i].T_department + '</td>' +
											  	'<td>' + temp[i].T_deadline + '</td>' +
											  	'<td>' + coll + '</td>' +
											  	'<td>' + temp[i].T_status + '</td>' +
											  '</tr>';
						}
						document.getElementById("task").innerHTML = result;
					}
				}
			}
		};
		request.open("POST", "History.php");
		request.send(detData);

	})
	function Edit(id)
	{
		document.location.href="AddMeeting2.html?id="+id.substring(id.indexOf("-")+1);
	}
	function ViewNumChange()
	{
		datanum = document.getElementById("DataNum").value;
		page_num = 1;
		if(data == "nothing")
			PageList(1);
		else
			PageList(data.length);
		GridView();
	}
	function PageChange(id)
	{
		page_num = parseInt(id.substring(id.indexOf("-")+1));
		GridView();	
	}
	function PageList(num)
	{
		var j = Math.ceil(num/datanum);
		var btn = "";
		for (i = 0; i < j; i++)
		{
			btn = btn + 
			'<li><button class = "btn btn-info btn-sm page_cnt" name = "page" id = "Page-'+(i+1)+'">'+(i+1)+'</button></li>';
		}
		document.getElementById("pagelist").innerHTML = btn;
		var page = document.getElementsByClassName("page_cnt");
		for(var i = 0; i < page.length; i++)
			page[i].onclick = function() {PageChange(this.id)};
	}
}
document.write("<script src='Role.js'></script>");