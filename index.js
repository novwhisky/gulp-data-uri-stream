var through = require('through2');
var mime = require('mime');
var gutil = require('gulp-util');

function getOptions(optset) {
    optset = optset || {};

    var defaults = {
        output: "vinyl",
        encoding: "base64"
    };

    for(var key in defaults) {
        if(optset.hasOwnProperty(key) === false) {
            optset[key] = defaults[key];
        }
    }

    return optset;
}

function URIfy(overrides) {
    var options = getOptions(overrides);

    // creating a stream through which each file will pass
    var stream = through.obj(function(file, enc, cb) {

        // buffers only for now
        if(file.isBuffer()) {
            var header = "data:" + mime.lookup(file.path) + ";" + options.encoding +",";
            var dURI = header + encodeURIComponent(file.contents.toString(options.encoding));

            // This needs to be a JSON flag
            if(options.output == "json") {
                var o = {};
                o[file.path] = dURI;
                dURI = JSON.stringify(o);
            }

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

