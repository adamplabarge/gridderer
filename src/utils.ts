// @ts-nocheck
// from https://codepen.io/Escu/pen/KVLBYP

export const MAGIC_NUMBER = 4

function indexX(x, imgData) {
  var i = x * MAGIC_NUMBER
  if (i > imgData.length) console.warn("X out of bounds")
  return i
}

function indexY(y, imgData, imgW) {
  var i = imgW * MAGIC_NUMBER * y
  if (i > imgData.length) console.warn("Y out of bounds")
  return i
}

function getIndex(x, y, imgData, imgW) {
  var i = indexX(x, imgData) + indexY(y, imgData, imgW)
  if (i > imgData.length) console.warn("XY out of bounds")
  return i
}


function getTile(x, y, imgData, tileDim, imgW) {
  var tile = []

  for (var i = 0; i < tileDim; i++) {

    tile.push(...imgData.slice(
      getIndex(x, y + i, imgData, imgW),
      getIndex(x + tileDim, y + i, imgData, imgW)
    ));
  }

  tile = new ImageData(new Uint8ClampedArray(tile), tileDim, tileDim)

  tile.x = x
  tile.y = y
  return tile
}


export function getTiles(tileCountX, tileCountY, imgData, tileDim, imgW) {
  var tiles = []
  for (var yi = 0; yi < tileCountY; yi++) {
    for (var xi = 0; xi < tileCountX; xi++) {
      tiles.push(getTile(xi * tileDim, yi * tileDim, imgData, tileDim, imgW))
    }
  }
  return tiles
}

export function imagedataToImage(imagedata) {
  var canvas = document.createElement('canvas')
  var ctx = canvas.getContext('2d')
  canvas.width = imagedata.width
  canvas.height = imagedata.height
  ctx.putImageData(imagedata, 0, 0)

  var image = new Image()
  return canvas.toDataURL()
}