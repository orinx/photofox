
window.onload = function(){
  checkInstall();
}

function readFiles(files){
    var formData = new FormData();

    for (var i = 0, file; file = files[i]; ++i) {
        formData.append(file.name, file);
      }

    var xhr = new XMLHttpRequest();
    xhr.open('POST', './data.php', true);
//    xhr.onload = function(e) { ... };

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
