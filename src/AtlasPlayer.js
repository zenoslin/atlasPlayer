export default class AtlasPlayer {
  constructor(options) {
    let _this = this;
    if (!options) {
      console.error("请设置参数！");
      return;
    }
    // 是否初始化完成
    this.initComplete = false;
    this.queueFn = [];

    // canvas
    this.canvas = options.canvas;
    // 图集图片
    this.atlas = options.atlas;
    // 图集JSON
    this.json = options.json;

    // 图集的加载DOM
    this.imgDom = new Image();
    // 循环播放Key
    this.intervalKey = null;
    // 帧集合
    this.frames = null;
    // 帧总数
    this.framesNum = null;
    // 二维渲染上下文
    this.ctx = null;
    // 帧率
    this.fps = null;
    // 当前帧
    this.index = null;

    this.init();
  }

  async init() {
    if (!this.atlas) {
      console.error("请指定图集！");
      return;
    }
    await this.loadImg(this.atlas);

    if (!this.json) {
      console.error("缺少图集的JSON！");
      return;
    }
    this.frames = this.json.frames;
    this.framesNum = Object.keys(this.frames).length;

    this.ctx = this.canvas.getContext("2d");
    this.fps = 8;
    this.index = 0;

    if (this.frames["0.png"]) {
      this.canvas.width = this.frames["0.png"].frame.w;
      this.canvas.height = this.frames["0.png"].frame.h;
    } else {
      console.error(`缺少初始帧 0.png`);
      return;
    }
    this.initComplete = true;
    if (this.queueFn.length > 0) {
      let _this = this;
      this.queueFn.map(function(item) {
        item.fn.call(_this, ...item.arguments);
      });
      this.queueFn = [];
    }
  }

  play() {
    if (!this.initComplete) {
      this.queueFn.push({ fn: this.play, arguments: [] });
      return;
    }
    let _this = this;
    this.interval = setInterval(function() {
      _this.ctx.clearRect(0, 0, _this.canvas.width, _this.canvas.height);
      let info = _this.frames[`${_this.index}.png`].frame;
      _this.ctx.drawImage(
        _this.imgDom,
        info.x,
        info.y,
        info.w,
        info.h,
        0,
        0,
        _this.canvas.width,
        _this.canvas.height
      );
      _this.index = _this.index < _this.framesNum - 1 ? _this.index + 1 : 0;
    }, 1000 / _this.fps);
  }

  loadImg(imgUrl) {
    return new Promise((resolve, reject) => {
      this.imgDom.onload = function() {
        resolve();
      };
      this.imgDom.onerror = function() {
        reject(new Error(`无法加载图片${imgUrl}`));
      };
      this.imgDom.src = imgUrl;
    });
  }
}
