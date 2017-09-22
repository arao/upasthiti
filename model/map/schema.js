const mongoose = require('mongoose');
let Schema = mongoose.Schema;

const Classtable = new Schema({
    teacher_id: {type:String, required:true, dropDups:true, unique:true},
    class:{type:[String], required:true}
});

const Subject = new Schema({
    subject_name:{type:String, required:true, dropDups:true, unique:true}
});

const Student = new Schema({
    student_id : {type :String, required:true, unique:true, dropDups:true},
    subject : [{type:string,unique:true, dropDups:true}]
});

module.exports.Classtable = Classtable;
module.exports.Subject = Subject;
module.exports.Student = Student;