let gulp         = require("gulp"),
    glob         = require("glob"),
    less         = require("gulp-less"),
    autoprefixer = require("gulp-autoprefixer"),
    cleanCSS     = require("gulp-clean-css"),
    sourcemaps   = require("gulp-sourcemaps"),
    browserSync  = require("browser-sync");

gulp.task("markup", () => {
    return gulp.src("src/*.html")
        .pipe(gulp.dest("dist"))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task("images", () => {
    return gulp.src("src/assets/themes/base/images/**/*.*", {base: "src/assets/themes/base"})
        .pipe(gulp.dest("dist"))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task("less", () => {
    return gulp.src("src/assets/themes/base/styles/base.less")
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(autoprefixer({
            browsers: [
                "last 2 versions",
                "safari 5",
                "ie 10",
                "ie 11"
            ],
            cascade: true
        }))
        .pipe(cleanCSS())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("dist"))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task("bs", () => {
    browserSync({
        server: {
            baseDir: "dist",
            directory: true
        },
        startPath: './yandex.html',
        port: 9191,
        files: [
            "./*.html"
        ]
    });
});

gulp.task("watch", ["bs", "less", "markup", "images"], () => {
    gulp.watch("src/assets/themes/base/styles/**/*.less", ["less"]);
    gulp.watch("src/*.html", ["markup"]);
    gulp.watch("src/assets/themes/base/images/**/*.*",  ["images"]);
});

gulp.task("default", ["watch"]);