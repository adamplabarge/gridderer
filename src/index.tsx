// @ts-nocheck
import React, { useRef, useState, useEffect } from 'react'

export interface Props  {
  
}

export const Gridderer = (props: Props) => {

  const canvasRef = useRef(null)

  const [image, setImage] = useState(null)
  
  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')

    if (image) {
      canvas.width = image.width
      canvas.height = image.height
      context.drawImage(image, 0, 0)
    }

  }, [image])

  const handleOnChange = (e) => {
    
    const reader = new FileReader()

    reader.readAsDataURL(e.target.files[0])

    reader.onload = () => {
      const img = new Image()
      img.src = reader.result
      img.onload = () => {
        setImage(img)
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

function init() {
  imgW = img.width;
  imgH = img.height;
  //check how many full tiles we can fit
  //right and bottom sides of the image will get cropped
  tileCountX = ~~(imgW / tileDim);
  tileCountY = ~~(imgH / tileDim);

  ctx.drawImage(img, 0, 0);
  imgData = ctx.getImageData(0, 0, imgW, imgH).data;
  ctx.clearRect(0, 0, w, h);
}