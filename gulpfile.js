var gulp = require('gulp');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var webserver = require('gulp-webserver');
var bodyParser = require('body-parser');
// var babel = require('gulp-babel');
var autoprefixer = require('gulp-autoprefixer');

var fs = require('fs');
var path = require('path');
var url = require('url');

gulp.task('sass', function () {
    return gulp.src('./src/scss/*.scss')
           .pipe(sass())
           .pipe(autoprefixer({
                browsers: ['last 2 versions'],
                cascade: false
            }))
           .pipe(gulp.dest('./src/css'));
});


gulp.task('watch', function () {
    return gulp.watch('./src/scss/*.scss', gulp.series('sass'));
});



var data = require('./src/data/data.json');
console.log(data);

gulp.task('server', function () {
    return gulp.src('./src/').pipe(webserver({
        port: 8081,
        host: 'localhost',
        // open: true,
        livereload: true, // 监听变化自动刷新
        middleware: [bodyParser.urlencoded({extended: false}), function(req, res, next) {
            
            if (req.url === '/favicon.ico') {
                return res.end('');
            }
            var pathname = url.parse(req.url).pathname;
            
            if (/^\/api/.test(pathname)) { // 接口
                if (pathname === '/api/load') {
                    var page = req.body.page;
                     
                    var msg = data.slice((page-1)*5,page*5);
                    console.log(msg);
                    res.end(JSON.stringify({code:0, data: msg}));
                } 
            }else {
                // 读文件
                    console.log(1);
                    pathname = pathname === '/' ? 'index.html' : pathname;
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)));
                }
        }]// 中间件
    }))
});

gulp.task('default', gulp.series('server','watch'));