# AtlasPlayer

基于图集的序列帧播放库

图集打包工具 => [GitHub 传送门 🚪](https://github.com/zenoslin/atlas-electron)

## Example

```js
import { AtlasPlayer } from "./AtlasPlayer.js";

let canvas = document.getElementById("atlasPlayer");
let player = new AtlasPlayer({
  canvas: canvas,
  atlas: "./crabAni.png",
  jsonPath: "./crabAni.json"
});
player.play();
```

## Todo

- [] stop Fn
- [] pause Fn
- [] destroy Fn
- [] set Fn
- [] loop Fn
- [] yoyo Fn
