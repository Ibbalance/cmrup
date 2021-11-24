const mongoose = require("mongoose");
const answers = require("./answer");


const commentSchema = mongoose.Schema({
  answercommentedon: {
    type: mongoose.Schema.Types.ObjectId, ref: "answer"
  },
  comment: {
    type: String
  },
  author: {
    type: mongoose.Schema.Types.ObjectId, ref: "users"
  },
  created: {
    type: Date, default: new Date().getTime()}
  });



  module.exports = mongoose.model("comments", commentSchema);