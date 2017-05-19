const gulp = require('gulp');
const stylus = require('gulp-stylus');


gulp.task('stylus', function () {
  return gulp.src('./src/stylus/index.styl')
    .pipe(stylus())
    .pipe(gulp.dest('./src/'));
});


gulp.watch(
  ['./src/stylus/*'],
  ['stylus']
)


gulp.task('default',['stylus'])
