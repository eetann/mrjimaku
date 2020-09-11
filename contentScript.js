function calcSecond(strArr) {
  return parseInt(strArr[0], 10) * 3600 +
    parseInt(strArr[1], 10) * 60 +
    parseInt(strArr[2], 10) +
    parseInt(strArr[3], 10) * 0.001;
}

function srtParseAddCue(textTrack, text) {
  // TODO: utf-8以外のとき
  var lines = text.split(/\r\n|\r|\n/);
  var timestamp = "(\\d{2}):(\\d{2}):(\\d{2}),(\\d{3})";
  var re = new RegExp("^" + timestamp + "\\s*-->\\s*" + timestamp);
  for (var i = 0, len = lines.length; i < len; i++) {
    var strArr = lines[i].match(re);
    if (strArr) {
      var startTime = calcSecond(strArr.slice(1, 5))
      var endTime = calcSecond(strArr.slice(5, 9))
      textTrack.addCue(new VTTCue(startTime, endTime, lines[i + 1]));
    }
  }
  textTrack.mode = "showing";
}

function onSelectFile() {
  var video = document.getElementsByTagName("video")[0];
  // 他の字幕をオフにする
  var toggleSwitch = document.getElementById("myToggleButton");
  toggleSwitch.setAttribute("disabled", true);
  toggleSwitch.checked = false;
  if (video.textTracks.length > 0) {
    video.textTracks[video.textTracks.length - 1].mode = "disabled";
  }
  // 字幕を追加する
  var textTrack = video.addTextTrack("captions", "Mr.Jimaku");
  var jimakufile = document.getElementById("jimakufile");
  var reader = new FileReader();
  reader.onload = () => {
    srtParseAddCue(textTrack, reader.result);
    toggleSwitch.removeAttribute("disabled");
    toggleSwitch.checked = true;
  }
  reader.readAsText(jimakufile.files[0]);
}

function main() {
  // 表示されるまで要素が取得できないので待つ
  var url = location.href;
  if (url.match("watch")) {
    const jsInitCheckTimer = setInterval(isMetaLoaded, 1000);
    function isMetaLoaded() {
      var divmeta = document.getElementById("meta");
      if (divmeta) {
        clearInterval(jsInitCheckTimer);
        var mrArea = [
          '<div id="MrJimakuArea">',
          '<div class="mySimpleGray myUploadButton">select a caption file',
          '<input type="file" id="jimakufile" ',
          'onchange="uv.value = this.files[0].name;" />',
          '<input type="text" id="uv" class="myUploadValue" disabled />',
          '</div>',
          '<div class="myToggleSwitchArea">',
          '<span class="mySimpleGray">your caption</span>',
          '<input id="myToggleButton" type="checkbox" disabled/>',
          '<label for="myToggleButton" id="myToggleBar"/>',
          '</div>',
          '</div>'
        ].join('');
        divmeta.insertAdjacentHTML("beforebegin", mrArea);
        var toggleSwitch = document.getElementById("myToggleButton");
        toggleSwitch.addEventListener("change", (event) => {
          var video = document.getElementsByTagName("video")[0];
          var value = event.target.checked;
          if (value) {
            video.textTracks[video.textTracks.length - 1].mode = "showing";
          } else {
            video.textTracks[video.textTracks.length - 1].mode = "disabled";
          }
        })
        var elements = document.getElementById("jimakufile");
        elements.addEventListener("change", onSelectFile, false);
      }
    }
  }
}

window.addEventListener("load", main, false);
