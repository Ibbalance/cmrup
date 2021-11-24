const mongoose = require ("mongoose");
const questions = require("./question");
const votes = require("./vote");
const users = require("./user");
const comments = require("./comment");


const answerSchema = mongoose.Schema({
  questionanswered: {
    type: mongoose.Schema.Types.ObjectId, ref: "questions"
  },
  author: {
    type: mongoose.Schema.Types.ObjectId, ref: "users"
  },
  answer: {
    type: String, required: true
  },
  answercode:{type:String},
  answerfile:[{},{ typeKey: '$type'}],
  comments: [ {
    type: mongoose.Schema.Types.ObjectId, ref: "comments"
  }],
  votes: [{
    type: mongoose.Schema.ObjectId, ref: "votes"
  }],
  date: {
    type: Date, default: new Date().getTime()}
  })



  module.exports = mongoose.model("answers", answerSchema);