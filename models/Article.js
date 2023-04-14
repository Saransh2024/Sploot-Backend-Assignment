const mongoose = require("mongoose");


const ArticleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "name is required."],
  },
  description: {
    type: String,
    required: [true, "address is required."],
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Article = new mongoose.model("Article", ArticleSchema);

module.exports = Article;