var fs = require('fs');
var youtubedl = require('youtube-dl');

function fetcher(url)
{
    var video = youtubedl(url,
    // Optional arguments passed to youtube-dl. 
    ['--format=18'],
    // Additional options can be given for calling `child_process.execFile()`. 
    { cwd: __dirname });
    
    // Will be called when the download starts. 
    video.on('info', function(info) {
    console.log('Download started');
    console.log('filename: ' + info.filename);
    console.log('size: ' + info.size);
    });
    
    video.pipe(fs.createWriteStream('myvideo.mp4'));
}