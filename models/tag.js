const mongoose = require("mongoose");
const tagSchema = mongoose.Schema({
  tagnames: [{
    type: String
  }]

})

module.exports = mongoose.model("tags", tagSchema)