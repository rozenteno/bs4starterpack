const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const rename = require('gulp-rename');

//Compile Sass & inject into browser
gulp.task('sassBoot', () => {
   return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss'])
      .pipe(sass())      
      .pipe(gulp.dest("src/css/vendors"))
      .pipe(browserSync.stream());
});
gulp.task('sass', () => {
   return gulp.src(['src/scss/*.scss'])
      .pipe(sass())
      .pipe(rename('style.css'))
      .pipe(gulp.dest("src/css"))
      .pipe(browserSync.stream());
});

//Move JS Files to src/js folder
gulp.task('js', () => {
   return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 
   'node_modules/popper.js/dist/umd/popper.min.js'])
      .pipe(gulp.dest("src/js/vendors"))
      .pipe(browserSync.stream());
});

//Watch Sass & Server
gulp.task('serve', ['sass', 'sassBoot'], () => {
   browserSync.init({
      server: "./src"
   });
   gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'], ['sass', 'sassBoot']);
   gulp.watch("src/*.html").on('change', browserSync.reload);
});

//Move Fonts Folder to src
gulp.task('fonts', () => {
   return gulp.src('node_modules/font-awesome/fonts/*')
      .pipe(gulp.dest("src/fonts"));
});

//Move Font Awesome CSS to src/css/vendors
gulp.task('fa', () => {
   return gulp.src('node_modules/font-awesome/css/font-awesome.min.css*')
      .pipe(gulp.dest("src/css/vendors"));
});

//Default task
gulp.task('default', ['js', 'serve', 'fa', 'fonts']);