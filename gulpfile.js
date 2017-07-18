var gulp = require('gulp');
var babel = require('gulp-babel');
var clean = require('gulp-clean');
var gulpSequence = require('gulp-sequence')

gulp.task('clean', function () {
    return gulp.src('dist', { read: false })
        .pipe(clean());
});


gulp.task('compile', function () {
    return gulp.src('src/**/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('build', gulpSequence('clean', 'compile'));