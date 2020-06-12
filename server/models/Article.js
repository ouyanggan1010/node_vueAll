const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    title: { type: String },
    categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Category" }],
    body: { type: String }
  },
  {
    //加一个标记，让数据自动带有创建时间与更新时间
    //会自动带两个字段，一个是createdAt:"2020-03-13T06:43:19.541Z"；一个是updatedAt:"2020-03-13T06:43:19.542Z"
    timestamps: true
  }
);

//有第三个参数是集合名字，默认是根据一个参数的小写复数来表示
module.exports = mongoose.model('Article',schema)