const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();

// Compile SCSS
gulp.task('sass', function() {
    return gulp.src('./assets/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(gulp.dest('./assets/css'))
        .pipe(browserSync.stream());
});

// Watch files
gulp.task('watch', function() {
    browserSync.init({
        proxy: "http://localhost:2368"
    });
    
    gulp.watch('./assets/scss/**/*.scss', gulp.series('sass'));
    gulp.watch('./**/*.hbs').on('change', browserSync.reload);
    gulp.watch('./assets/js/**/*.js').on('change', browserSync.reload);
});

// Default task
gulp.task('default', gulp.series('sass', 'watch'));
