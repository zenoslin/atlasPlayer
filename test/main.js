import { AtlasPlayer } from "./AtlasPlayer.js";

window.onload = function() {
  var canvas = document.getElementById("atlasPlayer");
  AtlasPlayer(canvas, "./crabAni.png");
};
