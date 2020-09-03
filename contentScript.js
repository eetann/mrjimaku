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
      // TODO: 配列のスライスを指定して関数化
      var startTime = calcSecond(strArr.slice(1, 5))
      var endTime = calcSecond(strArr.slice(5, 9))
      // TODO: startとendで時間が矛盾してないか
      textTrack.addCue(new VTTCue(startTime, endTime, lines[i + 1]));
    }
  }
}

function onSelectFile() {
  var videos = document.getElementsByTagName("video");
  // TODO: 字幕をメニューに表示
  // TODO: 字幕の言語を任意で選択
  // TODO: 0以外の指定もできるようにする。
  var textTrack = videos[0].addTextTrack("captions", "日本語の字幕", "ja");
  // TODO: 0以外の指定もできるようにする。
  var jimakufile = document.getElementById("jimakufile");
  var reader = new FileReader();
  reader.onload = function () {
    srtParseAddCue(textTrack, reader.result);
    videos[0].textTracks[0].mode = "showing";
  }
  reader.readAsText(jimakufile.files[0]);
}

function main() {
  const jsInitCheckTimer = setInterval(isMetaLoaded, 1000);
  function isMetaLoaded() {
    var divmeta = document.getElementById("meta");
    if (divmeta) {
      clearInterval(jsInitCheckTimer);
      divmeta.insertAdjacentHTML("afterBegin", '<input type="file" id="jimakufile">');
      var elements = document.getElementById("jimakufile");
      elements.addEventListener("change", onSelectFile, false);
    }
  }
}

window.addEventListener("load", main, false);
