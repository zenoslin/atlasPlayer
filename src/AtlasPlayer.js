/**
 * @author       zenoslin <linze@tuzhanai.com>
 * @copyright    2019 zenos Lin.
 * @github       https://github.com/zenoslin/atlasPlayer
 */

export default class AtlasPlayer {
  constructor(options) {
    if (!options) {
      console.error('请设置参数！');
      return;
    }
    // 是否初始化完成
    this.initComplete = false;
    this.queueFn = [];

    // dom容器
    this.dom = options.dom;
    // 图集图片
    this.atlas = options.atlas;
    // 图集JSON对象
    this.json = options.json || {};
    // 图集JSON路径
    this.jsonPath = options.jsonPath || '';
    // 帧率
    this.fps = options.fps;

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
    // 当前帧
    this.curFrame = 0;

    // 正在播放
    this._isPlay = false;
    // 播放次数
    this._times = 0;
    this._width = 0;
    this._height = 0;
    this._canvas = null;

    this._isDestroy = false;

    this.init();
  }

  async init() {
    if (!this.dom) {
      console.error('请指定DOM！');
      return;
    }

    if (!this.atlas) {
      console.error('请指定图集！');
      return;
    }
    await this.loadImg(this.atlas);

    this.frames = this.json.frames;
    this.framesNum = Object.keys(this.frames).length;

    this._canvas = document.createElement('canvas');
    this._canvas.style.width = this._canvas.style.height = '100%';
    this.ctx = this._canvas.getContext('2d');
    this.dom.appendChild(this._canvas);

    if (this.frames['0.png']) {
      this._width = this._canvas.width = this.frames['0.png'].frame.w;
      this._height = this._canvas.height = this.frames['0.png'].frame.h;
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
    if (this._isDestroy) {
      console.warn(`player is destroy! need to init again`);
      return;
    }
    if (!this.initComplete) {
      this.queueFn.push({ fn: this.play, arguments: [] });
      return;
    }
    if (this._isPlay) {
      console.warn(`player is playing!`);
      return;
    }
    this._isPlay = true;
    let _this = this;
    this.intervalKey = setInterval(function() {
      _this.ctx.clearRect(0, 0, _this._width, _this._height);
      let info = _this.frames[`${_this.curFrame}.png`].frame;
      _this.ctx.drawImage(
        _this.imgDom,
        info.x,
        info.y,
        info.w,
        info.h,
        0,
        0,
        _this._width,
        _this._height
      );
      let isEndFrame = _this.curFrame >= _this.framesNum - 1;
      _this.curFrame = isEndFrame ? 0 : _this.curFrame + 1;
      if (isEndFrame) {
        this._times += 1;
      }
    }, 1000 / _this.fps);
  }

  stop() {
    if (this._isDestroy) {
      console.warn(`player is destroy! need to init again`);
      return;
    }
    if (!this._isPlay) {
      console.warn(`player had stop!`);
      return;
    }
    console.log(`player stop`);
    clearInterval(this.intervalKey);
    this._isPlay = false;
    this.curFrame = 0;
    this._times = 0;
  }

  destroy() {
    if (this._isDestroy) {
      console.warn(`player is destroy! need to init again`);
      return;
    }
    clearInterval(this.intervalKey);
    this.dom.removeChild(this._canvas);
    this._canvas = null;
    this._isDestroy = true;
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
