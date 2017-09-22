const mongoose = required('./config').profile;
const schema = required('./Schema');


/*
 Student: {
        name : {type:String, required: true},
        roll_no : {type:String, required:true, unique:true, dropDups: true},
        mobile_no : {type: Number, required:true, unique:true, dropDups: true},
        email_id : {type:String, required:true, unique:true, dropDups:true}
    }
 */


let insert_Student= obj=>{
    "use strict";
    /*
        object structure
        obj.class = class name
        obj.batch = batch name(year of admission
        obj.name = name of student
        obj.roll_no = roll no of student
        obj.modile_no = mobile no of student
        obj.email_id = student email id
     */
    if(obj.class === undefined || obj.batch === undefined){
        throw "datbase undefined error";
    }
    const student_profile = mongoose.model("student_profile_"+obj.class+"_"+obj.batch,schema.Profile.Student);
    let profile = new student_profile();
    profile.name = obj.name;
    profile.roll_no = obj.roll_no;
    profile.mobile_no = obj.mobile_no;
    profile.email_id = obj.email_id;
    profile.save().then(res=>{return Promise.resolve(res);}, err=>{throw err;});
};

/*
Teacher:{
        name : {type:String, required: true},
        teacher_id : {type:String, required:true, unique:true, dropDups: true},
        mobile_no : {type: Number, required:true, unique:true, dropDups: true},
        email_id : {type:String, required:true, unique:true, dropDups:true}
    }
 */
let insert_Teacher= obj=>{
    "use strict";
    /*
        object structure
        obj.name = name of teacher
        obj.roll_no = roll no of teacher
        obj.modile_no = mobile no of teacher
        obj.email_id = teacher email id
     */

    const student_profile = mongoose.model("teacher_profile",schema.Profile.teacher);
    let profile = new student_profile();
    profile.name = obj.name;
    profile.teacher_id = obj.roll_no;
    profile.mobile_no = obj.mobile_no;
    profile.email_id = obj.email_id;
    profile.save().then(res=>{return Promise.resolve(res);}, err=>{throw err;});
};

module.exports.insert_student = insert_Student;
module.exports.insert_teacher = insert_Teacher;