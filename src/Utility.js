import { usePromiseTracker } from "react-promise-tracker";
import React from 'react';
import RiseLoader from "react-spinners/RiseLoader";

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
    let dimensions = `crop=dim:[${(width / 2) - smallestSide}, ${(height / 2)  - smallestSide},${smallestSide*2},${smallestSide*2}]`
    return `https://process.filestackapi.com/${api}/${dimensions}/${urlHandle[urlHandle.length - 1]}`;
}

export const LoadingIndicator = props => {
    const { promiseInProgress } = usePromiseTracker();
    return (
        promiseInProgress && 
        <RiseLoader
        css=""
        size={15}
        color={"#123abc"}
        loading={true}
    />
    );  
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