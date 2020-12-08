'use strict';
const gulp = require("gulp");
const sass = require("gulp-sass");
const plumber = require("gulp-plumber");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const server = require("browser-sync").create();
const csso = require("gulp-csso");
const rename = require("gulp-rename");
const imagemin = require("gulp-imagemin");
const del = require("del");
const pump = require("pump");
const htmlmin = require("gulp-htmlmin");
const pug = require('gulp-pug');

const uglifyes = require('uglify-es');
const composer = require('gulp-uglify/composer');
const uglify = composer(uglifyes, console);

gulp.task("css", () => {
  return gulp.src("source/sass/style.scss")
      .pipe(plumber())
      .pipe(sass())
      .pipe(postcss([
        autoprefixer()
      ]))
      .pipe(gulp.dest("build/css"))
      .pipe(csso())
      .pipe(rename("style.min.css"))
      .pipe(gulp.dest("build/css"))
      .pipe(server.stream());
});

gulp.task('pug', function buildHTML() {
    return gulp.src('source/views/index.pug')
        .pipe(pug())
        .pipe(gulp.dest('source'));
});

gulp.task("images", () => {
  return gulp.src("source/img/**/*.{png,jpg,svg}")
      .pipe(imagemin([
        imagemin.optipng({optimizationLevel: 3}),
        imagemin.jpegtran({progressive: true}),
        imagemin.svgo()
      ]))
      .pipe(gulp.dest("source/img"));
});

gulp.task("html", () => {
  return gulp.src("source/*.html")
      .pipe(htmlmin({ collapseWhitespace: true }))
      .pipe(gulp.dest("build"));
});

gulp.task("js", cb => {
  pump([
        gulp.src("source/js/*.js"),
        uglify(),
        rename(function (path) {
          path.basename += ".min";
        }),
        gulp.dest("build/js")
      ],
      cb
  );
});

gulp.task("copy", () => {
  return gulp.src([
    "source/fonts/**",
    "source/img/**",
    "source/js/**",
  ], {
    base: "source"
  })
      .pipe(gulp.dest("build"));
});

gulp.task("clean", () => {
  return del("build");
});

gulp.task("refresh", function (done) {
  server.reload();
  done();
});

gulp.task("server", () => {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/sass/**/*.{scss,sass}", gulp.series("css"));
  gulp.watch("source/*.html", gulp.series("html", "refresh"));
  gulp.watch("source/views/**/*.pug", gulp.series("pug"));
  gulp.watch("source/js/*.js", gulp.series("js", "refresh"));
});

gulp.task("build", gulp.series("clean", "copy", "pug", "css", "js", "html"));

gulp.task("start", gulp.series("build", "server"));
