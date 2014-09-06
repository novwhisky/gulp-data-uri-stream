var through = require('through2');
var mime = require('mime');
var gutil = require('gulp-util');

function URIfy() {
    // creating a stream through which each file will pass
    var stream = through.obj(function(file, enc, cb) {

        // buffers only for now
        if(file.isBuffer()) {
            var header = "data:" + mime.lookup(file.path) + ";base64,";
            var dURI = header + file.contents.toString('base64');

            file.contents = new Buffer(dURI);
        }else{
            this.emit("error", new gutil.PluginError("gulp-data-uri-stream", "Only buffers supported", {showStack: true}))
        }

        // make sure the file goes through the next gulp plugin
        this.push(file);

        // tell the stream engine that we are done with this file
        cb();
    });

    return stream;
}

module.exports = URIfy;

