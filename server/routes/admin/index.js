// 接收一个app对象
module.exports = app => {
  const express = require("express");
  //server后台需要下载安装jsonwebtoken：npm i jsonwebtoken
  const jwt = require("jsonwebtoken");
  //引用数据库用户模型
  const User = require("../../models/AdminUser");
  //http.assert：npm i http-assert，判断条件是否为真，如果为假则执行后面的函数，替换if语句；第一个参数是判断的条件，第二个参数是抛出的状态码，第三个参数是返回给前台的信息
  //if (!user) {//中断，发送状态码422：让客户端知道不是一个正常的200请求，并发送数据到前端return res.status(422).send({message: "用户不存在" });}
  const assert = require("http-assert");

  const router = express.Router({
    //将路由参数合并到子路由也可访问
    mergeParams: true
  });

  //------------------------------引用中间件
  //登录校验
  const authMiddleware = require("../../middleware/auth");
  //获取数据库模型
  const resourceMiddleware = require("../../middleware/resource");

  //------------------------------增删改查路由
  // 创建资源
  router.post("/", async (req, res) => {
    //异步接收的数据，等待执行完毕，获取返回数据
    const model = await req.Model.create(req.body);
    //将返回数据传给前端
    res.send(model);
  });
  // 更新某条资源
  router.put("/:id", async (req, res) => {
    //更新某条id的数据
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body);
    //将返回数据传给前端
    res.send(model);
  });
  // 删除某条资源
  router.delete("/:id", async (req, res) => {
    //更新某条id的数据
    await req.Model.findByIdAndDelete(req.params.id, req.body);
    //将返回数据传给前端
    res.send({
      success: true
    });
  });
  // 获取资源列表
  router.get("/", async (req, res) => {
    let queryOptions = {};
    if (req.Model.modelName === "Category") {
      //Category
      queryOptions.populate = "parent";
    }
    //获取数据库数据，limit限制10条数据，populate表示关联取出什么
    //req.Model.find().populate("parent")
    const model = await req.Model.find()
      .setOptions(queryOptions)
      .limit(100);
    //将返回数据传给前端
    res.send(model);
  });
  // 获取资源列表中某条数据
  router.get("/:id", async (req, res) => {
    //获取数据库数据,findById：找到某个id的数据，req.params路由中的参数对象
    const model = await req.Model.findById(req.params.id);
    //将返回数据传给前端
    res.send(model);
  });

  //所有请求要走的接口，除了登录与上传文件
  //增加一个中间件
  app.use(
    "/admin/api/rest/:resource",
    authMiddleware(),
    resourceMiddleware(),
    router
  );

  //------------------------------文件上传路由
  const multer = require("multer");
  // 相对路径，dest配置上传文件的存储位置
  const upload = multer({
    dest: __dirname + "/../../uploads"
  });
  // 增加一个中间件，single接收单个文件，参数‘file’表示上传接收的文件字段名
  // multer中间件会在req上添加一个属性，req.file表示上传的文件
  app.post(
    "/admin/api/upload",
    authMiddleware(),
    upload.single("file"),
    async (req, res) => {
      const file = req.file;
      file.url = `http://localhost:3000/uploads/${file.filename}`;
      res.send(file);
    }
  );

  //------------------------------登录路由
  app.post("/admin/api/login", async (req, res) => {
    const { username, password } = req.body;
    //1.根据用户名找用户(只能用用户去找，不能用用户与密码找)
    //findOne查到的第一个对象；第一个参数用键值对表示条件，{username:username}简写方式{username}
    const user = await User.findOne({
      username
    }).select("+password");

    assert(user, 422, "用户不存在");
    // if (!user) {
    //   //中断，发送状态码422：让客户端知道不是一个正常的200请求，并发送数据到前端
    //   return res.status(422).send({
    //     message: "用户不存在"
    //   });
    // }
    //2.校验密码
    //返回一个布尔值，compareSync比较明文与密文是否匹配；第一个参数是明文，第二个参数是密文
    const isValid = require("bcryptjs").compareSync(password, user.password);
    assert(isValid, 422, "密码错误");
    // if (!isValid) {
    //   return res.status(422).send({
    //     message: "密码错误"
    //   });
    // }
    //3.返回token
    //签名，sign用来生成一个token，第一个参数是要加密的数据，第二个参数是密钥（全局属性）：怕客户端篡改信息，用来校验是否有效
    //app.get通过参数来判断是在定义路由还是获取参数，这里是获取参数secret
    const token = jwt.sign({ id: user._id }, app.get("secret"));
    res.send({ token });
  });

  //错误处理函数
  app.use(async (err, req, res, next) => {
    //把错误统一发送
    res.status(err.statusCode || 500).send({
      message: err.message
    });
  });

  // 测试接口
  app.post("/admin/api/test", async (req, res) => {
    console.log(req.body);
    const { tip } = req.body;
    console.log(tip);
    const Test = require("../../models/Test");
    const data = await Test.findOne({ tip });
    res.send(data);
  });
};
