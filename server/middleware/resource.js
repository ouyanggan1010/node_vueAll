module.exports = options => {
  //这里处理参数

  //返回一个函数
  return async (req, res, next) => {
    //可以将单词小写的复数转换成大写的单数
    const modelName = require("inflection").classify(req.params.resource);
    req.Model = require(`../models/${modelName}`);
    next();
  };
};
