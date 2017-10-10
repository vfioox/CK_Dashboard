/**
 * Created by vfioox on 23.04.2017.
 */
var gulp = require('gulp');
var watch = require('gulp-watch');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var count = require('gulp-count');
var cleanCSS = require('gulp-clean-css');

var front_path = './';

gulp.task('sass', function() {
    return watch([
        front_path + 'sass/**/*.sass',
        front_path + 'sass/*.sass'
    ], function() {
        gulp.src([
            front_path + 'sass/**/*.sass',
            front_path + 'sass/*.sass'
        ])
            .pipe(count('## sass files'))
            .pipe(sass({
                includePaths: require('bourbon').includePaths
            }).on('error', sass.logError))
            .pipe(concat('ck_dashboard.css'))
            .pipe(gulp.dest(front_path));
    });
});
gulp.task('minify-css', function() {
    return watch('./ck_dashboard.css', function() {
        gulp.src('./ck_dashboard.css')
            .pipe(cleanCSS({compatibility: 'ie8'}))
            .pipe(concat('ck_dashboard.min.css'))
            .pipe(gulp.dest(front_path));
    });
});

gulp.task('default', ['sass', 'minify-css']);
