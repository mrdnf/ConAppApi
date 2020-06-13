const mongoose = require('mongoose');

const connectDB = async()=>{
    const conn = await mongoose.connect("mongodb+srv://dnf:000@danofa-3feqm.mongodb.net/crud?retryWrites=true&w=majority"
        /* 'mongodb://localhost:27017/SuperMarket' */,{
        useNewUrlParser : true ,
        useCreateIndex : true ,
        useFindAndModify : false ,
        useUnifiedTopology :true
    });
    console.log(`MongoDB Connected : ${conn.connection.host}`.blue.underline.bold)
}

module.exports = connectDB;
