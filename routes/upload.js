var express = require('express');
var path = require('path');
var router = express.Router();
const user = require("../models/user");
const questions = require("../models/question");
const h = "jjj" ;
const gg = path.resolve(__dirname,"..","public")
router.get("/",(req,res)=>{
  res.send(gg)
})

router.get('/:path', function(req, res){
  const file = `${gg}${req.params.path}`;
  res.download(file); // Set disposition and send it.
});



module.exports = router