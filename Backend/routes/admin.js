const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Admin = require('../Models/admin'); // Adjust path if needed
const Form = require('../Models/releaseFormSchema');
const path = require('path');
const multer = require('multer');
const mongoose = require('mongoose');
const { getAdminStats } = require('../controllers/adminControllers');

const router = express.Router();

// Environment variables (Ensure JWT_SECRET is set in .env)
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Admin login route
router.post('/admin-login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the admin exists
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(401).json({ message: 'Invalid credentials or not an admin' });
        }

        // Verify the password
        const isPasswordValid = await bcrypt.compare(password, admin.passwordHash);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials or not an admin' });
        }

        // Generate a JWT token
        const token = jwt.sign(
            { id: admin._id, role: admin.role, permissions : admin.permissions},
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ token, message: 'Login successful' });
    } catch (err) {
        console.error('Admin login error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

//Form Realease API
const storage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null , 'uploads/');
    },
    filename: (req, file, cb)=>{
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null , file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    },
});

const upload = multer({storage});

router.post('/release', upload.single('jdFile') , async(req, res) => {
    try{
        console.log('File' , req.file);
        if(!req.file){
            return res.status(400).json({error : 'Job Description(JD) is required '});
        }
        const newForm = new ReleaseForm({
            jobDescription : req.file.path,
            studentDetails : { usn : null},
            submittedBy : 'admin',
        });

        await newForm.save();
        res.status(201).json({message : 'Form released sucessfully' , formId : newForm._id});
    }catch(error){
        console.error(error);
        res.status(500).json({ error : 'Server error.Please try again later.'});
    }
});


router.get('/release-form/:formId', async (req, res) => {
    const { formId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(formId)) {
        return res.status(400).json({ message: 'Invalid Form ID' });
    }

    try {
        const form = await Form.findById(formId);
        if (!form) {
            return res.status(404).json({ message: 'Form not found' });
        }
        res.status(200).json(form);
    } catch (err) {
        console.error('Error fetching form:', err);
        res.status(500).json({ message: 'Server error' });
    }
});
router.get('/release-forms' , async(req,res) => {
    try{
        const forms = await Form.find();
        res.status(200).json(forms);
    }catch(err){
        console.error(err);
    }
});

router.get('/download-jd/:formId', async (req, res) => {
    const { formId } = req.params;

    try {
        const form = await Form.findById(formId);
        if (!form || !form.jobDescription) {
            return res.status(404).json({ message: 'Job Description file not found' });
        }

        const filePath = path.join(__dirname, '..', form.jobDescription); // Construct full file path
        res.download(filePath, 'JobDescription.pdf', (err) => {
            if (err) {
                console.error('Error downloading file:', err);
                res.status(500).json({ message: 'File download failed' });
            }
        });
    } catch (err) {
        console.error('Error fetching file:', err);
        res.status(500).json({ message: 'Server error' });
    }
});


// router.get('/:id' , async(req,res)=>{
//     try{
//         const form = await ReleaseForm.findById(req.params.id);
//         if(!form){
//             return res.status(404).json({error : 'Form not found'});
//         }
//         res.status(200).json(form);
//     }catch(error){
//         console.error(error);
//         res.status(500).json({ error : 'Server error.Please try again later'});
//     }
// });

router.get('/stats', getAdminStats);

module.exports = router;

