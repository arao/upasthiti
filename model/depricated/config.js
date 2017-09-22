const  mongoose  = require('mongoose');

mongoose.Promise = Promise;

const profile_url = "mongodb://localhost:27017/Profile";
const attendance_url = "mongodb://localhost:27017/Attendance";
const mapping_url =  "mongodb://localhost:27017/Mapping";

let opt ={useMongoClient: true};

const profile = mongoose.createConnection(profile_url, opt)(res=>{},err=>{throw err});
const attendance = mongoose.createConnection(attendance_url,opt)(res=>{},err=>{throw err});
const mapping = mongoose.createConnection(mapping_url,opt)(res=>{},err=>{throw err});



module.exports.mapping =  mapping;
module.exports.attendance = attendance;
module.exports.profile = profile;