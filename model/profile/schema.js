const mongoose = require('mongoose');
let Schema = mongoose.Schema;

const Profile={
    Student: new Schema({
        name : {type:String, required: true},
        roll_no : {type:String, required:true, unique:true, dropDups: true},
        mobile_no : {type: Number, required:true, unique:true, dropDups: true},
        email_id : {type:String, required:true, unique:true, dropDups:true},
        username : {type:String, required:true, unique:true, dropDups: true},
        password : {type: String, required:true},
        verified : {type:Boolean, default:false}
    }),
    Teacher: new Schema({
        name : {type:String, required: true},
        teacher_id : {type:String, required:true, unique:true, dropDups: true},
        mobile_no : {type: Number, required:true, unique:true, dropDups: true},
        email_id : {type:String, required:true, unique:true, dropDups:true},
        username : {type:String, required:true, unique:true, dropDups: true},
        password : {type: String, required:true},
        verified : {type:Boolean, default:false}
    })
};

const Login = new Schema({
    //email_id: {type:String, required:true, dropDups:true, unique:true},
    username : {type:String, required:true, unique:true, dropDups: true},
    password : {type: String, required:true},
    verified : {type:Boolean, default:false}
});

module.exports.Profile = Profile;
module.exports.Login = Login;