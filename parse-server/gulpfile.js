var gulp = require('gulp');
var ts = require('gulp-typescript');
var browserify = require('gulp-browserify');

gulp.task('default', function () {
  return gulp.src('src/*.ts')
    .pipe(ts.createProject('tsconfig.json')())
    .pipe(browserify())
    .pipe(gulp.dest('dist/gen'));
});

gulp.task('watch', ['default'], function () {
  gulp.watch('src/*.ts', ['default']);
});