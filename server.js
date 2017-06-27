var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'd6F3Efeq';

var fs = require('fs');
var zlib = require('zlib');
var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
var request = require('request');
var cheerio = require('cheerio');
var formidable = require("formidable");

// input file
var r = fs.createReadStream('file.txt');
// zip content
var zip = zlib.createGzip();
// encrypt content
var encrypt = crypto.createCipher(algorithm, password);
// decrypt content
var decrypt = crypto.createDecipher(algorithm, password)
// unzip content
var unzip = zlib.createGunzip();
// write file
var w = fs.createWriteStream('file.out.txt');

// start pipe
r.pipe(zip).pipe(encrypt).pipe(decrypt).pipe(unzip).pipe(w);

http.createServer( function (request, response) {  
    if (request.method.toLowerCase() == 'get') {
        display(request,response);
    } else if (request.method.toLowerCase() == 'post') {
        processAllFieldsOfTheForm(request, response);
    }
}).listen(7000);
function display(req,res) {
  if(req.url.indexOf('.html') != -1){ //req.url has the pathname, check if it conatins '.html'
      if(req.url.indexOf('/index.html') != -1){
        var domain = "";
        //sleep.sleep(5);
        fs.readFile(__dirname + '/index.html', function (err, data) {
          if (err) console.log(err);
          res.writeHead(200, {'Content-Type': 'text/html'});
          res.write(data);
          res.end();
        });
      }
  }
}
function processAllFieldsOfTheForm(req, res) {
    var form = new formidable.IncomingForm();
    // #console.log("kk");  
    form.parse(req, function (err, fields, files) {

    });
    res.writeHead(302, {
            'Location': '/auth.html'
            });
        res.end();
}
