function pastDate(compareDate)
{
	var today = Date.parse(new Date().toDateString());
	if(Date.parse(compareDate) < today)
		document.getElementById("hint").style.display='block';
	else
		document.getElementById("hint").style.display='none';
}
window.onload = function ()
{
	var role = getRole();
	var data;
	var temp;
	var arr_coll;
	var tmp_coll;
	var arr_users = [];
	var page_num = 1;
	var t_row;
	var t_de;
	var t_st;
	var datanum = document.getElementById("DataNum").value;
	document.getElementById("DataNum").onchange = function () {ViewNumChange();};
	document.getElementById("search").onclick = function () {FormShow("Search");};
	document.getElementById("Prev-Page").onclick = function () {page_num = (page_num == 1? 1 : page_num - 1); GridView();};
	document.getElementById("Next-Page").onclick = function () {page_num = (page_num == Math.ceil(data.length/datanum)? page_num : page_num + 1);GridView();};
	document.getElementById("save").onclick = function () {Save()};
	document.getElementById("t_Mddeadline").onchange = function () {pastDate(this.value)};
	document.getElementById("t_MdDepartment").onchange = function () {setMdcoll(this.value); $('#t_MdColl').selectpicker('val', arr_coll); tmp_coll = $('#t_MdColl').val();};
	getRight();
	FormShow("New");

	function getRight()
	{
		var depart = JSON.parse(role["U_department"]);
		for(var i = 0; i < depart.length; i++)
			$('#t_TpDepart').append(new Option(depart[i],depart[i]));
		$('#t_TpDepart').selectpicker('refresh');
		$('#t_TpDepart').selectpicker('selectAll');
	}
	function setMdcoll(depart)
	{
		//$('#t_MdColl').find('option').remove();
		$('#t_MdColl').empty();
		if(arr_users[depart] == undefined || arr_users[depart].length == 0)
		{
			arr_users[depart] = getUsers(depart);
		}
		for(var i = 0; i < arr_users[depart].length; i++)
			$('#t_MdColl').append(new Option(arr_users[depart][i]['U_name'],arr_users[depart][i]['U_id']));
		$('#t_MdColl').selectpicker('refresh');
	}
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
		if($('#t_TpDepart').length > 0)
			viewData.append("t_TpDepart", $('#t_TpDepart').val());
		if(document.getElementById("t_TpStatus").value != "")
			viewData.append("t_TpStatus", document.getElementById("t_TpStatus").value);
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
		request.open("POST", "TaskProcess.php");
		request.send(viewData);
		t_de = $('#t_TpDepart').val();
		t_st = document.getElementById("t_TpStatus").value;
	}
	function GridView()
	{	
		//grid資料依datanum 筆數顯示
		if (data == "nothing" || data.length == 0)
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
			var delay = "";
			for(;i < j; i++)
			{
				var today = new Date();
				if(Date.parse(data[i].T_deadline).valueOf() < Date.parse(today).valueOf() && (data[i].T_stat == 0 || data[i].T_stat == 1) && (data[i].T_finishdate == null || Date.parse(data[i].T_finishdate).valueOf() > Date.parse(data[i].T_deadline).valueOf()))
					delay = "(逾期)";
				else
					delay = "";
				var coll = "";
				T_coll = getName(data[i].T_coll);//.replace(/;+/g,',')
				for(var k = 0; k < T_coll.length; k++)
				{
					if(k > 0)
						coll = coll + ",";
					coll = coll + T_coll[k]['U_name'];
				}
				result = result +
					'<tr class = "full-msg" id = "row-' + i + '">' +
						'<td>' + data[i].T_subject + '</td>' +
						'<td>' + data[i].T_name + '</td>' +
						'<td>' + data[i].T_department + '</td>' + 
						'<td>' + data[i].T_deadline + '</td>' + 
						'<td>' + coll + '</td>' + 
						'<td>' + data[i].T_status + delay + '</td>' +						
						'<td>' ;
				if((role["U_id"] == data[i].M_recoder) || (role["U_role"] == 0))
				{
					result = result + '<button type="button" class="btn btn-primary btn-sm edit" data-toggle="modal" data-target="#myModal" id = "edit-' + i + '">編輯</button>' ;
					if(data[i].T_stat != 3)
					{
						result = result + '<button type="button" class="btn btn-danger btn-sm delete"  id = "delete-' + i + '">刪除</button>' ;
					}
				}
				if((data[i].T_coll.indexOf(role) > -1) || (role["U_role"]))
				{
					if(data[i].T_stat != 1)
					{
						result = result + '<button type="button" class="btn btn-success btn-sm finish"  id = "finish-' + i + '">完成</button>' ;
					}
					if(data[i].T_stat != 2)
					{
						result = result + '<button type="button" class="btn btn-warning btn-sm stop"  id = "stop-' + i + '">中止</button>' ;
					}
				}
				result = result + '</td>' + '</tr>';
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
		var pa = document.getElementsByName("page");
		for(var i = 0; i < pa.length; i++)
			pa[i].className = "btn btn-outline-primary btn-sm page_cnt";
		document.getElementById("Page-"+page_num).className = "btn btn-primary btn-sm page_cnt";
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
		if(confirm("是否確認"+act+"任務項目："+data[row].T_name+"？"))
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
						alert("任務項目："+data[row].T_name+act+"失敗！");
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
			'<button class = "btn btn-outline-primary btn-sm page_cnt" name = "page" id = "Page-'+(i+1)+'">'+(i+1)+'</button>';
		}
		document.getElementById("pagelist").innerHTML = btn;
		var page = document.getElementsByClassName("page_cnt");
		for(var i = 0; i < page.length; i++)
			page[i].onclick = function() {PageChange(this.id)};
	}
	
	//Edit
	function Edit(id)
	{
		t_row = id.substring(id.indexOf("-")+1);
		temp = data[t_row];
		
	}
	$('#myModal').on('show.bs.modal', function ()
	{
		setMdcoll("資訊");
		document.getElementById("hint").style.display='none';
		document.getElementById("t_MdDepartment").options[0].selected = true;
		document.getElementById("t_mdSubject").innerHTML = temp.T_subject;
		document.getElementById("t_mdName").innerHTML = temp.T_name;
		document.getElementById("t_Mddeadline").value = temp.T_deadline;
		if(temp.T_coll.indexOf(";") > -1)
		{
			arr_coll = temp.T_coll.split(';');
			arr_coll.splice(arr_coll.length-1,1);
		}
		else
			arr_coll = temp.T_coll.split(','); 
		$('#t_MdColl').selectpicker('val', arr_coll);
		tmp_coll = $('#t_MdColl').val();
		var tmp_name = "";
		var tmp = getName(arr_coll);
		for(var i = 0; i < arr_coll.length; i++)
		{
			if(i > 0)
				tmp_name = tmp_name + ",";
			tmp_name = tmp_name + tmp[i]['U_name'];
		}
		document.getElementById("t_Mdcoll_all").innerHTML = "協作者："+ tmp_name;
		document.getElementById("t_MdStatus").value = temp.T_stat;
	})
	$('#t_MdColl').on('change', function()
	{
		if(tmp_coll.length > $('#t_MdColl').val().length)
		{
			for(var i = 0; i < tmp_coll.length; i++)
			{
				if($('#t_MdColl').val().indexOf(tmp_coll[i]) == -1)
				{
					var j = arr_coll.indexOf(tmp_coll[i]); 
					arr_coll.splice(j,1);
				}
			}
		}
		else
		{
			var tt = $('#t_MdColl').val();
			for(var i = 0; i < tt.length; i++)
			{
				if(tmp_coll.indexOf(tt[i]) == -1)
				{
					arr_coll.splice(i,0,tt[i]);
				}
			}
		}
		tmp_coll = $('#t_MdColl').val();
		var tmp_name = "";
		var tmp = getName(arr_coll);
		for(var i = 0; i < arr_coll.length; i++)
		{
			if(i > 0)
				tmp_name = tmp_name + ",";
			tmp_name = tmp_name + tmp[i]['U_name'];
		}
		document.getElementById("t_Mdcoll_all").innerHTML = "協作者："+ tmp_name;
	});

	function Save()
	{
		temp.clear;
		$('#myModal').modal('hide');
		var saveData = new FormData();
		saveData.append("action", "Save");
		saveData.append("T_subject", document.getElementById("t_mdSubject").innerHTML);
		saveData.append("T_name", document.getElementById("t_mdName").innerHTML);
		saveData.append("T_deadline",document.getElementById("t_Mddeadline").value);
		saveData.append("T_coll", arr_coll);
		saveData.append("T_status", document.getElementById("t_MdStatus").value);
		var request = new XMLHttpRequest();
		request.onreadystatechange = function()
		{
			if(request.readyState == 4 && request.status == 200)
			{
				var r_data = JSON.parse(request.responseText);
				if((r_data != "儲存失敗！") && (r_data != "截止日期不能小於今日！"))
				{
					var check_de = false;
					for(var i = 0; i < t_de.length; i++)
					{
						if(r_data[0].T_department.join(",").indexOf(t_de[i]) > -1)
							check_de = true;
						
					}
					if((check_de) && (t_st == r_data[0].T_stat))
					{
						data.splice(t_row, 1, r_data[0]);
					}
					else
					{
						data.splice(t_row, 1);
					}
					GridView();
					PageList(data.length);
				}
				else
					alert(r_data);
			}
		};
		request.open("POST", "TaskProcess.php");
		request.send(saveData);
	}
}
document.write("<script src='Role.js'></script>");