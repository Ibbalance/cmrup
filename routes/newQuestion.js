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
    });


    res.render("ask", {
      currentuser
    })
  } else {
    res.render("error", {
      error: "log in error", message: "You must be logged in before you can ask a question"+` <a href="/login">Log In </a>`
    })
  }
})

router.post("/", async(req, res)=> {
  session = req.session;
  if (req.session.userid) {
    au = currentuser = await   usersm.findOne({
      email: req.session.userid
    })
    //  console.log("currentuser " + au)
    // console.log("id "+ au._id)
    const newTag = await new tags({
      tagnames:
      req.body.tags
    })
    await newTag.save();
    p = req.body.tags.split(" ")
    pi = []
 await   p.forEach((t)=>{
      pi.push({tag:t})
    })
   // res.send(pi)
    

    newquestion = new questions({
      author: au._id, questiontitle: req.body.title, questionbody: req.body.questionbody, tags: newTag._id,questioncode:req.body.questioncode,
      tracktag:pi
    })
    await newquestion.save()

    addq = currentuser = await usersm.findOne({
      email: req.session.userid
    })

    allquestions = await questions.find({}).populate("tags").populate("author").populate("votes").sort({"votes":-1})
    addq.questions = addq.questions.concat(newquestion._id)
    await    addq.save()
    res.render("allQuestions", {
      allquestions, currentuser
    })  
    
    
    
    

  } else {
    res.send("you most be logged in before asking a question")
  }

})








module.exports = router;