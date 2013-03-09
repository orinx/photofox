
window.onload = function(){
  checkInstall();
}

function readFiles(files){
    var formData = new FormData();
//no need to support multi file
/*    for (var i = 0, file; file = files[i]; ++i) {
        formData.append(file.name, file);
    }
*/
    formData.append(files[0].name, files[0]);

    var xhr = new XMLHttpRequest();
    xhr.open('POST', './data.php', true);
    xhr.onload = function(e) {
//      alert(this.responseText);
        var rst = JSON.parse(this.responseText);
//        alert(rst.file0.link);
        document.getElementById("linkBox").value = rst.file0.link;
        document.getElementById("linkBox").style.display ="";
    };

    xhr.send(formData);  // multipart/form-data
}

function uploadPhoto(){
  document.getElementById("fileElem").click();
}

function installApp(){

  var request = navigator.mozApps.install("http://192.168.1.128/photofox/install.webapp");
  request.onsuccess = function() {
    alert('Yay!');
  };
  request.onerror = function(evt) {
    alert('Error: ' + evt.target.error.name);
  };

}

function checkInstall(){

  var request = navigator.mozApps.getSelf();
  request.onerror = function() {
    alert('Error checking installation status: ' + this.error.message);
  };

  request.onsuccess = function() {
    if (request.result) {
      document.getElementById('install').style.display="none";
    }
  };

}

window.addEventListener('load', function hook(evt) {
  document.getElementById('uploadPhoto').addEventListener('click', uploadPhoto);
})

window.addEventListener('load', function hook(evt) {
  document.getElementById('install').addEventListener('click', installApp);
})
