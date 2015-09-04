var jsIndex = 'public/javascripts/index.js';
var jsMain = 'public/javascripts/main.js';

var gulp = require('gulp'),
    spawn = require('child_process').spawn;

var cmd = function(cmd, args) {
    var child = spawn(cmd, [args], {
            cwd: process.cwd()
        }),
        stdout = '',
        stderr = '';

    child.stdout.setEncoding('utf8');

    child.stdout.on('data', function(data) {
        stdout += data;
        console.log(data);
    });

    child.stdout.on('error', function(err) {
        console.log(err)
    });

    child.stderr.setEncoding('utf8');
    child.stderr.on('data', function(data) {
        stderr += data;
        console.log(data);
    });

    child.stderr.on('error', function(err) {
        console.log(err)
    });

    child.on('close', function(code) {
        console.log('Done with exit code', code);
    });
};

gulp.task('default', function(event) {
    gulp.watch(['public/javascripts/**/*.js', '!public/**/main.js'], function(e) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        cmd('browserify ' + jsIndex, '-o ' + jsMain);
    });
});