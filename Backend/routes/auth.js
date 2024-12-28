const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Student = require('../Models/students');
const Onboarding = require('../Models/onboardingSchema');
const { sendPasswordSetupEmail } = require('../services/emailService');
const nodemailer = require('nodemailer');
const router = express.Router();

// Test Endpoint
router.get('/test', (req, res) => {
    res.json({ message: "Test endpoint is working!" });
});


router.post('/signup' , async(req,res) => {
    try{
        const { name , email , mobile , dob , usn , semester , branch , currentYear , startYear , termsAccepted } = req.body;

        if(!termsAccepted){
            return res.status(400).json({message : 'You must accept the terms and conditions'});
        }

        const newStudent = new Student({
            name,
            email,
            mobile,
            dob,
            usn,
            semester,
            branch,
            currentYear,
            startYear,
            termsAccepted,
        });

        const savedStudent = await newStudent.save();
        res.status(201).json({message : 'Registration successful. Awaiting admin approval'});
    }catch(error){
        console.log(error);
        res.status(500).json({ message : 'Error registering student' , error : error.message});
    }
});

router.post('/register' , async(req,res) => {
    const{ name, usn , email , course} = req.body;

    try{
        const existingStudent = await Student.findOne({ $or : [{email} , {usn}] });
        if(existingStudent){
            return res.status(400).json({message : 'Email or USN already exists'});
        }

        const newStudent = new Student({name , usn , email , course });
        await newStudent.save();

        sendPasswordSetupEmail(email);

        res.status(201).json({message : 'Student registred successfully. Check your email to set your password.'});
    }
    catch(error){
        res.status(500).json({message : 'Error registering student',error});
    }
});

router.post('/request-password-reset',async(req, res) => {
    const {email} = req.body;
    // console.log(email);
    try{
        const user = await Student.findOne({email});
        //console.log(user);
        if(!user){
            return res.status(404).json({message : "User not found"});
        }
        const resetToken = jwt.sign({ userId : user._id , email : user.email}, process.env.JWT_SECRET, { expiresIn : '1h'});
        //console.log(resetToken);
        const resetLink = `http://localhost:8100/reset-password?token=${resetToken}`;
        //console.log(resetLink);
        const transporter = nodemailer.createTransport({
            service : 'gmail',
            auth : {
                user : process.env.EMAIL_USER,
                pass : process.env.EMAIL_PASS
            },
        });

        const mailOptions = {
            from : process.env.EMAIL_USER,
            to : email,
            subject : 'Password Reset Request',
            html : `<p>Click <a href='${resetLink}'>here</a>to reset your password.This link is valid for 1 hour.</p>`
        };
        await transporter.sendMail(mailOptions);
        res.status(200).json({message: 'password reset link sent successfully'});
        
    }catch(error){
        console.log(error);
        res.status(500).json({message : 'General error!',error});
    }
});

router.post('/reset-password' , async(req,res) => {
    const {token , newPassword} = req.body;
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const user = await Student.findById(decoded.userId);

        if(!user){
            return res.status(404).json({message : "User not found"});
        }

        user.password = bcrypt.hashSync(newPassword,10);
        await user.save();

        res.status(200).json({mesage : 'Password reset successful'});
    }catch(error){
        res.status(400).json({message: 'Invalid or expired token' , error});
    }
});

router.post('/login',async(req,res) => {
    const {email , password} = req.body;

    try{
        const user = await Student.findOne({ email });

        if(!user){
            return res.status(404).json({message : 'User not found'});
        }

        const isPasswordCorrect = await bcrypt.compare(password , user.password);

        if(isPasswordCorrect){
            console.log("password is correct!");

            const token = jwt.sign({ userId : user._id , email : user.email } , process.env.JWT_SECRET, {expiresIn : '1h'});

            res.status(200).json({ message : 'Login Successful' , token : token});
        }else{
            console.log("password is incorrect!");
            res.status(401).json({message  : 'Invalid credentials'});
        }
    }catch(error){
        console.log('Error during login' , error);
        res.status(500).json({message : 'Server error'});
    }
});

router.post("/registered-students", async (req, res) => {
    try {
      const newStudent = new Onboarding(req.body);
      await newStudent.save();
      res.status(200).send({ message: "Student data saved successfully" });
    } catch (error) {
      console.error("Error saving student data:", error);
      res.status(500).send({ message: "Failed to save student data" });
    }
  });

module.exports = router;