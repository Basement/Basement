var gulp = require('gulp');
var babel = require('gulp-babel');
var clean = require('gulp-clean');
var gulpSequence = require('gulp-sequence');
const shell = require('gulp-shell')

gulp.task('clean', function () {
    return gulp.src('dist', {
            read: false
        })
        .pipe(clean());
});


gulp.task('compile', function () {
    return gulp.src('src/**/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('before:script', shell.task([
    'git remote rm origin',
    'git remote add origin https://${GH_TOKEN}@github.com/basement/basement.git'
]));
gulp.task('after:success', shell.task([
    'git checkout master',
    'git config push.default current',
    'npm run release',
    'npm run release- log',
    'npm publish --access= public'
]));

gulp.task('build', gulpSequence('clean', 'compile'));