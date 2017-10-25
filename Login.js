window.onload = function ()
{
	FormShow();
	document.getElementById("check").onclick = function () { Check(); };
	document.getElementById("login").onclick = function () { Login(); };
	function FormShow()
	{
		var viewData = new FormData();
		viewData.append("action", "formshow");
		var request = new XMLHttpRequest();
		request.onreadystatechange = function()
		{
			if(request.readyState == 4 && request.status == 200)
			{
			}
		};
		request.open("POST", "Login.php");
		request.send(viewData);
	}
	function Check()
	{
		var str = "";
		if(document.getElementById("account").value == "")
			str = "帳號不可為空";
		else if(document.getElementById("password").value == "")
			str = "密碼不可為空";
		if(str == "")
		{
			var viewData = new FormData();
			viewData.append("action", "check");
			viewData.append("account", document.getElementById("account").value);
			viewData.append("password", document.getElementById("password").value);
			var request = new XMLHttpRequest();
			request.onreadystatechange = function()
			{
				if(request.readyState == 4 && request.status == 200)
				{
					if(request.responseText == true)
					{
						document.getElementById("login").click();
					}
					else
					{
						document.getElementById("hint").innerHTML = request.responseText;
						document.getElementById("hint").style.display = "block";
					}
				}
			};
			request.open("POST", "Login.php");
			request.send(viewData);
		}
		else
		{
			document.getElementById("hint").innerHTML = str;
			document.getElementById("hint").style.display = "block";
		}
	}
	function Login()
	{
		var viewData = new FormData();
		viewData.append("action", "login");
		viewData.append("account", document.getElementById("account").value);
		viewData.append("password", document.getElementById("password").value);
		var request = new XMLHttpRequest();
		request.onreadystatechange = function()
		{
			if(request.readyState == 4 && request.status == 200)
			{
				location.href = request.responseText;
			}
		};
		request.open("POST", "Login.php");
		request.send(viewData);
	}
}