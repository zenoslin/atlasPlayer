export const AtlasPlayer = async function($canvas, $imgUrl) {
  if (!$canvas) {
    console.log(`缺少指定canvas`);
    return;
  }
  let jsonPath = $imgUrl.replace(".png", ".json");
  let json;
  await loadJson(jsonPath)
    .then(res => {
      json = JSON.parse(res);
    })
    .catch(() => {
      console.log(`找不到json文件`);
    });
  const imgDom = new Image();
  await loadImg(imgDom, $imgUrl);

  let frames = json.frames;
  let keyArr = Object.keys(frames);
  let framesNum = keyArr.length;

  let ctx = $canvas.getContext("2d");
  let fps = 8;
  let index = 0;

  if (frames["0.png"]) {
    $canvas.width = frames["0.png"].frame.w;
    $canvas.height = frames["0.png"].frame.h;
  } else {
    console.log(`缺少初始帧 0.png`);
  }

  let interval = setInterval(function() {
    ctx.clearRect(0, 0, $canvas.width, $canvas.height);
    let info = frames[`${index}.png`].frame;
    ctx.drawImage(
      imgDom,
      info.x,
      info.y,
      info.w,
      info.h,
      0,
      0,
      $canvas.width,
      $canvas.height
    );
    index = index < framesNum - 1 ? index + 1 : 0;
  }, 1000 / fps);
};

function loadJson($jsonPath) {
  return new Promise((resolve, reject) => {
    let request = new XMLHttpRequest();
    request.open("get", $jsonPath);
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

function loadImg($dom, $imgUrl) {
  return new Promise((resolve, reject) => {
    $dom.onload = function() {
      resolve();
    };
    $dom.onerror = function() {
      reject(new Error(`无法找到图片${$imgUrl}`));
    };
    $dom.src = $imgUrl;
  });
}
