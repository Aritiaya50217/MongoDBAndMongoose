var express = require('express');
var router = express.Router();

// หน้าแรกของ router blog
router.get('/',function(req,res,next){
    // แสดงหน้า index.ejs
    // {key:value}
    res.render("blogs/index",{data:"Hello  World"});
});

router.get('/add',function(req,res,next){
    res.render("blogs/add",{data:"เขียนบทความ"});
});


module.exports = router;