const gulp = require('gulp');
const sass = require('gulp-sass');
const ap = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const bs = require('browser-sync').create();

gulp.task('default', ()=>{
	console.log('testing Biache!');
	gulp.watch('scss/*.scss', ['styles']);
	gulp.watch('dist/index.html').on('change', bs.reload);
	// gulp.watch('./SAO.css').on('change', bs.reload);
	gulp.watch('js/*.js', ['scripts']);
	gulp.watch('dist/form.html').on('change', bs.reload);
	bs.init({
	    server: "./dist"
	});
});

gulp.task('dist', ['scripts', 'styles']);

gulp.task('scripts', ()=>{
	gulp.src('js/*.js')
		.pipe(concat('index.js'))
		.pipe(gulp.dest('dist/assets/js'))
		.pipe(bs.stream());
})

gulp.task('styles', ()=> {
	gulp.src('scss/*.scss')
		.pipe(sass({
			outputStyle: 'expanded'
		}).on('error', sass.logError))
		.pipe(ap({
			browsers: ['last 2 versions']
		}))
		.pipe(gulp.dest('dist/assets/css'))
		.pipe(bs.stream());
});

// gulp.task('styles', ()=> {
// 	gulp.src('scss/*.scss')
// 		.pipe(sass({
// 			outputStyle: 'expanded'
// 		}).on('error', sass.logError))
// 		.pipe(ap({
// 			browsers: ['last 2 versions']
// 		}))
// 		.pipe(concat('styles.css'))
// 		.pipe(gulp.dest('dist/assets/css'))
// 		.pipe(bs.stream());
// });