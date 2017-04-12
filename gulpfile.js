
var  gulp = require("gulp");
var  htmlmin = require("gulp-htmlmin");
var  less = require("gulp-less");
var  cssnano = require("gulp-cssnano");
var  concat = require("gulp-concat");
var  uglify = require("gulp-uglify");
var  browserSync = require("browser-sync").create();


// html文件的压缩和去注释
gulp.task("html",function(){	//gulp.task创建一个任务
      gulp.src("01/*.html")		//gulp.src找文件，（）里是匹配路径
      .pipe(htmlmin({			//pipr建立管道 htmlmin是压缩html文件
      	collapseWhitespace:true,//collapseWhitespace压缩空格
      	removeComments:true 	//removeComments删除注释
      }))
      .pipe(gulp.dest("02"))
      .pipe(browserSync.reload({stream:true}));	//gulp.dest输出文件（）内是输出路径

});


gulp.task("js",function(){
	gulp.src("01/*.js")
		.pipe(concat("all.js"))
		.pipe(uglify())
		.pipe(gulp.dest("02"))
		.pipe(browserSync.reload({stream:true}));	
});

gulp.task("style",function(){
	gulp.src("01/*less")
		.pipe(less())
		.pipe(cssnano())
		.pipe(gulp.dest("02"))
		.pipe(browserSync.reload({stream:true}));
		
});

gulp.task("images",function(){
	gulp.src("01/*.jpg")
		.pipe(gulp.dest("02"))
		.pipe(browserSync.reload({stream:true}));
		
});




gulp.task("workflow",["style","js","html","images"],function(){
	browserSync.init({
		server:{
			baseDir:"./02",
			index:"01.html"
		}
	});
	gulp.watch("01/*.less",["style"]);
	gulp.watch("01*.js",["js"]);
	gulp.watch("01/*.html",["html"]);
	gulp.watch("01/*.jpg",["images"]);

});