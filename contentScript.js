function calcSecond(strArr) {
  return parseInt(strArr[0], 10) * 3600 +
    parseInt(strArr[1], 10) * 60 +
    parseInt(strArr[2], 10) +
    parseInt(strArr[3], 10) * 0.001;
}

function srtParseAddCue(textTrack, text) {
  // TODO: utf-8以外のとき
  var lines = text.split(/\r\n|\r|\n/);
  var timestamp = "(\\d{2})：(\\d{2})：(\\d{2}),(\\d{3})";
  var re = new RegExp("^" + timestamp + "\\s*-->\\s*" + timestamp);
  for (var i = 0, len = lines.length; i < len; i++) {
    var strArr = lines[i].match(re);
    if (strArr) {
      var startTime = calcSecond(strArr.slice(1, 5))
      var endTime = calcSecond(strArr.slice(5, 9))
      // TODO: startとendで時間が矛盾してないか
      textTrack.addCue(new VTTCue(startTime, endTime, lines[i + 1]));
    }
  }
}

function onSelectFile() {
  var videos = document.getElementsByTagName("video");
  // TODO: 0以外の指定もできるようにする。
  var textTrack = videos[0].addTextTrack("captions", "Mr.Jimaku");
  var jimakufile = document.getElementById("jimakufile");
  var reader = new FileReader();
  reader.onload = function () {
    srtParseAddCue(textTrack, reader.result);
    videos[0].textTracks[0].mode = "showing";
    // 字幕切り替えボタンの設置
    var divMrJimakuArea = document.getElementById("MrJimakuArea");
    var divToggleSwitchArea = [
      '<div class="myToggleSwitchArea">',
      '<span class="mySimpleGray">your caption</span>',
      '<input id="myToggleButton" type="checkbox" checked/>',
      '<label for="myToggleButton" id="myToggleBar"/>',
      '</div>',
    ].join('');
    divMrJimakuArea.insertAdjacentHTML("beforeend", divToggleSwitchArea);
    var toggleSwitch = document.getElementById("myToggleButton");
    toggleSwitch.addEventListener("change", (event) => {
      // アローなので、継承してくれる
      var value = event.target.checked;
      if (value) {
        videos[0].textTracks[0].mode = "showing";
      } else {
        videos[0].textTracks[0].mode = "disabled";
      }
    })
  }
  reader.readAsText(jimakufile.files[0]);
}

function main() {
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
        '</div>'
      ].join('');
      divmeta.insertAdjacentHTML("beforebegin", mrArea);
      var elements = document.getElementById("jimakufile");
      elements.addEventListener("change", onSelectFile, false);
    }
  }
}

window.addEventListener("load", main, false);
