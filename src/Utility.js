

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