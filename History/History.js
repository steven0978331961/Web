window.onload = function ()
{
	//1.畫面存取─PHP取前5筆資料，寫資料進Grid，寫頁數
	//2.查詢─PHP取所有資料，寫資料進Grid，寫頁數
	//3.頁數Grid讀取
	//4.Detail popup window
	//5.刪除資料
	//6.跳頁至AddMeeting並帶入資料
	var data;
	var grid;
	var page_num = 1;
	var type = '';
	var datanum = document.getElementById("DataNum").value;
	document.getElementById("search").onclick = function() {FormShow("Search")};
	document.getElementById("Prev-Page").onclick = function () {page_num = page_num == 1? 1 : page_num - 1; GridView();};
	document.getElementById("Next-Page").onclick = function () {page_num = page_num == Math.ceil(page_num/datanum)? page_num : page_num + 1; GridView();};
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
				console.log(request.responseText);
				data = JSON.parse(request.responseText);
				GridView();
				PageList();
			}
		};
		request.open("POST", "History.php");
		request.send(viewData);
	}
	function GridView()
	{
		//grid資料依datanum 筆數顯示
		grid = data.historys;
		if (data == "nothing")
		{
			result = '<tr><td colspan = 8 >查無資料</td></tr>';
		}
		else
		{
			var j = datanum;
			var i = (page_num-1)*datanum;
			if ((grid.length-i) < datanum)
				j = grid.length;
			var result = "";
			for(;i < j; i++)
			{
				result = result +
					'<tr class = "full-msg" id = "' + grid[i].pk + '">' +
						'<td>' + grid[i].M_date + '</td>' +
						'<td>' + grid[i].M_subject + '</td>' +
						'<td>' + grid[i].M_department + '</td>' + 
						'<td>' + grid[i].M_users + '</td>' + 
						'<td>' + grid[i].M_files + '</td>' + 					
						'<td>' +
							'<button class="detail" type="button" id="detail-' + grid[i].pk + '"></button>' +
							'<button name="edit" class="edit" type="button" id="edit-' + grid[i].pk + '"></button>' +
							'<button class="delete" type="button" id="delete-' + grid[i].pk + '"></button>' +
						'</td>' +
					'</tr>';
			}
		}
		document.getElementById("result").innerHTML = result;
	}
	function PageList(num)
	{
		//頁數顯示
		var j = Math.ceil(num/datanum);
		var btn = "";
		for (i = 0; i < j; i++)
		{
			btn = btn + 
			'<li><a href = "#" id="Page-'+(i+1)+'">'+(i+1)+'</a></li>';
		}
	}
}