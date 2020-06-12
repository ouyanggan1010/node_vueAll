const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  username: { type: String },
  //set是个函数，可以自定义如何保存该值，val参数表示当前password的值
  password: {
    type: String,
    //表示数据库查询数据的时候密码不被查出来
    select: false,
    //表示对当前值进行处理后再上传到数据库
    set(val) {
      //Schema里面，使用set方法，把传入的val，通过调用bcryptjs的hashSync加密，加密等级10；二个参数10~12比较好
      //散列后每次都是一串不同的字符串，例如：$2a$10$bA.X8KicM6G1p7uYvS1o1u9/k6Z9exqtqw1SVXzME66lKjrffU8D2
      return require("bcryptjs").hashSync(val, 10);
    }
  }
});

module.exports = mongoose.model("AdminUser", schema);
