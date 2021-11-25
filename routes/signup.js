const express = require("express");
const mongoose = require ("mongoose");
const usersm = require("../models/user");
const questions = require("../models/question")
const answers = require("../models/answer")
const votes = require("../models/vote")
const multer = require("multer");
const path = require("path");



var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads')
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}${file.originalname}${path.extname(file.originalname)}`
    cb(null, fileName)
  }
})

var upload = multer({
  storage: storage
})

const router = express.Router();

/*router.use(logger('dev'));
router.use(express.json());
router.use(express.urlencoded({
  extended: false
}));
router.use(cookieParser());
//router.use(express.static(path.join(__dirname, 'public')));

*/

router.get("/d", async (req, res)=> {

  const user = await usersm.find().remove()
const g = await questions.find().remove()


  /* const question = await questions.find({}).populate({
    path: "votes", populate: {
      path: "author"
    }}) */

  const userv = await usersm.find()


  /* user = await questions.find().populate("author").populate("tags").populate({
    path: "answers", populate: {
      path: "author"
    }}).exec() */


  /* const question = await questions.find(/*"6187d4a21e551dbc571a41cb"
  ).populate("author").populate("tags").populate("votes").populate({
      path: 'answers',
      populate: {
        path: 'comments'
      }
    }).remove() */

  res.send(g)


})







router.post("/", upload.single("profilepic"), async(req,
  res)=> {
  let displayname = req.body.displayname;

  let email = req.body.email;
  let password1 = req.body.password1;
  let password2 = req.body.password2;
  if (password1 === password2) {
    const newUser = await new usersm({
      displayname: displayname, email: email, password: password1, profilepic: removePublic(req.file.path)
    })
    await newUser.save((err, suc)=> {
      if (err) {
        res.render("error", {
          error: err, message: err
        })
      } else if (suc) {
        res.render("login")
      }
    })

  } else {
    res.send("password must be the same")
  }

})


function removePublic(string) {
  return string.slice(7)
}




module.exports = router;
