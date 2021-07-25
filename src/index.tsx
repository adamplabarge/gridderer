// @ts-nocheck
import React, { useRef, useState, useEffect } from 'react'

import { getTiles, MAGIC_NUMBER, imagedataToImage } from './utils'

const GRID_OFFSET = 1.025

export interface iImageUploadProps  {
  tilesX?: number
  tilesY?: number
  gridOffset?: number
  onChange?: () => void
}

export const ImageUpload = ({
  tilesX = MAGIC_NUMBER,
  tilesY = MAGIC_NUMBER,
  gridOffset = GRID_OFFSET,
  onChange
}: iImageUploadProps) => {

  const canvasRef = useRef(null)

  const processImage = (image) => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')

    canvas.width = image.width
    canvas.height = image.height


    context.drawImage(image, 0, 0)
    const imageData = context.getImageData(0, 0, image.width, image.height).data
    context.clearRect(0, 0, image.width, image.height)

    const tileDim = ~~(image.width / tilesX) 
    const tiles = getTiles(tilesX, tilesY, imageData, tileDim, image.width)
    
    const base64ImageArray = []

    tiles.forEach(d => {
      base64ImageArray.push(imagedataToImage(d))
      context.putImageData(d, d.x * gridOffset, d.y * gridOffset)
    })

    return base64ImageArray
  }

  const handleOnChange = (e) => {
    const reader = new FileReader()
    reader.readAsDataURL(e.target.files[0])
    reader.onload = () => {
      const img = new Image()
      img.src = reader.result
      img.onload = () => {
        const base64ImageArray = processImage(img)
        if (onChange)
          onChange(base64ImageArray)
      }
    }
  }

  return <div>
    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
      <input name="upload" type="file" onChange={handleOnChange} />
    </div>
    <canvas ref={canvasRef} />
  </div>
}