# AtlasPlayer

基于图集的序列帧播放库

图集打包工具 => [GitHub 传送门 🚪](https://github.com/zenoslin/atlas-electron)

## Example

```js
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
```

## Todo

- [x] stop Fn
- [x] destroy Fn
- [ ] pause Fn
- [ ] set Fn
- [ ] loop Fn
- [ ] yoyo Fn
