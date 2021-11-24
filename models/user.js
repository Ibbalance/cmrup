const mongoose = require("mongoose");
const answers = require("./answer");
const questions = require("./question");



const usersSchema = mongoose.Schema({
  displayname: {
    type: String, required: true, unique: true
  },
  profilepic: {
    type: String, default: "profilepic.jpg"
    },
    email: {
      type: String, unique: true
    },
    password: {
      type: String
    },
    questions: [{
      type: mongoose.Schema.Types.ObjectId, ref: "questions"
    }],
    answers: [ {
      type: mongoose.Schema.Types.ObjectId, ref: "answers"
    }]
  })

  module.exports = mongoose.model("users", usersSchema)