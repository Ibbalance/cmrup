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
    }).populate({
      path: "questions", populate: {
        path: "tags"
      }}).then(()=> {
      console.log("working")}).catch((err)=> {
      console.log(err)})

    let allquestions = await currentuser.questions.then(()=> {
      res.render("modifylist", {
        allquestions, currentuser
      })
      console.log("ok")}).catch((h)=> {
      console.log(h)})/*await questions.find({}).populate("tags").populate("author").populate("votes").sort("votes");*/
    // res.send(allquestions)

    /*   res.send(allquestions) */

  } else {
    res.render("login")
  }}
)


router.get("/edit/:qid", async(req, res)=> {

  question = await questions.findById(req.params.qid).populate("author").then(()=> {
    console.log("working..")}).catch((err)=> {
    console.log("err")
  })

  const currentuser = await usersm.findOne({
    email:
    req.session.userid
  }).populate("questions").then(()=> {

    res.render("modifyquestion", {
      question, currentuser
    })


    console.log("working..")}).catch((err)=> {
    console.log("err")
  })

  //( res.send(question)

})


router.get("/delete/:id", async(req, res)=> {
  tto = await questions.findOneAndDelete({
    _id: req.params.id
  }, (err)=> {
    if (err) {
      console.log(err)
    }
    console.log("sucess")
  }).clone()/*.then(()=> {
    console.log("working..")}).catch((err)=> {
    console.log("err")
  }) */



  const currentuser = await usersm.findOne({
    email:
    req.session.userid
  }).populate("questions").then(()=> {
    console.log("working..")}).catch((err)=> {
    console.log("err")
  })


  question = allquestions = await questions.find().populate("tags").populate("author").populate("votes").sort("votes").then(()=> {
    console.log("working..")}).catch((err)=> {
    console.log("err")
  })




  res.render("allQuestions",
    {
      currentuser,
      question
    })
})





router.post("/update/:id", async(req, res)=> {

  const currentuser = await usersm.findOne({
    email:
    req.session.userid
  }).populate("questions").then(()=> {
    console.log("working..")}).catch((err)=> {
    console.log("err")
  })
  question = allquestions = await questions.find().populate("tags").populate("author").populate("votes").sort("votes").then(()=> {
    console.log("working..")}).catch((err)=> {
    console.log("err")
  })



  tuu = await questions.findByIdAndUpdate(req.params.id,
    {
      questiontitle: req.body.title,
      questionbody: req.body.questionbody
    }).then(()=> {
      console.log("working..")}).catch((err)=> {
      console.log("err")
    })
  // await tuu.save()
  res.render("allQuestions",
    {
      currentuser,
      question
    })


})







module.exports = router