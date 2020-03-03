const
    gulp          = require('gulp'),
    sass          = require('gulp-sass'),
    browserSync   = require("browser-sync").create(),
    del           = require('del'),
    cache         = require('gulp-cache'),
    autoPrefixer  = require('gulp-autoprefixer');

function gulpSass() {
    return gulp
        .src('./src/assets/scss/**/*.scss')
        .pipe(sass({ outputStyle: "compressed" }))
        .pipe(autoPrefixer({
            browsers: ['last 4 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./src/assets/css'))
        .pipe(browserSync.stream());
}

function startServer(done) {
    browserSync.init({
        server: {
            baseDir: "./src/"
        },
    });
    done();
}

function clean() {
    return del(["dist"]);
}

function clear() {
    return cache.clearAll();
}

function reload(done) {
    browserSync.reload();
    done();
}

function watchFiles(done) {
    gulp.watch('./src/assets/scss/**/*.scss', gulp.parallel(gulpSass));
    gulp.watch('./src/assets/css/**/*.css', gulp.parallel(reload));
    gulp.watch("./src/**/*.html", gulp.parallel(reload));
    gulp.watch('./src/assets/js/**/*.js', gulp.parallel(reload));
    done();
}

gulp.task('default',gulp.parallel(watchFiles, startServer));

exports.clean = clean;
exports.clear = clear;