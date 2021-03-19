const gulp = require("gulp");
const sourcemaps = require("gulp-sourcemaps");
const uglify = require("gulp-uglify");
const concat = require("gulp-concat");

gulp.task("default", () =>
  gulp
    .src("sourceCode/**/*.js")
    .pipe(sourcemaps.init())
    .pipe(concat("index.js"))
    .pipe(uglify())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("build"))
);
