const mongoose = require('mongoose');
const mongodb = require('mongodb');
/*
// ใส่ที่อยู่ url ของเรา กรณีนี้ใช้ mongodb atlas
// BlogDB ชื่อ database
const dbUrl = 'mongodb+srv://dbUser:oil12345@testmongodb.4o6hj.mongodb.net/BlogDB';
*/

const dbUrl = 'mongodb://localhost:27017/BlogDB'

mongoose.connect(dbUrl,{
    useNewUrlParser:true
});

// เชื่อมต่อ db

const db = mongoose.connection
const Schema = mongoose.Schema

const blogSchema = new Schema({
    id:{
        type:Schema.ObjectId
    },
    title:{
        type:String,
        // บังคับให้กรอก
        required:true,
    },
    author:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    }
})

const Blogs = module.exports = mongoose.model("blogs",blogSchema)

module.exports.createBlog=function(newBlogs,callback){
    newBlogs.save(callback)
}
// add
module.exports.getAllBlogs=function(data){
    Blogs.find(data)
}
// delete
module.exports.deleteBlogs = function(id,callback){
    // ค้นหา id เมื่อเจอแล้วลบ
    Blogs.findByIdAndDelete(id,callback)
}