const gulp = require('gulp')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')

gulp.task('img', () => gulp.src('./src/img/**/*.*')
    .pipe(gulp.dest('./dist/img/')))

gulp.task('sass', () => gulp.src('./src/styles/main.scss')
    .pipe(sass({
        outputStyle:'compressed',
        sourceComments:false
    }))
    .pipe(autoprefixer({
        versions:['last 2 browsers']
    }))
    .pipe(gulp.dest('./dist/'))
    )

gulp.task('watch', () => {
    gulp.watch('./src/styles/**/*.scss', ['sass']);
});

gulp.task('default', ['sass','img', 'watch'])