var express = require('express');
var router = express.Router();
// import folder models
const Blogs = require('../models/blog');
// import express validator ที่เราติดตั้ง
const {check,validationResult} = require('express-validator');

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
// การลบต้องใส่พารามิเตอร์เสมอ 
// :id คือ พารามิเตอร์
router.get('/delete/:id',function(req,res,next){
        // เรียกใช้ function deleteBlogs ที่อยู่ใน models/blog.js
    Blogs.deleteBlogs([req.params.id],function(err){
        if (err) throw err
                res.redirect("/blogs")
    })
})



// ใช้ express validator ในการตรวจสอบข้อมูลที่กรอกในฟอร์ม
router.post('/add',[
    // ถ้าข้อมูล title เป็นค่าว่าง(empty) ให้แสดงข้อความว่า 'กรุณาป้อนชื่อบทความ'
    check('title', 'กรุณาป้อนชื่อบทความ').not().isEmpty(),
    check('author','กรุณาป้อนชื่อผู้เขียน').not().isEmpty()
],function(req,res,next){
    //check validate data
    const result= validationResult(req);
    var errors = result.errors;
    for (var key in errors) {
        console.log(errors[key].value);
    }
    // ถ้าหากป้อนค่าว่างเข้ามา
    if (!result.isEmpty()) {
        res.render("blogs/add",{data:"เพิ่มบทความ",errors:errors});
    }else{
        data = new Blogs({
            title:req.body.title,
            author:req.body.author,
            category:req.body.category
        })
        // เรียกใช้ function createBlog ที่อยู่ใน models/blog.js
        Blogs.createBlog(data,function(err){
            if(err) console.log(err)
            // เมื่อ save จะไปยังหน้า /blogs
            res.redirect("/blogs")
        });
    }

});



module.exports = router;