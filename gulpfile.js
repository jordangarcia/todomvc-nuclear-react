var gulp = require('gulp')
var connect = require('gulp-connect')

gulp.task('connect', function() {
  connect.server({
    root: 'dist',
    port: 8888,
  })
})

gulp.task('default', ['connect'])
