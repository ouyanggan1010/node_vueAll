module.exports = {
  //表示输出到哪个文件夹，表示生成的dist目录中的内容放在server/admin文件夹里面
  outputDir: __dirname + "/../server/admin",
  publicPath:
    //生成环境的时候，也就是npm run build，静态文件的引用路径是/admin/
    process.env.NODE_ENV === "production" ? "/admin/" : "/"
};
