var express = require('express');
var router = express.Router();
const user = require("../models/user");
const questions = require("../models/question");


/* GET home page. */
router.get('/', async function(req, res, next) {
  
  
  let allquestions = await questions.find({}).populate("tags").populate("author").populate("votes").sort("desc");
  
  currentuser = await user.findOne({
    email: req.session.userid
  })
  
  if(req.session.userid) {
    res.render("allQuestions", {
        allquestions, currentuser
      });
  }
  
  else{
  
  res.render('index'); }
});

module.exports = router;