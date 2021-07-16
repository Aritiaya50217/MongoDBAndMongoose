var express = require('express');
var router = express.Router();
// import folder models
const Blogs = require('../models/blog');


// หน้าแรกของ router blog
router.get('/',function(req,res,next){
    // เรียกใช้งานฟังก์ชัน getAllBlogs 
    // ต้องการเอาข้อมูลในฐานข้อมูลมาแสดงผล
    Blogs.getAllBlogs(function(err,blogs){
        if (err) throw err
        // แสดงหน้า index.ejs
        // {key:value}
        res.render("blogs/index",{data:"Hello  World",blogs:blogs});
    });
    
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
        // เมื่อ save จะไปยังหน้า /blogs
        res.redirect("/blogs")
    });
});



module.exports = router;