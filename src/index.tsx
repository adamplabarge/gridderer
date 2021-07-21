// @ts-nocheck
import React, { useRef, useState, useEffect } from 'react'

import { getTiles, MAGIC_NUMBER } from './utils'

const OFFEST = 1.1

export interface Props  {
  tilesCountX?: number
  tilesCountY?: number
}

export const Gridderer = ({
  tilesCountX = MAGIC_NUMBER,
  tilesCountY = MAGIC_NUMBER
}: Props) => {

  const canvasRef = useRef(null)


  const processImage = (image) => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')

    canvas.width = image.width
    canvas.height = image.height


    context.drawImage(image, 0, 0)
    const imageData = context.getImageData(0, 0, image.width, image.height).data
    context.clearRect(0, 0, image.width, image.height)

    const tileDim = ~~(image.width / tilesCountX) 
    const tiles = getTiles(tilesCountX, tilesCountY, imageData, tileDim, image.width)
  
    tiles.forEach((d,i) => context.putImageData(d, d.x * OFFEST, d.y * OFFEST))
  }

  const handleOnChange = (e) => {
    const reader = new FileReader()
    reader.readAsDataURL(e.target.files[0])
    reader.onload = () => {
      const img = new Image()
      img.src = reader.result
      img.onload = () => {
        processImage(img)
      }
    }
  }

  const handleOnSubmit = () => {
    console.log(imgSrc)
  }

  return <>
    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
      <input name="upload" type="file" onChange={handleOnChange} />
      <button type="submit" onClick={handleOnSubmit}>Upload</button>
    </div>
    <canvas ref={canvasRef} />
  </>
}