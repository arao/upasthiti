let mongoose = require('mongoose')

mongoose.connect("mongodb://localhost:27017/test",{useMongoClient: true});
mongoose.Promise = Promise;
let Schema = mongoose.Schema;
let sc = new Schema({
    vic:Number
}, {collection: "tic"} );
let z = mongoose.model("59c0072a4833173f9c319a88", sc,'59c0072a4833173f9c319a88');
t = new z();
t.vic = 1515;
t.save().then(res=>{
    "use strict";
    console.log(res)
}, err=>{console.log(err)});
z.findById("59bc2ab63795dc7472e94f4b").then(doc=>{
    "use strict";
    console.log(doc);
}, err =>{
    "use strict";
    console.log(err);
});