const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const terser = require('gulp-terser-js')
const filter = require('gulp-filter');
const jeditor = require("gulp-json-editor");

function cleanScripts() {
  return del([
    'dist/**',
    '!dist/.git/**',
    '!dist/.gitignore',
    '!dist/package.json',
  ])
}

function minifyJs() {
  return gulp.src('src/**/*.js')
    .pipe(filter([
      '**',
      '!**/__tests__/**',
      '!**/*.spec.js'
    ]))
    .pipe(sourcemaps.init())
    .pipe(terser({
      mangle: {
        toplevel: true
      }
    }))
    .on('error', function(error) {
      if (error.plugin !== "gulp-terser-js") {
        console.log(error.message)
      }
      this.emit('end')
    })
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist'));
}

function prodPackage(cb) {
  if (process.env.TRAVIS != "true"){
    let loDependencies = require('./package.json').dependencies;
    return gulp.src('./dist/package.json')
      .pipe(jeditor({
        dependencies: loDependencies
      }))
      .pipe(gulp.dest('./dist'));
  } else {
    return cb()
  }
}

gulp.task('clean-scripts', cleanScripts);

gulp.task('minifyJs', minifyJs);

gulp.task('prodPackage', prodPackage);

gulp.task('default', gulp.series(cleanScripts, minifyJs, prodPackage));
