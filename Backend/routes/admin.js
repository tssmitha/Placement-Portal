const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Admin = require('./Models/Admin');


const app = express();

app.post('/api/auth/admin-login' , async(req,res)=>{
    const { email , password } = req.body;
    try{
        const user = await Admin.findOne({email});

        if(user && await bcrypt.compare(password , user.passwordHash)){
            const token = jwt.sign(
                { id : user._id , role : user.role},
                process.env.JWT_SECRET,
                {expiresIn : '1h'}
            );
            res.json({ token });
        }else{
            res.status(401).json({message : 'Invalid credentials or not an admin'});
        }
        }catch(err){
            res.status(500).json( {message : 'Server error'});
        }
});