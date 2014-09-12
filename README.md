gulp-data-uri-stream
====================

gulp streaming module to convert generic input to a data uri

### Usage

    var uri = require('gulp-data-uri-stream');
    var concat = require('gulp-concat');
    
    gulp.task('data-urify', function() {

        return gulp.src('images/*.svg')
            .pipe(uri())
            .pipe(concat("URIs.txt"))
            .pipe(gulp.dest("./"));
    
    });

### Options

options are passed as an object in the module call, i.e.

    .pipe( uri( { myOptionKey: "myOptionValue" } ) )

#### output

Data that is streamed to the next module in the pipeline

    * vinyl [default] - vinyl virtual file format
    * json - object keys are relative file path

#### encoding

The data URI encoding format

    * base64 [default]
    * utf8