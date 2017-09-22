const mongoose = required('mongoose').attendance;
const schema = required('./Schema');
/*
Attendance = {
    roll_no:{type:String, required:true, dropDups:true, unique:true},
    name : {type:String, required:true,},
    attend : {type:[{"date":Date, "teacher":String}]},
    note : {type:[{"date":Date, "note":String}]}
}
 */


let add_student = obj=>{
    "use strict";
    /*
        obj structure
        obj.sub_id = unique subject id
        obj.name = name of student
        obj.roll_no = roll no of student
        obj.attend = []
        obj.note = []
     */

    let student = mongoose.model(obj.sub_id, schema.attendance, obj.sub_id);

    student.name = obj.name;
    student.roll_no = obj.roll_no;
    student.attend = [];
    student.note = [];
    student.save().then(res=>{return Promise.resolve(res)},err=>{throw err;});
};


let add_attendance = obj=>{
    "use strict";
    /*
        obj structure
        obj.sub_id = subject id
        obj.roll_no = roll no of student
        obj.date = attendance date
        obj.teacher_id = teacher_id of inserting data
     */

    let student = mongoose.model(obj.sub_id, schema.attendance, obj.sub_id);

    student.update({roll_no : obj.roll_no}, {$addToSet:{attend: {'date': obj.date, 'teacher':obj.teacher_id }}})
        .then(res=>{return Promise.resolve(res)}, err=>{ throw err}); //attend : {type:[{"date":Date, "teacher":String}]},
};


let add_note = obj=>{
    "use strict";
    /*
        obj structure
        obj.sub_id = subject id
        obj.roll_no = roll no of student
        obj.date = attendance date
        obj.note
     */

    let student = mongoose.model(obj.sub_id, schema.attendance, obj.sub_id);

    student.update({roll_no : obj.roll_no}, {$addToSet:{note: {'date': obj.date, 'note':obj.note }}})
        .then(res=>{ return Promise.resolve(res)}, err=>{ throw err}); //attend : {type:[{"date":Date, "teacher":String}]},
};


let get_note = obj=>{
    "use strict";
    /*
        obj structure
        obj.sub_id
        obj.roll_no = roll no of student
     */


    let student = mongoose.model(obj.sub_id, schema.attendance, obj.sub_id);

    student.find({roll_no : obj.roll_no})
        .then(doc=>{return Promise.resolve(doc.note)},err=>{throw err});
};


let get_attendance = obj=>{
    "use strict";
    /*
        obj structure
        obj.sub_id
        obj.roll_no = roll no of student
     */


    let student = mongoose.model(obj.sub_id, schema.attendance, obj.sub_id);

    student.find({roll_no : obj.roll_no})
        .then(doc=>{return Promise.resolve(doc.attend)},err=>{throw err});
};


let get_register = obj=>{
    "use strict";
    /*
        obj structure
        obj.sub_id
     */

    let student = mongoose.model(obj.sub_id, schema.attendance, obj.sub_id);
    student.find({}).then(doc=>{ return Promise.resolve(doc)},err=>{throw err});
};


module.exports.add_note = add_note;
module.exports.get_note = get_note;
module.exports.add_student = add_student;
module.exports.add_attendance = add_attendance;
module.exports.get_attendance = get_attendance;
module.exports.get_register = get_register;