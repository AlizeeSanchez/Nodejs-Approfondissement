const { Schema, model } = require("mongoose");

const articleSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  state: {
    type: String,
    enum: {
      values: ["draft", "published"],
      message: "{VALUE} inconnue",
    },
    default: "draft"
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

let Article;

module.exports = Article = model("Article", articleSchema);
