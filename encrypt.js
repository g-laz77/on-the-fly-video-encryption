function processFile(evt) {
    var file = evt.target.files[0],
        reader = new FileReader();

    reader.onload = function(e) {
        var data = e.target.result,
            iv = crypto.getRandomValues(new Uint8Array(16));
      
        crypto.subtle.generateKey({ 'name': 'AES-CBC', 'length': 256 }, false, ['encrypt', 'decrypt'])
            .then(key => crypto.subtle.encrypt({ 'name': 'AES-CBC', iv }, key, data) )
            .then(encrypted => {
                console.log(encrypted);
                alert('The encrypted data is ' + encrypted.byteLength + ' bytes long'); // encrypted is an ArrayBuffer
            })
            .catch(console.error);
    }

    reader.readAsArrayBuffer(file);   
}