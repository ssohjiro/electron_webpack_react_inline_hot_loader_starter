'use strict';
 
var gulp = require('gulp');
var electron = require('electron-connect').server.create();
 
gulp.task('serve', function () {
 
  // Start browser process 
  electron.start();
 
  // Restart browser process 
  gulp.watch('dist/bundle.js', electron.restart );
 
  // Reload renderer process 
  //gulp.watch(['dist/bundle.js'], electron.reload );

});
