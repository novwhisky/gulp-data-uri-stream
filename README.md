gulp-data-uri-stream
====================

gulp streaming module to convert generic input to a data uri

### Usage ###

    var uri = require('gulp-data-uri-stream');
    var concat = require('gulp-concat');
    
    gulp.task('data-urify', function() {

        return gulp.src('images/*.svg')
            .pipe(uri())
            .pipe(concat("URIs.txt"))
            .pipe(gulp.dest("./"));
    
    });
