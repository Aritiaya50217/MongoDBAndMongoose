var express = require('express');
var router = express.Router();
// import folder models
const Blogs = require('../models/blog');


// หน้าแรกของ router blog
router.get('/',function(req,res,next){
    // แสดงหน้า index.ejs
    // {key:value}
    res.render("blogs/index",{data:"Hello  World"});
});

router.get('/add',function(req,res,next){
    res.render("blogs/add",{data:"เขียนบทความ"});
});

router.post('/add',function(req,res,next){
    data = new Blogs({
        title:req.body.title,
        author:req.body.author,
        category:req.body.category
    })
    // เรียกใช้ function createBlog ที่อยู่ใน models/blog.js
    Blogs.createBlog(data,function(err,callback){
        if(err) console.log(err)
        res.redirect("/")
    });
});



module.exports = router;