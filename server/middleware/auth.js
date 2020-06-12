//module.exports = () => {return () => {}} === module.exports = () => () => {}
module.exports = options => {
  //server后台需要下载安装jsonwebtoken：npm i jsonwebtoken
  const jwt = require("jsonwebtoken");
  //引用数据库用户模型
  const User = require("../models/AdminUser");
  //http.assert：npm i http-assert，判断条件是否为真，如果为假则执行后面的函数，替换if语句；第一个参数是判断的条件，第二个参数是抛出的状态码，第三个参数是返回给前台的信息
  //if (!user) {//中断，发送状态码422：让客户端知道不是一个正常的200请求，并发送数据到前端return res.status(422).send({message: "用户不存在" });}
  const assert = require("http-assert");
  //这里处理参数

  //返回一个函数
  return async (req, res, next) => {
    //------------当页面调用数据接口的时候，校验用户是否登录
    //jwt与User都在上面引用

    //后端是用小写来获取，会与前端自动对应
    //split分割字符串为数组；pop取数组最后一个
    const token = String(req.headers.authorization || "")
      .split("Bearer ")
      .pop();
    //401状态错误一般与用户身份有关，表示用户身份有问题
    //请提供jwt token
    assert(token, 401, "请先登录");

    //校验token是否正确 tokenData={ id: '5e65d8e3ed952b43c4d622c5', iat: 1583737926 }
    //req.app等同于app
    const { id } = jwt.verify(token, req.app.get("secret"));
    //无效的jwt token
    assert(id, 401, "请先登录");

    //以防是伪造的id，在数据库中寻找到
    req.user = await User.findById(id);
    assert(req.user, 401, "请先登录");
    next();
  };
};
