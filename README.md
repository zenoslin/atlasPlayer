# AtlasPlayer

基于`canvas`的序列帧动画播放类, 使用图集素材播放序列帧动画。

> 图集打包工具可以使用 LayaAir 或者 Egret 的图集打包工具
>
> 自用图集打包工具 => [GitHub 传送门 🚪](https://github.com/zenoslin/atlas-electron)

## Example

引入：

```js
import AtlasPlayer from "./atlasPlayer.js";
```

初始化实例：

```js
window.onload = function() {
  let player = new AtlasPlayer({
    dom: document.getElementById("animation"),
    atlas: "./crabAni.png",
    json: json,
    fps: 8
  });
};
```

## Methods

AtlasPlayer 构造方法：

| arguments | type        | default | description     |
| --------- | ----------- | ------- | --------------- |
| dom       | HTMLElement | None    | 目标 DOM 对象   |
| atlas     | string      | None    | 序列帧图集图片  |
| json      | Object      | None    | 序列帧图集 JSON |
| fps       | number      | None    | 每秒播放的帧率  |

AtlasPlayer 对象的方法列表：

| functions | description        |
| --------- | ------------------ |
| init      | 初始化实例         |
| play      | 播放序列帧动画     |
| stop      | 停止播放序列帧动画 |
| destroy   | 销毁序列帧动画     |
