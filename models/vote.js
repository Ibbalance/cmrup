const mongoose = require("mongoose");

const voteSchema = mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId, ref: "users"
  },
  votescount: {
    type: Number
  }
})


module.exports = mongoose.model("votes", voteSchema)