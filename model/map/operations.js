const mongoose = require('./access');
const schema = required('./schema');

/*
Subject = new Schema({
   subject_name:{type:String, required:true, dropDups:true, unique:true}
})
 */

let subject = {
        get_id : obj => {
        "use strict";
        /*
            obj structure
            obj.sub_id = subject id
         */

        let collection = 'SubjectId';
        const subject = mongoose.model("subject_table", schema.Subject, collection);

        return subject.findById(obj.sub_id)
            .then(doc => {
                if(doc === null)return Promise.reject({err:"Wrong id"});
                return Promise.resolve({
                    id : doc_id,
                    name : doc.subject_name
                });
            }, err => {
                throw {err: err, point: "model/map/operation/subject/subject"};
            })
    },


        set_subject : obj => {
    "use strict";
    /*
        obj structure
        obj.class
        obj.sem = semester of the class
        obj.subject = subject of the class
        obj.batch = addmission year of the class;
     */
    const subject = mongoose.model("subject_table", schema.Subject, collection);

    return obj.find({subject_name: obj.class +"_"+ obj.sem +"_"+ obj.subject +"_"+ obj.batch}).then(res => {
        if(res ===null)return Promise.reject({err:"Subject Not Exist or wrong format"});
        return Promise.resolve({id:res._id, subject: res.subject_name});
    }, err => {
        throw {err: err, point: "model/map/operation/subject/subject_id"}
    })
},


        insert : obj => {
    "use strict";
    /*
       obj structure
       obj.class
       obj.sem = semester of the class
       obj.subject = subject of the class
       obj.batch = addmission year of the class;

    */

    const Subjects = mongoose.model("subject_table", schema.Subject, "subject_table");

    let subject = new Subjects();
    subject.subject_name = obj.class +"_"+ obj.sem +"_"+ obj.subject +"_"+ obj.batch;

    return subject.save().then(res => {
        return Promise.resolve({id:res._id, subject_name : res.subject_name });
    }, err => {
        throw {err: err, point: "model/map/operation/subject/insert"};
    })
}

};
/*
 Classtable = new Schema({
    teacher_id: {type:String, required:true, dropDups:true, unique:true},
    class:{type:[String], required:true}
});
};
 */

let teacher = {

     insert : obj => {
        "use strict";
        /*
           obj structure
           obj.teacher_id
         */

        let collection = 'TeacherSubjectMapping';

        const class_table = mongoose.model("class_table", schema.Classtable,"class_table");

        let classmap = new class_table();
        classmap.teacher_id = obj.teacher_id;
        classmap.class = [];
        return classmap.save()
            .then(res => {
                return Promise.resolve({teacher_id: res.teacher_id, class: res.class })
            }, err => {
                throw {err: err, point: "model/map/operation/teacher/insert"};
            })
    },


     append : obj => {
    "use strict";

    /*
       obj structure
       obj.teacher_id
       obj.subject_id
     */

    const class_table = mongoose.model("class_table", schema.Classtable, "class_table");
    return class_table.updateOne({teacher_id: obj.teacher_id}, {$addToSet: {class: obj.subject_id}})
        .then(res => {
            if(res === null)
                return Promise.reject({err : "Failed to update", teacher_id : obj.teacher_id, subject_id : obj.subject_id, status : false});
            return Promise.reject({teacher_id : obj.teacher_id, subject_id : obj.subject_id, status : true});
        }, err => {
            throw {err: err, point: "model/map/operation/teacher/append"};
        })
},


      get : obj => {
    "use strict";
    /*
        obj structure
        obj.teacher_id
     */
    const class_table = mongoose.model("class_table", schema.Classtable, "class_table");

    return class_table.find({teacher_id: obj.teacher_id}).then(doc => {
        return Promise.resolve({teacher_id: doc.teacher_id, class: doc.class});
    }, err => {
        throw {err: err, point: "model/map/operation/teacher/getclass"};
    })
}

};

/*
Student = new Schema({
    student_id : {type :String, required:true, unique:true, dropDups:true},
    subject : [{type:string,unique:true, dropDups:true}]
});
 */

let student = {
    insert: obj => {
        "use strict";
        /*
            obj.student_id
            obj.class
            obj.batch
            obj.sem
         */
        let Student = mongoose.model(obj.class + "_" + obj.sem + "_" + obj.batch, schema.Student, obj.class + "_" + obj.sem + "_" + obj.batch);
        let student = new Student();
        student.student_id = obj.student_id;
        student.subject = [];

        return student.save().then(res => {
            if (res === null) return Promise.reject({student_id: obj.student_id, status: false});
            return Promise.resolve({student_id: obj.student_id, status: false});
        }, err => {
            throw {err: err, point: "model/map/operation/student/insert"}
        })
    },

    append: obj => {
        'use strict';
        /*
            obj.student_id
            obj.subject_id
            obj.class
            obj.batch
            obj.sem
         */
        let Student = mongoose.model(obj.class + "_" + obj.sem + "_" + obj.batch, schema.Student, obj.class + "_" + obj.sem + "_" + obj.batch);
        return Student.updateOne({student_id: obj.student_id}, {$addToSet: {subject: obj.subject_id}}).then(doc=>{
            'use strict';
            if(doc === null ){return Promise.reject({student_id: obj.student_id, subject_id: obj.subject_id, status: false})}
            return Promise.resolve({student_id: obj.student_id, subject_id: obj.subject_id, status: true})
        }, err=>{
            throw {err: err, point:"model/map/operation/student/append"};
        })
    },

    get : obj=>{
        "use strict";
        /*
            obj.student_id
            obj.class
            obj.batch
            obj.sem
         */
        let Student = mongoose.model(obj.class + "_" + obj.sem + "_" + obj.batch, schema.Student, obj.class + "_" + obj.sem + "_" + obj.batch);
        return Student.findOne({student_id : obj.student_id},).then(doc=>{
            "use strict";
            if(doc === null) return Promise.reject({err:"Wrong Student Id", status: false });
            return Promise.resolve({student_id : doc.student_id, class : doc.class});
        }, err=>{throw {err: err, point: "model/map/operation/student/get"}});

    }
};

module.exports.subject = subject;
module.exports.teacher = teacher;
module.exports.student = student;