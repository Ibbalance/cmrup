const express = require("express");
const mongoose = require ("mongoose");
const usersm = require("../models/user");
const questions = require("../models/question");
const tags = require("../models/tag");



const router = express.Router();

router.get("/", async(req, res)=> {
  session = req.session;
  if (req.session.userid) {
    currentuser = await usersm.findOne({
      email: req.session.userid
    })
    let allquestions = await questions.find({}).populate("tags").populate("author").populate("votes").sort("votes"); 
   // res.send(allquestions)
    res.render("allQuestions", {
      allquestions, currentuser
    })  

  } else {
    res.render("login")
  }}
)








module.exports = router