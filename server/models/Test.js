const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  tip: { type: String },
  items: [
    {
      image: { type: String },
      name: { type: String },
      price: { type: String }
    }
  ]
});

module.exports = mongoose.model("Test", schema);
