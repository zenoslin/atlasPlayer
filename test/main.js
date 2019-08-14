import AtlasPlayer from "./atlasPlayer.js";

window.onload = function() {
  let canvas = document.getElementById("atlasPlayer");
  let player = new AtlasPlayer({
    canvas: canvas,
    atlas: "./crabAni.png",
    json: atlasJson
  });
  player.play();
};

let atlasJson = {
  frames: {
    "8.png": {
      frame: { x: 0, y: 0, w: 42, h: 36, idx: 0 },
      spriteSourceSize: { x: 0, y: 0 },
      sourceSize: { w: 42, h: 36 }
    },
    "4.png": {
      frame: { x: 44, y: 0, w: 42, h: 36, idx: 0 },
      spriteSourceSize: { x: 0, y: 0 },
      sourceSize: { w: 42, h: 36 }
    },
    "5.png": {
      frame: { x: 88, y: 0, w: 42, h: 36, idx: 0 },
      spriteSourceSize: { x: 0, y: 0 },
      sourceSize: { w: 42, h: 36 }
    },
    "7.png": {
      frame: { x: 0, y: 38, w: 42, h: 36, idx: 0 },
      spriteSourceSize: { x: 0, y: 0 },
      sourceSize: { w: 42, h: 36 }
    },
    "6.png": {
      frame: { x: 0, y: 76, w: 42, h: 36, idx: 0 },
      spriteSourceSize: { x: 0, y: 0 },
      sourceSize: { w: 42, h: 36 }
    },
    "2.png": {
      frame: { x: 44, y: 38, w: 42, h: 36, idx: 0 },
      spriteSourceSize: { x: 0, y: 0 },
      sourceSize: { w: 42, h: 36 }
    },
    "3.png": {
      frame: { x: 88, y: 38, w: 42, h: 36, idx: 0 },
      spriteSourceSize: { x: 0, y: 0 },
      sourceSize: { w: 42, h: 36 }
    },
    "1.png": {
      frame: { x: 44, y: 76, w: 42, h: 36, idx: 0 },
      spriteSourceSize: { x: 0, y: 0 },
      sourceSize: { w: 42, h: 36 }
    },
    "0.png": {
      frame: { x: 88, y: 76, w: 42, h: 36, idx: 0 },
      spriteSourceSize: { x: 0, y: 0 },
      sourceSize: { w: 42, h: 36 }
    }
  },
  meta: {
    app: "http://www.layabox.com",
    version: "1.00",
    format: "json",
    scale: 1,
    image: "crabAni.png",
    prefix: "",
    md5: "c9aee998dd068fdf326cebeb8ef97d70"
  }
};
