function getRole()
{
	var role = [];
	var viewData = new FormData();
	viewData.append("action", "getrole");
	var request = new XMLHttpRequest();
	request.onreadystatechange = function()
	{
		if(request.readyState == 4 && request.status == 200)
		{
			if(JSON.parse(request.responseText) != "false")
				role = JSON.parse(request.responseText);
			else
				location.href = "Login.html";
		}
	};
	request.open("POST", "Login.php", false);
	request.send(viewData);
	return role;
}
function getName(n)
{
	var name = [];
	var viewData = new FormData();
	viewData.append("action", "getname");
	viewData.append("name", n);
	var request = new XMLHttpRequest();
	request.onreadystatechange = function()
	{
		if(request.readyState == 4 && request.status == 200)
		{
			name = JSON.parse(request.responseText);
		}
	};
	request.open("POST", "Login.php", false);
	request.send(viewData);
	return name;	
}
function getUsers(department)
{
	var users = [];
	var viewData = new FormData();
	viewData.append("action", "getusers");
	viewData.append("depart", department);
	var request = new XMLHttpRequest();
	request.onreadystatechange = function()
	{
		if(request.readyState == 4 && request.status == 200)
		{
			users = JSON.parse(request.responseText);
		}
	};
	request.open("POST", "Login.php", false);
	request.send(viewData);
	return users;
}