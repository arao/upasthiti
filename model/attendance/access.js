const  mongoose  = require('mongoose');
const opt ={useMongoClient: true};
const uri = "mongodb://localhost:27017/Attendance";

mongoose.connect(uri,opt)(res=>{},err=>{throw err});

module.exports.db = mongoose;