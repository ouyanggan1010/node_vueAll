module.exports = app => {
  const mongoose = require("mongoose");
  //mongodb://localhost/node-vue-moba
  mongoose.connect("mongodb://localhost:27017/node-vue-moba", {
    //这里必须要写
    userNewUrlParser: true
  });
  
  //将models文件夹的所有文件都引用了一遍
  require("require-all")(__dirname + "/../models");
};
