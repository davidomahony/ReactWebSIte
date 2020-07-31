import React from 'react';
import {ApiKey} from './Constants'

// FUnction below can probably go
export function cropUrlToSquare(height, width, url){
  const promise = new Promise((resolve, reject) => {
    try{
      let smallestSide = (height > width ? width : height) / 2
      let urlHandle = url.split('/')
      let dimensions = `crop=dim:[${Math.ceil((width / 2) - smallestSide)}, 
        ${Math.ceil((height / 2)  - smallestSide)},
        ${Math.ceil(smallestSide*2)},
        ${Math.ceil(smallestSide*2)}]`
      resolve(`https://process.filestackapi.com/${ApiKey}/${dimensions}/${urlHandle[urlHandle.length - 1]}`);
    }
    catch (Err){
      reject(`Error --> ${Err}`)
    }
  })
  return promise;
}

export function cropFileStackImage(x, y, width, url){
  const promise = new Promise((resolve, reject) => {
    try{
      let urlHandle = url.split('/')
      console.log(urlHandle.length);
      let dimensions = `crop=dim:[${Math.ceil(x < 0 ? 0 : x)}, ${Math.ceil(y < 0 ? 0 : y)},${Math.ceil(width)},${Math.ceil(width)}]`
      var result = `https://process.filestackapi.com/${ApiKey}/${dimensions}/${urlHandle[urlHandle.length - 1]}`;
      resolve({
        main: url,
        crop: result})
    }
    catch (Err){
      reject(`Error --> ${Err}`)
    }
  })
  return promise;
}

export function GetCropFromSocial (file, id){
    const promise = new Promise((resolve, reject) => {
        try{
            var img = new Image();
            img.onload = () => {
              if(img.height !== img.width){         
                cropUrlToSquare(img.height, img.width, file.url).then(res => {
                  resolve({result :res, id: id, main: file.url})
                })
              }
              else{
                resolve({result :file.url, id: id, main: file.url})
              }
            }
            img.src = file.url
        }
        catch (Err){
            reject(Err)
        }
    })
    return promise;
}

export function CropLocalImage (file, cropInfo){
  const promise = new Promise((resolve, reject) => {
    try
    {
        const reader = new FileReader();
        console.log(`Generating informaiton`); 
  
        reader.onload = async () => {
          var canvas = document.createElement('canvas');
          var context = canvas.getContext('2d');
          var imageObj = new Image();
          imageObj.onload = () => {
            canvas.height = canvas.width = cropInfo.width;
  
            context.drawImage(
              imageObj,
              cropInfo.x,
              cropInfo.y,
              cropInfo.width,
              cropInfo.width,
              0,
              0,
              cropInfo.width,
              cropInfo.width)
  
            canvas.toBlob((blob) => 
            {
              resolve({
                  main: reader.result,
                  crop: URL.createObjectURL(blob)})
            }, 'image/jpeg')
          }
          imageObj.src = reader.result;  
      }
      reader.readAsDataURL(file);
    }
    catch (Err)
    {
        reject("Failed" + Err)
    }
})
return promise;
}

export function GenerateImgInformation (file, id){
    const promise = new Promise((resolve, reject) => {
        try
        {
            const reader = new FileReader();
            console.log(`Generating informaiton`); 
      
            reader.onload = async () => {
              var canvas = document.createElement('canvas');
              var context = canvas.getContext('2d');
              var imageObj = new Image();
              imageObj.onload = () => {
                // draw cropped image
                var height = imageObj.height;
                var width = imageObj.width;
                let smallestSide = (height > width ? width : height) / 2
                var squareSide = Math.ceil(smallestSide*2);
                canvas.height = canvas.width = squareSide;
      
                context.drawImage(
                  imageObj,
                  Math.ceil((width / 2)) - smallestSide,
                  Math.ceil((height / 2)) - smallestSide,
                  squareSide,
                  squareSide,
                  0,
                  0,
                  squareSide,
                  squareSide)
      
                canvas.toBlob((blob) => 
                {
                  resolve({
                      main: reader.result,
                      id: id,
                      crop: URL.createObjectURL(blob)})
                }, 'image/jpeg')
              }
              imageObj.src = reader.result;  
          }
          reader.readAsDataURL(file);
        }
        catch (Err)
        {
            reject("Failed" + Err)
        }
    })
    return promise;
}