const express = require("express");
const router = express.Router()
const mongoose = require ("mongoose");
const usersm = require("../models/user");
const questions = require("../models/question");
const answers = require("../models/answer");
const votes = require("../models/vote");


router.get("/upvote/question/:questionid/:voter", async(req, res)=> {

  if (req.session.userid) {
    
     newvote = await new votes({
      author: req.params.voter, votescount: 1
    })
    await newvote.save()

    queup = await questions.findById(req.params.questionid).populate("votes");
    queup.votes = await queup.votes.concat(newvote._id)
    await queup.save();

    updated = await questions.findOne({
      _id: req.params.questionid
    }).populate("votes")


    res.send(updated.votes)


  } else {
    res.send("you must be logged in before voting")
  }

})



router.get("/downvote/question/:questionid/:voter",
  async(req, res)=> {

    if (req.session.userid) {
      let newvote = await new votes({
        author: req.params.voter, votescount: -1
      })
      await newvote.save()

      let queup = await questions.findById(req.params.questionid).populate("votes");
      queup.votes = await queup.votes.concat(newvote._id)
      await queup.save(); 
      
      

      let   updated = await questions.findOne({
        _id: req.params.questionid
      }).populate("votes")


      res.send(updated.votes) 


    } else {
      res.send("you must be logged in before voting")
    }







  })

//upvote answer


router.get("/upvote/answer/:questionid/:voter", async(req, res)=> {

  if (req.session.userid) {
    newvote = await new votes({
      author: req.params.voter, votescount: 1
    })
    await newvote.save()

    queup = await answers.findById(req.params.questionid).populate("votes");
    queup.votes = await queup.votes.concat(newvote._id)
    await queup.save();

    updated = await answers.findOne({
      _id: req.params.questionid
    }).populate("votes")


    res.send(updated.votes)


  } else {
    res.send("you must be logged in before voting")
  }

})


//downvote answers


router.get("/downvote/answer/:questionid/:voter",
  async(req, res)=> {

    if (req.session.userid) {
      let newvote = await new votes({
        author: req.params.voter, votescount: -1
      })
      await newvote.save()

      let queup = await answers.findById(req.params.questionid).populate("votes");
      queup.votes = await queup.votes.concat(newvote._id)
      await queup.save();

      let   updated = await answers.findOne({
        _id: req.params.questionid
      }).populate("votes")


      res.send(updated.votes)


    } else {
      res.send("you must be logged in before voting")
    }







  })











module.exports = router;