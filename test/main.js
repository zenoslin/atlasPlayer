window.onload = function() {
  let dom = document.getElementById("animation");
  let player = new AtlasPlayer({
    dom: dom,
    atlas: "./crabAni.png",
    jsonPath: "./crabAni.json",
    fps: 8
  });
  player.play();
};
