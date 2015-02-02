var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');

gulp.task('sass', function() {
  gulp.src('app/css/style.scss')
    .pipe(plumber())
    .pipe(sass({
    	errLogToConsole: true,
    	sourceComments: 'normal'
    }))
    .pipe(gulp.dest('app/css'));
});

gulp.task('watch', function() {
  gulp.watch('app/css/*.scss', ['sass']);
});

gulp.task('default', ['sass', 'watch']);