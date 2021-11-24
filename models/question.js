mongoose = require("mongoose");
const votes = require("./vote");
const answers = require("./answer");
const tags = require("./tag")
const users = require("./user")
const moment = require("moment") ;

const questionSchema = mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId, ref: "users"
  },
  questiontitle: {
    type: String, required: true
  },
  questionbody: {
    type: String, required: true
  },
  questioncode:{type:String},
  votes: [{
    type: mongoose.Schema.Types.ObjectId, ref: "votes"
  }],
  answers: [ {
    type: mongoose.Schema.Types.ObjectId, ref: "answers"
  }],
  tags: {
    type: mongoose.Schema.Types.ObjectId, ref: "tags"
  },
  tracktag: [ {
    tag: {
      type: String
    },
    _id: false
  }],
  
  created: {
    type: Date, default: moment()
    }



  });


  module.exports = mongoose.model("questions", questionSchema)