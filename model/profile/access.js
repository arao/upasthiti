const  mongoose  = require('mongoose');
const opt ={useMongoClient: true};
const uri = "mongodb://localhost:27017/Profile";

mongoose.connect(uri,opt)(res=>{},err=>{throw err});

module.exports.db = mongoose;