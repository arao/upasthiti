const mongoose = require('mongoose');
let Schema = mongoose.Schema;
const Profile={
    Student: new Schema({
        name : {type:String, required: true},
        roll_no : {type:String, required:true, unique:true, dropDups: true},
        mobile_no : {type: Number, required:true, unique:true, dropDups: true},
        email_id : {type:String, required:true, unique:true, dropDups:true}
    }),
    Teacher: new Schema({
        name : {type:String, required: true},
        teacher_id : {type:String, required:true, unique:true, dropDups: true},
        mobile_no : {type: Number, required:true, unique:true, dropDups: true},
        email_id : {type:String, required:true, unique:true, dropDups:true}
    })
};

const Login = new Schema({
    email_id: {type:String, required:true, dropDups:true, unique:true},
    username : {type:String, required:true, unique:true, dropDups: true},
    password : {type: String, required:true},
    verified : {type:Boolean, default:false}
});

const Attendance = new Schema({
    roll_no:{type:String, required:true, dropDups:true, unique:true},
    name : {type:String, required:true,},
    attend : {type:[{"date":Date, "teacher":String}]},
    note : {type:[{"date":Date, "note":String}]}
});

const Classtable = new Schema({
    teacher_id: {type:String, required:true, dropDups:true, unique:true},
    class:{type:[String], required:true}
});

const Subject = new Schema({
   subject_name:{type:String, required:true, dropDups:true, unique:true}
});
/*
const SimSchema = new Schema({
    msisdn     : { type : String , unique : true, required : true, dropDups: true },
    imsi       : { type : String , unique : true, required : true, dropDups: true },
    status     : { type : Boolean, default: true},
    signal     : { type : Number },
    probe_name : { type:  String , required : true }
});
*/
module.exports.Profile = Profile;
module.exports.Login = Login;
module.exports.Attendance = Attendance;
module.exports.Classtable = Classtable;
module.exports.Subject = Subject;