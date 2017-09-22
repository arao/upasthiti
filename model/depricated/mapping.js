const mongoose = require('./config').mapping
const schema = required('./Schema');

/*
Subject = new Schema({
   subject_name:{type:String, required:true, dropDups:true, unique:true}
})
 */

let getSub = obj=>{
    "use strict";
    /*
        obj structure
        obj.sub_id = subject id
     */

    let collection = 'SubjectId';
    const subject = mongoose.model("subject_table", schema.Subject, collection);

    subject.findById(obj.sub_id)
        .then(doc=>{return Promise.resolve();}, err=>{ throw err;})
};


let getSubId = obj=>{
    "use strict";
    /*
        obj structure
        obj.class
        obj.sem = semester of the class
        obj.subject = subject of the class
        obj.batch = addmission year of the class;
     */

    let collection = 'SubjectId';
    const subject = mongoose.model("subject_table", schema.Subject, collection);

    obj.find({subject_name: obj.class+obj.sem+obj.subject+obj.batch}).then(res=>{

        return Promise.resolve(res._id);
    }, err=>{throw err})
};


let setSubId = obj=>{
    "use strict";
    /*
       obj structure
       obj.class
       obj.sem = semester of the class
       obj.subject = subject of the class
       obj.batch = addmission year of the class;

    */

    let collection = 'SubjectId';
    const Subjects = mongoose.model("subject_table", schema.Subject,collection);

    let subject = new Subjects();
    subject.subject_name = obj.class+obj.sem+obj.subject+obj.batch;

    subject.save().then(res=>{
        return Promise.resolve(res._id);
    }, err=>{throw err;})
};

/*
 Classtable = new Schema({
    teacher_id: {type:String, required:true, dropDups:true, unique:true},
    class:{type:[String], required:true}
});
};
 */


let addTeacher = obj=>{
        "use strict";
        /*
           obj structure
           obj.teacher_id
         */

        let collection = 'TeacherSubjectMapping';

        const class_table = mongoose.model("class_table", schema.Classtable, collection);

        let classmap = new class_table();
        classmap.teacher_id = obj.teacher_id;
        classmap.class = [];
        classmap.save()
            .then(res=>{return Promise.resolve(res)},err=>{throw err;})
    };


let appendTeacherMapping = obj=>{
    "use strict";

        /*
           obj structure
           obj.teacher_id
           obj.sub_id
         */

    let collection = 'TeacherSubjectMapping';

    const class_table = mongoose.model("class_table", schema.Classtable, collection);
    class_table.updateOne({teacher_id: obj.teacher_id},{$addToSet:{class: obj.sub_id}})
        .then(res=>{return Promise.resolve(res)}, err=>{throw err;})
};


let getTeacherMapping = obj=>{
        "use strict";
        /*
            obj structure
            obj.teacher_id
         */


        let collection = 'TeacherSubjectMapping';

        const class_table = mongoose.model("class_table", schema.Classtable, collection);

        class_table.find({teacher_id:obj.teacher_id}).then(doc=>{return Promise.resolve(doc);},err=>{throw err;})
    };

module.exports.get_Sub = getSub;
module.exports.get_SubId = getSubId;
module.exports.set_SubId = setSubId;
module.exports.add_Teacher = addTeacher;
module.exports.add_Sub = appendTeacherMapping;
module.exports.get_mapping = getTeacherMapping;