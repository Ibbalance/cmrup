var express = require('express');
var router = express.Router();
const user = require("../models/user");




/* GET users listing. */
router.get('/:userid', async function(req, res, ) {
  
  currentuser = await  user.findOne({email:req.session.userid}) ;
  
  userSearch = await user.findById(req.params.userid).populate("answers").populate("questions")
  
  
  res.render("user",{userSearch,currentuser})
});

module.exports = router;
