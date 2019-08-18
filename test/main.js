import AtlasPlayer from "./atlasPlayer.js";

let btn_init = document.getElementById("init");
btn_init.onclick = function() {
  initPlayer();
};

let btn_play = document.getElementById("play");
btn_play.onclick = function() {
  window.player.play();
};

let btn_stop = document.getElementById("stop");
btn_stop.onclick = function() {
  window.player.stop();
};

let btn_destroy = document.getElementById("destroy");
btn_destroy.onclick = function() {
  window.player.destroy();
};

async function initPlayer() {
  if (!window.player) {
    let json = {};
    await loadJson("./crabAni.json").then(res => {
      json = JSON.parse(res);
    });
    window.player = new AtlasPlayer({
      dom: document.getElementById("animation"),
      atlas: "./crabAni.png",
      json: json,
      fps: 8
    });
  }
}

function loadJson(jsonPath) {
  return new Promise((resolve, reject) => {
    let request = new XMLHttpRequest();
    request.open("get", jsonPath);
    request.send(null);
    request.onload = function() {
      if (request.status == 200) {
        /*返回状态为200，即为数据获取成功*/
        resolve(request.responseText);
      } else {
        reject();
      }
    };
  });
}
