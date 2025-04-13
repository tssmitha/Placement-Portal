const {Schema , model} = require('mongoose');

const studentSchema = new Schema({
    name : { type : String , required : true},
    usn : { type : String , required : true , unique : true},
    email : {type : String , required : true , unique : true},
    course : {type : String , required : true},
    password : {type : String},
    registeredAt : {type : Date , default : Date.now},
});

const Student = model('Student' , studentSchema);

module.exports = Student;