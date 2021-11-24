const express = require("express");
const router = express.Router()
const mongoose = require ("mongoose");
const usersm = require("../models/user");
const questions = require("../models/question");
const answers = require("../models/answer");
const comments = require("../models/comment");


router.get("/:answerid", async(req, res)=> {
  if (req.session.userid) {
    currentuser = await usersm.findOne({
      email: req.session.userid
    })
    answerid = req.params.answerid;
    res.render("comment", {
      answerid, currentuser
    })
  } else {
    res.send("You must be logged in before you can comment")
  }
})




router.post("/:answerid/:owner", async(req, res)=> {

  if (req.session.userid) {

    newComment = await new comments({
      answercommentedon: req.params.answerid,
      author: req.params.owner,
      comment: req.body.comment
    })


    await newComment.save();

    updateAnswerComment = await answers.findById(req.params.answerid);

    updateAnswerComment.comments = await updateAnswerComment.comments.concat(newComment._id);
    await updateAnswerComment.save();
    
    const question = await questions.findById(req.params.questionAns
    ).populate("author").populate("tags").populate("answers").populate({
        path: "answers", populate: {
          path: "votes"
        }
      }).populate({
        path: "answers", populate: {
          path: "author"
        }, populate: {
          path: "comments", populate: {
            path: "author"
          }
        }
      }).populate("votes").populate({
        path: "answers", populate: {
          path: "author"
        }
      }).sort({"answers":1})

currentuserup = await usersm.findOne({email:req.session.userid})

    /*res.render("questionDetail",{question,currentuserup}) */
    res.redirect("/allquestions")

  } else {

    res.send("you must be logged in before commenting")
  }

})









module.exports = router;