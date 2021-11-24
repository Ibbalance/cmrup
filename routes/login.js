const express = require("express");
const mongoose = require ("mongoose");
const user = require("../models/user");
const questions = require("../models/question");



var currentuser;

const router = express.Router();

router.get("/", (req, res)=> {
  res.render("login")
})


router.post("/", async(req, res)=> {


  let allquestions = await questions.find().populate("tags").populate("author").sort("desc");
  //  console.log(allquestions)
  let insertedmail = req.body.email;
  let insertedpassword = req.body.password;
  currentuser = await user.findOne({
    email: insertedmail
  })
  if (currentuser) {
    if (currentuser.password === insertedpassword) {

      session = req.session;
      session.userid = req.body.email;

      res.render("allQuestions", {
        allquestions, currentuser
      });
    } else {
      res.render('error', {
        error: {
          error: "hhh"
        },
        message: "invalid password"
      });
    }
  } else {
    res.render("error", {
      error: {
        error: "error"
      },
      message: "A user with that email does not exist"
    })
  }

})








module.exports = router;