const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const adminSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true,
    },
    passwordHash : {
        type : String,
        required : true,
    },
    role : {
        type : String, 
        default : 'admin',
        enum : ['admin'],
    },
    Permissions: {
        type : Array,
        default : [],
    },
    createdAt : {
        type : Date , 
        default : Date.now,
    },
});

adminSchema.pre('save',async function(next){
    if(this.isModified('passwordHash')){
        const salt = await bcrypt.genSalt(10);
        this.passwordHash = await bcrypt.hash(this.passwordHash , salt);
    }
    next();
});

const Admin = mongoose.model('Admin' , adminSchema);
module.exports = Admin;

