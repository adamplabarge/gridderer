// @ts-nocheck
import React, { useRef, useState, useEffect } from 'react'

import { getTiles, MAGIC_NUMBER, imagedataToImage } from './utils'

const GRID_OFFSET = 1.025

export interface Props  {
  tilesCountX?: number
  tilesCountY?: number
  gridOffset?: number
}

export const Gridderer = ({
  tilesCountX = MAGIC_NUMBER,
  tilesCountY = MAGIC_NUMBER,
  gridOffset = GRID_OFFSET
}: Props) => {

  const canvasRef = useRef(null)
  
  const [tiles, setTiles] = useState([])
  let data = []

  useEffect(() => {
    if (tiles.length) {
      const canvas = canvasRef.current
      const context = canvas.getContext('2d')

      tiles.forEach(d => {
        data.push(imagedataToImage(d))
        context.putImageData(d, d.x * gridOffset, d.y * gridOffset)
      })
    }
  }, [tiles])

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
    
    setTiles(tiles)
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

  return <div>
    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
      <input name="upload" type="file" onChange={handleOnChange} />
    </div>
    <canvas ref={canvasRef} />
  </div>
}