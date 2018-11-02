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
// console.log(babel);
// console.log(gulp);
// console.log(uglify);
gulp.task('default', function () {
    return console.log('default');
});

gulp.task('one', function () {
    return console.log('one');
});


// gulp.task('minjs', function () {
//     return gulp.src('./src/js/a.js').pipe(uglify()).pipe(gulp.dest('./src/js/min'));
// });

gulp.task('sass', function () {
    return gulp.src('./src/scss/*.scss')
           .pipe(sass())
           .pipe(autoprefixer({
                browsers: ['last 2 versions'],
                cascade: false
            }))
           .pipe(gulp.dest('./src/css'));
});

// gulp.task('change', function () {
//     return gulp.src('./src/js/a.js')
//            .pipe(uglify())
//            .pipe(gulp.dest('./src/js/minb'));
// });

// gulp.task('default', gulp.series('minjs','sass','change'));

gulp.task('watch', function () {
    return gulp.watch('./src/scss/*.scss', gulp.series('sass'));
});

// gulp.task('devUglify', function () {
//     return gulp.src('./src/js/*.js')
//     .pipe(babel({
//         presets: ['@babel/env']
//     }))
//     .pipe(uglify())
//     .pipe(gulp.dest('./src/js/min'));
// });


// var userlist = [
//     {
//         username: 'lili',
//         pwd: '123'
//     },
//     {
//         username: 'qq',
//         pwd: '123'
//     }
// ];

// var list = require('./mock/list.json');


// gulp.task('server', function () {
//     return gulp.src('./src/').pipe(webserver({
//         port: 8081,
//         host: 'localhost',
//         // open: true,
//         livereload: true, // 监听变化自动刷新
//         middleware: [bodyParser.urlencoded({extended: false}), function(req, res, next) {
            
//             if (req.url === '/favicon.ico') {
//                 return res.end('');
//             }
//             var pathname = url.parse(req.url).pathname;
            
//             if (/^\/api/.test(pathname)) { // 接口
//                 if (pathname === '/api/login') {
//                     // post
//                     var isHas = userlist.some(function(item){
//                         return item.username === req.body.name && item.pwd === req.body.pwd;
//                     });
//                     if (isHas) {
//                         res.end(JSON.stringify({code:0, msg: '登录成功'}));
//                     } else {
//                         res.end(JSON.stringify({code:1, msg: '密码或用户名不匹配'}));                            
//                     }
//                 } else if (pathname === '/api/search') {
//                     // get
//                     var key = url.parse(req.url, true).query.key;
//                     var target = [];
//                     list.forEach(function(item){
//                         if (item.name.match(key)!=null && item.name.match(key)) {
//                             target.push({name:item.name,id:item.id});
//                         }
//                     });
//                     res.end(JSON.stringify({code:0, data: target}));
//                 } else if (pathname === '/api/searchResult') {
//                     // get
//                     var key = url.parse(req.url, true).query.key;
//                     var target = [];
//                     list.forEach(function(item){
//                         if (item.name.match(key)!=null && item.name.match(key)) {
//                             target.push(item);
//                         }
//                     });
//                     res.end(JSON.stringify({code:0, data: target}));
//                 } 
//             }else {
//                 // 读文件
//                     console.log(1);
//                     pathname = pathname === '/' ? 'index.html' : pathname;
//                     res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)));
//                 }
//         }]// 中间件
//     }))
// })