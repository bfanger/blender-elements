const gulp = require('gulp')
const sass = require('gulp-sass')
const livereload = require('gulp-livereload')

gulp.task('fonts', () => {
  return gulp.src('src/dejavu-sans.woff')
    .pipe(gulp.dest('build/fonts'))
})
gulp.task('css', () => {
  return gulp.src('src/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('build'))
})
gulp.task('html', () => {
  return gulp.src('src/**.html')
    .pipe(gulp.dest('build'))
})
gulp.task('build', ['css', 'html', 'fonts'])

gulp.task('watch', ['build'], () => {
  livereload.listen()
  gulp.watch(['src/**/*.scss'], ['css'])
  gulp.watch(['src/**/*.html'], ['html'])
  gulp.watch(['build/**/*.{html,css}']).on('change', () => livereload.changed('something'))
})

gulp.task('default', ['watch'])
