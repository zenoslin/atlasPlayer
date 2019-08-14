import AtlasPlayer from "./atlasPlayer.js";

window.onload = function() {
  let canvas = document.getElementById("atlasPlayer");
  let player = new AtlasPlayer({
    canvas: canvas,
    atlas: "./crabAni.png",
    jsonPath: "./crabAni.json"
  });
  player.play();
};
