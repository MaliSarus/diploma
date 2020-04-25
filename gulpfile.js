const
    gulp          = require('gulp'),
    sass          = require('gulp-sass'),
    browserSync   = require("browser-sync").create(),
    del           = require('del'),
    cache         = require('gulp-cache'),
    autoPrefixer  = require('gulp-autoprefixer'),
    imagemin = require('gulp-imagemin'),
    uglify = require('gulp-uglify-es').default,
    concatCss = require('gulp-concat-css'),
    cleanCSS = require('gulp-clean-css'),
    rename = require("gulp-rename");

function gulpSass() {
    return gulp
        .src('./src/assets/scss/**/*.scss')
        .pipe(sass({ outputStyle: "compressed" }))
        .pipe(autoPrefixer({
            browsers: ['last 4 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('src/assets/css'))
        .pipe(browserSync.stream());
}


function minCss() {
    return gulp.src(['src/assets/css/swiper.css', 'src/assets/css/style.css'])
        .pipe(concatCss("style.min.css"))
        .pipe(cleanCSS())
        .pipe(gulp.dest('dist/assets/css/'));

};

function gulpImgMin() {
   return  gulp.src('./src/assets/img/**/*')
        .pipe(imagemin({
            progressive: true,
            optimizationLevel: 3,
            quality: 50
        }))
        .pipe(gulp.dest('./dist/assets/img/'))
}

function gulpUglify() {
    return gulp
        .src('src/assets/js/script.js')
        .pipe(rename("script.min.js"))
        .pipe(uglify())
        .pipe(gulp.dest('dist/assets/js/'))
}

function startServer(done) {
    browserSync.init({
        proxy: "diploma"
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
    gulp.watch('./src/assets/scss/**/*.scss', gulp.parallel(gulpSass,reload));
    gulp.watch('./src/assets/css/**/style.css', gulp.parallel(minCss,reload));
    gulp.watch("./src/**/*.php", gulp.parallel(reload));
    gulp.watch('./src/assets/js/**/script.js', gulp.parallel(gulpUglify,reload));
    done();
}

gulp.task('default',gulp.parallel(watchFiles, startServer));
gulp.task('minImg',gulp.parallel(gulpImgMin));

exports.clean = clean;
exports.clear = clear;