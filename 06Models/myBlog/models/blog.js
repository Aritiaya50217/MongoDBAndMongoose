const mongoose = require('mongoose');
const mongo = require('mongodb');
// ใส่ที่อยู่ url ของเรา กรณีนี้ใช้ mongodb atlas
// BlogDB ชื่อ database
const dbUrl = 'mongodb+srv://dbUser:oil12345@testmongodb.4o6hj.mongodb.net/BlogDB';


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
});


module.exports = mongoose.model("blogs",blogSchema);
