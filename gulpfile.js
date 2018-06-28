var gulp = require('gulp'),
	gutil = require('gulp-util'),
	compass = require('gulp-compass'),
	webserver = require('gulp-webserver'),
	shell = require('gulp-shell');

gulp.task('test', function(){
	gutil.log('This is a test.');
});

gulp.task('img', function(){
	return gulp.src('components/img/*')
	.pipe(gulp.dest('build/img'));
});

gulp.task('js', function(){
	return gulp.src('components/js/**/*.js')
	.pipe(gulp.dest('build/js'));
});

gulp.task('fonts', function(){
	return gulp.src('components/fonts/*')
	.pipe(gulp.dest('build/fonts'));
});

gulp.task('sass', ['fonts'], function(){
	return gulp.src('components/sass/*.scss')
    .pipe(compass({
    	config_file: './config.rb',
    	css: 'components/css',
      	sass: 'components/sass'
    }))
    .pipe(gulp.dest('build/css'));
});

gulp.task('html', function(){
	return gulp.src('components/**/*.html')
	.pipe(gulp.dest('build'));
});

// This task will only work for KBIA.
gulp.task('upload', shell.task([
	'aws s3 cp build s3://apps.kbia.org/2018-july-autism-caregivers --recursive --profile kbia'
]));

gulp.task('build', ['img','sass', 'js', 'html']);



gulp.task('watch',['build'], function(){
	gutil.log('Gulp will say that this task has finished, but don\'t believe its dirty lies.');
	gutil.log('Hit \^c to actually exit watch mode.');
	gulp.watch('components/sass/**/*.scss',['sass']);
	gulp.watch('components/**/*.js',['js']);
	gulp.watch('components/**/*.html',['html']);
	gulp.watch('components/**/*.jpg',['img']);
});

gulp.task('serve',['build'], function(){
	gutil.log('Gulp will say that this task has finished, but don\'t believe its dirty lies.');
	gutil.log('Hit \^c to actually exit watch mode.');
	gulp.src('build')
		.pipe(webserver({
			livereload: true,
			directorylisting: true,
			open: true
		}))
	gulp.watch('components/**/*.js',['js']);
	gulp.watch('components/**/*.html',['html']);
	gulp.watch('components/**/*.jpg',['img']);
    gulp.watch('components/**/*.scss',['sass']);
});