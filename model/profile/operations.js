const mongoose = require('./access');
const schema = require('./schema');


/*
 Student: {
        name : {type:String, required: true},
        roll_no : {type:String, required:true, unique:true, dropDups: true},
        mobile_no : {type: Number, required:true, unique:true, dropDups: true},
        email_id : {type:String, required:true, unique:true, dropDups:true}
    }
 */


let student_signup= obj=>{
    "use strict";
    /*
        object structure
        obj.batch = batch of th student
        obj.class = class name
        obj.name = name of student
        obj.roll_no = roll no of student
        obj.modile_no = mobile no of student
        obj.email_id = student email id
     */
    const student_profile = mongoose.model(obj.class+"_"+obj.batch,schema.Profile.Student,obj.class+"_"+obj.batch);
    let profile = new student_profile();
    profile.name = obj.name;
    profile.roll_no = obj.roll_no;
    profile.mobile_no = obj.mobile_no;
    profile.email_id = obj.email_id;
    profile.password = obj.password;
    profile.verify = false;
    profile.save().then(res=>{return Promise.resolve(res);}, err=>{throw {err: err, point: "model/profile/operation/studentsignup"};});
};

let student_signin = obj =>{
    "use strict";
    /*
        obj.username
        obj.password
        obj.class
        obj.batch
     */
    const profile = mongoose.model(obj.class+"_"+obj.batch,schema.Profile.Student,obj.class+"_"+obj.batch);
    profile.findOne({username:obj.username}).then(doc=>{
        if(doc === null){
            return Promise.reject({
                err : "User not exist"
            });
        }
        else if(doc.password === obj.password) {
            return Promise.resolve({
                username: doc.username,
                roll_no: doc.roll_no,
                email_id: doc.email_id,
                name : doc.name
            });
        }else{
            return Promise.reject({
                err: "Invalid Credentials"
            })
        }
    }, err =>{throw {err: err, point: "model/profile/operation/studentsignin"};});

};

/*
Teacher:{
        name : {type:String, required: true},
        teacher_id : {type:String, required:true, unique:true, dropDups: true},
        mobile_no : {type: Number, required:true, unique:true, dropDups: true},
        email_id : {type:String, required:true, unique:true, dropDups:true}
    }
 */

let teacher_signup= obj=>{
    "use strict";
    /*
        object structure
        obj.name = name of teacher
        obj.teacher_id = id of teacher
        obj.modile_no = mobile no of teacher
        obj.email_id = teacher email id
     */

    const teacher_profile = mongoose.model("teacher_profile",schema.Profile.teacher);
    let profile = new teacher_profile();
    profile.name = obj.name;
    profile.teacher_id = obj.roll_no;
    profile.mobile_no = obj.mobile_no;
    profile.email_id = obj.email_id;
    profile.password = obj.password;
    profile.verify = false;
    profile.save().then(res=>{return Promise.resolve(res);}, err=>{throw {err: err, point: "model/profile/operation/teachersignup"};});
};

let teacher_signin = obj=>{
    "use strict";
    const profile = mongoose.model("teacher_profile",schema.Profile.Student,"teacher_profile");
    profile.findOne({username:obj.username}).then(doc=>{
            if(doc === null){
                return Promise.reject({
                    err : "User not exist"
                });
            }
            else if(doc.password === obj.password) {
                return Promise.resolve({
                    username: doc.username,
                    teacher_id: doc.teacher_id,
                    email_id: doc.email_id,
                    name : doc.name
                });
            }else{
                return Promise.reject({
                    err: "Invalid Credentials"
                })
            }
        }, err =>{throw {err: err, point: "model/profile/operation/teachersignin"};});

};


module.exports.student_signup = student_signup;
module.exports.student_signin = student_signin;
module.exports.techer_signup = teacher_signup;
module.exports.techer_signin = teacher_signin;