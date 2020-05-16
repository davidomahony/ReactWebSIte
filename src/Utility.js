import { usePromiseTracker } from "react-promise-tracker";
import React from 'react';
import RiseLoader from "react-spinners/RiseLoader";

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