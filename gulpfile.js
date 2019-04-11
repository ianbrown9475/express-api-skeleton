const { spawn } = require('child_process');
const del = require('del');
const forever = require('forever-monitor');
const gulp = require('gulp');
const babel = require('gulp-babel');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');
const sourcemaps = require('gulp-sourcemaps');

gulp.task('babel-clean', () => del(['build']));

gulp.task('babel-compile', () => gulp.src(['**/*.js', '!build/**', '!node_modules/**'])
  .pipe(sourcemaps.init())
  .pipe(babel())
  .pipe(sourcemaps.write('../maps'))
  .pipe(gulp.dest('build/dist')));

gulp.task('babel', gulp.series('babel-clean', 'babel-compile'));

/**
 * @summary Use Eslint linting *.js file besides source files in node_modules
 */
gulp.task('lint', () => gulp.src(['**/*.js', '!build/**', '!node_modules/**'])
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError()));

/**
 * @summary Check Flow types
 */
gulp.task('typecheck', () => spawn('./node_modules/.bin/flow', ['check'], { stdio: 'inherit' }));

/**
 * @summary Run unit tests
 */
gulp.task('test', () => gulp.src(['build/dist/tests/unit/*.js'])
  .pipe(mocha({ reporter: 'spec' })));

/**
 * @summary Start application using forever
 */
gulp.task('start', () => new forever.Monitor('build/dist/app.js').start());


/**
 * @summary Lint and compile, test, and start the application
 */
exports.run = gulp.series(gulp.parallel('lint', 'typecheck', 'babel'), 'test', 'start');
/**
 * @summary Compile and start the application only
 */
exports.start = gulp.series('babel', 'start');
/**
 * @summary Compile and test the application only
 */
exports.test = gulp.series('babel', 'test');
/**
 * @summary Compile the code only
 */
exports.babel = babel();
