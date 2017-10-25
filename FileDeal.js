
/* 
* test.js
*/


var i = 0;

// 開啟選擇檔案的對話框，讓使用者可以選擇檔案
function open_file_option() {
document.getElementById("file").click();
}

function Send_FileName(File_Name){
	
  for(var i=0;i<File_Name.length;i++){
   window.parent.File_Name.push(File_Name[i].name);
   	}

  
}

// 檔案選擇好之後，會呼叫這個方法
function fileSelected() {
if (checkFilePass()) { // 檢查每一個檔案格式、大小...確認沒問題，才可以上傳
    uploadFile();
}
}

// 檢查檔案格式、大小
function checkFilePass() {
    var files = document.getElementById('file').files;
    for (var i = 0; i < files.length; i++) {
        if (files[i].type === 'image/jpeg'|| files[i].type === 'image/png') {
            if (files[i].size > 2 * 1024 * 1024) {
                alert("單一圖片不可以超過 2 MB：" + files[i].name);
                return false;
            }
        } 
        else {
            alert(" 不支持格式：" + files[i].name);
        return false;
        }
    } 
    return true;
}

// 上傳檔案的 "前置作業"
function uploadFile() {
	try {
	    var files = document.getElementById('file').files;
	    for (var i = 0; i < files.length; i++) {
	        var progressNumber = "progressNumber" + i;
	        var serverReturnMessage = "serverReturnMessage" + i;

	        var fileSize = "0 KB";
	        if (files[i].size > 1024 * 1024 * 1024) {
	            fileSize = Math.round(files[i].size / 1024 / 1024 / 1024) + " GB";}
	        else if (files[i].size > 1024 * 1024) {
	            fileSize = Math.round(files[i].size / 1024 / 1024) + " MB";} 
	        else if (files[i].size > 1024) {
	        	fileSize = Math.round(files[i].size / 1024) + " KB";} 
	        else if (files[i].size <= 1024) {
	        	fileSize = files[i].size + " B";
	        }

	    // 上傳之前，先把表格建立好，包含檔案名稱、大小
	    document.getElementById('show').innerHTML 
	    += "<tr>"
	    + "<td align=\"center\">" + files[i].name + "</td>"
	    + "<td align=\"center\">" + fileSize + "</td>"
	    + "<td align=\"center\" id=\"" + progressNumber + "\">waiting...</td>"
	    + "<td align=\"center\" id=\"" + serverReturnMessage + "\"></td>"
	    + "</tr>";
	    }
	    upload(); // 第一次呼叫 upload()
	    } 
	catch (e) {
	    alert('Error : ' + e);
	}
}

// 上傳成功，呼叫這個方法
function uploadComplete(evt) {
    var serverReturnMessage = "serverReturnMessage" + i;
    document.getElementById(serverReturnMessage).innerHTML = evt.target.responseText;

    var files = document.getElementById('file').files;
    if ((i++) < files.length) {
        upload(); // 遞迴呼叫 upload()，會等待上一個檔案下載好之後，才會下載另一個檔案
    } 
    if(i==files.length){

    	Send_FileName(files);

    }
}

function uploadFailed(evt) {
    alert('發生錯誤');
}

function uploadCanceled(evt) {
    alert('取消上傳');
}

// 上傳檔案 (一個時間點只會有一個檔案被上傳)
function upload() {
    var files = document.getElementById('file').files;
    var progressNumber = 'progressNumber' + i;

	var fd = new FormData();
	fd.append('file', files[i]);
	fd.append('id', document.getElementById('id').value);
	var xhr = new XMLHttpRequest();
	xhr.upload.addEventListener('progress', function (evt) { // 顯示上傳進度
	if (evt.lengthComputable) {
	    var percentComplete = Math.round(evt.loaded * 100 / evt.total);
	    document.getElementById(progressNumber).innerHTML = percentComplete.toString() + '%';
	} 
	else {
	    document.getElementById(progressNumber).innerHTML = 'unable to compute';
	}
	}, false);
	xhr.addEventListener("load", uploadComplete, false);
	xhr.addEventListener("error", uploadFailed, false);
	xhr.addEventListener("abort", uploadCanceled, false);
	xhr.open('POST', 'AddMeeting.php', true); // 上傳 URL + 非同步上傳
	xhr.send(fd);
}