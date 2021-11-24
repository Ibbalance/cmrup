const express = require("express");
const mongoose = require ("mongoose");
const usersm = require("../models/user");
const questions = require("../models/question")

const router = express.Router();



router.get("/:id/:uid", async (req, res)=> {
  session = req.session;
  if (session.userid) {
    try {
      const question = await questions.findById(req.params.id
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
        }).sort({"answers.votes":-1})


      const currentuser = await usersm.findById(
        req.params.uid).populate("questions")

      res.render("questionDetail", {
        question, currentuser
      })  //res.send(question)
    }
    catch (err) {
      console.log(err)
    }

  } else {
    res.render("login")
  }//res.send(currentuser)
})











module.exports = router