const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: { type: String },
  parent: { type: mongoose.SchemaTypes.ObjectId, ref: "Category" }
});
//关联子分类
schema.virtual("children", {
  //主键
  localField: "_id",
  //外键
  foreignField: "parent",
  justOne: false,
  ref: "Category"
});
schema.virtual("newsList", {
  localField: "_id",
  foreignField: "categories",
  justOne: false,
  ref: "Article"
});
module.exports = mongoose.model('Category',schema)