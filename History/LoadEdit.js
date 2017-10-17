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
		return vars[0].substring(vars[0].indexOf("=")+1);
	}
}
function getContent(id)
{
	//用AJAX取得MEETING資料
	//寫入資料
}
//原有PHP存檔後CALL
function saveEdit(id)
{
	//用PHP將STATUS改為0(預設1)
}