var gulp = require('gulp');
var traceur = require('gulp-traceur');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var rename = require('gulp-rename');
var ngmin = require('gulp-ngmin');
var clean = require('gulp-clean');
var sass = require('gulp-sass');
var bower = require('gulp-bower');

//todo : move out these monsters to config json file
var SOURCE_FILES = ['!app/**/*_test.js', 'app/*.js', 'app/modules/**/*.js'];
var SOURCE_HTML = ['app/*.html', 'app/modules/**/*.html'];
var SOURCE_SCSS = ['app/*.scss', 'app/modules/**/*.scss'];
var SOURCE_VENDORS = [
    'app/components/jquery/dist/jquery.min.js',
    'app/components/angular/angular.js',
    'app/components/angular-animate/angular-animate.min.js',
    'app/components/angular-aria/angular-aria.min.js',
    'app/components/angular-local-storage/dist/angular-local-storage.min.js',
    'app/components/angular-material/angular-material.min.js',
    'app/components/angular-ui-router/release/angular-ui-router.min.js'
]
var CSS_VENDORS = [
    'app/components/angular-material/angular-material.min.css'
]


var BUILD = {
    css: 'build/css',
    js: 'build/js',
    vendors: 'build/vendors',
    html: 'build'
};

// Runs JSHint Report against all JS files in app
gulp.task('lint', function () {
    return gulp.src(SOURCE_FILES)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'));
});

gulp.task('clean', function () {
    return gulp.src(BUILD.html)
        .pipe(clean());
    });

gulp.task('sass', function () {
  gulp.src(SOURCE_SCSS)
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('main.css'))
    .pipe(gulp.dest(BUILD.css));
});

gulp.task('html', function () {
    //todo : do compile when make production environment
    return gulp.src(SOURCE_HTML)
        .pipe(gulp.dest(BUILD.html));
});

gulp.task('bower', function() {
  return bower('./app/components')
    .pipe(gulp.dest('build/components'))
});

gulp.task('browserSync', function() {
    browserSync({
        logConnections: true,
        logFileChanges: true,
        notify: true,
        open: true,
        server: {
            baseDir: "./app"
        }
    });
});

gulp.task('watch', function () {

    // Lint the JS files when they change
    gulp.watch(SOURCE_FILES, ['lint', 'traceur', reload]);
    gulp.watch(SOURCE_HTML, reload);
});

/* Sourcemaps seem to not be working when a base is specified */
gulp.task('traceur', function () {
    return gulp.src(['!app/**/*_test.js', 'app/*.js', 'app/modules/**/*.js'], {base: './app'})
        .pipe(traceur({
            modules: 'register',
            moduleName : true
        }))
        .pipe(concat('app.js'))
        .pipe(gulp.dest('app/dist'))
        .pipe(gulp.dest(BUILD.js))
        .pipe(reload({stream:true}));
});

gulp.task('default', ['clean', 'bower','html', 'sass', 'traceur', 'watch', 'browserSync']);


/**
 * Generate cleaning tasks.
 *
 * @param {string} folder
 * @return stream
 */
function gulpClean (folder) {
    gulp.task('clean:' + folder, function () {
        return gulp.src(folder, {read: false, force: true})
            .pipe(clean());
    })
}

