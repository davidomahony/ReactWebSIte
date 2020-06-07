import React from 'react';
import axios from 'axios'

import './Common.scss'

export function  ConvertUrlToFile(dataURI, type, name) {
    var byteString = atob(dataURI.split(',')[1]);
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    let blob = new Blob([ab], { type: type })
    blob.lastModifiedDate = new Date();
    blob.name = name;
    return  blob;
}

export function cropUrlToSquare(height, width, url, api){
    let smallestSide = (height > width ? width : height) / 2
    let urlHandle = url.split('/')
    console.log(urlHandle.length);
    let dimensions = `crop=dim:[${Math.ceil((width / 2) - smallestSide)}, ${Math.ceil((height / 2)  - smallestSide)},${Math.ceil(smallestSide*2)},${Math.ceil(smallestSide*2)}]`
    return `https://process.filestackapi.com/${api}/${dimensions}/${urlHandle[urlHandle.length - 1]}`;
}

export const LoadingScreen = props =>{
    return(
        <div class="grid-container" >
            <div class="sk-cube-grid">
                <div class="sk-cube sk-cube1"></div>
                <div class="sk-cube sk-cube2"></div>
                <div class="sk-cube sk-cube3"></div>
                <div class="sk-cube sk-cube4"></div>
            </div>
        </div>
    )
}

export function GetCropFromSocial (file){
    const promise = new Promise((resolve, reject) => {
        try{
            let fileurl = file.url;
            let fileType = file.type;
            let fileName = file.name;
            var img = new Image();
            img.onload = () => {
              var height = img.height;
              var width = img.width;
              let result = '';
              if(height !== width){         
                result = cropUrlToSquare(height, width, fileurl, "AwDUla4uRT3GfDinUA6t9z")
              }
              else{
                result = fileurl
              }
              console.log('resolving soon')
              resolve(result)
            }
            img.src = fileurl
        }
        catch (Err){
            reject(Err)
        }
    })
    return promise;
  }



export function GenerateImgInformation (file){
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

export function UploadImage (file) {
    const promise = new Promise((resolve, reject) => {
        try
        {
            try {
                axios.post('https://ogiwiln1l8.execute-api.eu-west-1.amazonaws.com/develop/presigned-post-data?name=' + file.name).then(response =>{
                 try
                 {
                     console.log(file)
                  axios.put(response.data.signed_url, file).then(r => {
                    console.log('result >')
                    console.log(r)
                    resolve("Normal --> " + Date.now()) 
                  })
                 }
                 catch (Err) {
                    reject("Failed" + Err)
                 }
                
                }).catch(res => console.log(res))
              } catch (Err) {
                reject("Failed" + Err)
              }
              
        }
        catch (Err)
        {
            reject("Failed" + Err)
        }
    })
    return promise;
}