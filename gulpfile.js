const {src, dest, watch, series}  = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const concat = require('gulp-concat');

function build () {
    return src('./src/scss/**/*.scss')
        .pipe(sass())
        .pipe(concat('tw-styles.css'))
        .pipe(dest('dist/'))
}


exports.default = series(build);