class AtlasPlayer {
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
    this.dom = options.dom;
    // 图集图片
    this.atlas = options.atlas;
    // 图集JSON路径
    this.jsonPath = options.jsonPath;
    // 帧率
    this.fps = options.fps;

    // 图集的加载DOM
    this.imgDom = new Image();
    // 图集JSON对象
    this.json = {};
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

    this.init();
  }

  async init() {
    if (!this.dom) {
      console.error("请指定DOM！");
      return;
    }

    if (!this.atlas) {
      console.error("请指定图集！");
      return;
    }
    await this.loadImg(this.atlas);

    if (!this.jsonPath) {
      console.error("缺少图集的JSON！");
      return;
    }

    await this.loadJson(this.jsonPath).then(res => {
      this.json = JSON.parse(res);
    });

    this.frames = this.json.frames;
    this.framesNum = Object.keys(this.frames).length;

    let canvas = document.createElement("canvas");
    canvas.style.width = canvas.style.height = "100%";
    this.ctx = canvas.getContext("2d");
    this.dom.appendChild(canvas);

    if (this.frames["0.png"]) {
      this._width = canvas.width = this.frames["0.png"].frame.w;
      this._height = canvas.height = this.frames["0.png"].frame.h;
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
    clearInterval(this._interval);
    this._isPlay = false;
    this.curFrame = 0;
    this._times = 0;
  }

  destroy() {
    clearInterval(this.intervalKey);
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

  loadJson(jsonPath) {
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
}
