const gulp = require('gulp')
const browsersync = require('browser-sync')
const pug = require('gulp-pug')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const imagemin = require('gulp-imagemin')
const pngquant = require('imagemin-pngquant')

const reload = browsersync.reload

gulp.task('imagemin', () => (
    gulp.src('./src/img/**/*.{gif,jpg,png}')
      .pipe(imagemin({
        progressive: true,
        interlaced: true,
        use: [pngquant()],
      }))
      .pipe(gulp.dest('./dist/img'))
  ))

gulp.task('fonts', () => gulp.src('src/fonts/**/*')
    .pipe(gulp.dest('dist/fonts')))

gulp.task('pug',() =>
    gulp.src('./src/pug/*.pug')
        .pipe(pug({
            pretty:true
        }))
        .pipe(gulp.dest('./dist'))
        .pipe(reload({ stream: true }))
)

gulp.task('sass', () => gulp.src('./src/styles/main.scss')
    .pipe(sass({
        outputStyle:'compressed',
        sourceComments:false
    }))
    .pipe(autoprefixer({
        versions:['last 2 browsers']
    }))
    .pipe(gulp.dest('./dist/'))
    .pipe(reload({ stream: true })))

gulp.task('browsersync', () => (
    browsersync({
        server: {
        baseDir: './dist',
        },
        open: false,
    })
))

gulp.task('watch', () => {
    gulp.watch('./src/styles/**/*.scss', ['sass'])
    gulp.watch('./src/img/**/*.{gif,jpg,png}', ['imagemin'])
    gulp.watch('./src/pug/**/*.pug', ['pug'])
    gulp.watch('./src/fonts/**/*.*', ['fonts'])
})

gulp.task('default', ['fonts', 'imagemin', 'sass', 'pug', 'browsersync', 'watch'])