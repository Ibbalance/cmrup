const express = require("express");
const mongoose = require ("mongoose");
const usersm = require("../models/user");
const answer = require("../models/answer")
const multer = require("multer")
const path = require("path")
const questions = require("../models/question")

const router = express.Router();


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads')
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}${file.originalname}${path.extname(file.originalname)}`
    cb(null, fileName)
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "text/html" || file.mimetype == "image/jpeg"||file.mimetype=="text/javascript"||file.mimetype=="text/css"||file.mimetype=="text/plain"||file.mimetype=="image/jpg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg .css .html .js  format allowed!'));
    }
  }
})
var upload = multer({
  storage: storage
})





router.post("/:answerOwner/:questionAns",upload.array("answerfile"), async(req, res)=> {
  if (req.session.userid) {
    answern = req.body.answer;
    questionAnswered = req.params.questionAns;
    answerAuthor = req.params.answerOwner;

    newAnswer = new  answer({
      questionanswered: questionAnswered, author: answerAuthor, answer: answern,
      answercode:req.body.answercode,
      answerfile:req.files
    })

    await newAnswer.save();

    currentuser = await usersm.findById(req.params.answerOwner);

    currentuser.answers = currentuser.answers.concat(newAnswer._id);
    await currentuser.save();



    currentuserup = usersm.findById(req.params.answerOwner).populate("question").populate("answer")

    updateque = await questions.findById(req.params.questionAns);

    updateque.answers = updateque.answers.concat(newAnswer._id);
    await updateque.save()

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


    res.render("questionDetail", {
      question,
      currentuserup
    })



  } else {
    res.send("you must be logged in")
  }
})










module.exports = router;