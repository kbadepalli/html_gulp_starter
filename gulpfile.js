
var gulp         = require('gulp');
var sass         = require('gulp-sass');
var browserSync  = require('browser-sync');
var prefix       = require('gulp-autoprefixer');
var plumber      = require('gulp-plumber');
var uglify       = require('gulp-uglify');
var rename       = require("gulp-rename");
var imagemin     = require("gulp-imagemin");
var pngquant     = require('imagemin-pngquant');

gulp.task('sass', function() {
    gulp.src('scss/**/*.scss')
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(prefix('last 2 versions', '> 1%', 'ie 8', 'Android 2', 'Firefox ESR'))
        .pipe(plumber())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('browser-sync', function() {
    browserSync.init( {
        server: {
            baseDir: './dist'
        }
    });
});


gulp.task('scripts', function() {
    gulp.src('js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
});


gulp.task('html', function() {
    gulp.src([
        '!node_modules/**/*.*',
        '!dist/**/*.*',
        '**/*.html'])
        .pipe(gulp.dest('dist'))
});

gulp.task('fonts', function() {
    gulp.src('fonts/**/*.*')
        .pipe(gulp.dest('dist/fonts'))
});


gulp.task('images', function () {
    return gulp.src('images/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('dist/images'));
});


gulp.task('default', ['sass', 'scripts', 'images', 'html', 'fonts', 'browser-sync' ], function () {
    gulp.watch('sass/**/*.scss', ['sass']);
    gulp.watch('js/**/*.js', ['scripts']);
    gulp.watch('images/*', ['images']);
});