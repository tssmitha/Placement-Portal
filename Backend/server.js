const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const quizRoutes = require('./routes/quizRoutes');
const studentRoutes = require('./routes/student');
const companyRoutes = require('./routes/companyRoutes');
const statsRouter = require('./routes/stats');
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const pdfParse = require("pdf-parse");
const natural = require("natural"); // For stemming
const questionRoutes = require('./routes/ai');
const validateRoute = require('./routes/validate');

dotenv.config();

const app = express();

app.use(cors({
    origin : 'http://localhost:8100',
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.Mongo_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((error) => console.error('MongoDB connection error: ', error));
    app.get('/api/test', (req, res) => {
        res.json({ message: "API is working!" });
    });
    

    
// Use the auth routes
app.use('/api/auth', authRoutes);
app.use('/api/admin',adminRoutes);
app.use('/api/student',studentRoutes);
app.use('/api/quizzes',quizRoutes);
app.use(cors({
    origin : 'http://localhost:8100',
    methods : ['GET' , 'POST'],
    allowedHeaders : ['Content-Type' , 'Authorization'],
}));
app.use('/api/companies', companyRoutes); 
app.use("/generate-questions", questionRoutes);
app.use("/validate", validateRoute);
app.use('/api' , statsRouter);






// Set up multer for file uploads
const upload = multer({
    dest: "uploads/", // Folder to store uploaded files
    fileFilter: (req, file, cb) => {
     if (file.mimetype === "application/pdf") {
      cb(null, true);
     } else {
      cb(new Error("Only PDF files are allowed"), false);
     }
    },
   });
   
   // Helper function to extract text from PDF
   const extractTextFromPDF = async (filePath) => {
    const fileBuffer = fs.readFileSync(filePath);
    const pdfData = await pdfParse(fileBuffer);
    return pdfData.text;
   };
   
   // Common stopwords (simplified)
   const stopwords = [
    "i", "me", "my", "myself", "we", "our", "ours", "you", "he", "him", "she", "her", 
    "it", "they", "and", "the", "to", "for", "a", "an", "in", "on", "of", "with", "as", 
    "but", "is", "was", "were", "be", "been", "being", "have", "has", "had", "do", "does", 
    "did", "at", "by", "from", "up", "down", "about", "which", "who", "what", "when", "where"
   ];
   
   // Remove stopwords from text
   const removeStopwords = (text) => {
    return text
     .split(/\s+/)
     .filter((word) => !stopwords.includes(word.toLowerCase()))
     .join(" ");
   };
   
   // Stemming using the natural library (Porter Stemmer)
   const stemText = (text) => {
    const tokenizer = new natural.WordTokenizer();
    const stemmer = natural.PorterStemmer;
    return tokenizer
     .tokenize(text)
     .map(word => stemmer.stem(word))
     .join(" ");
   };
   
   // Helper function to calculate ATS score based on keyword frequency
   const calculateATSScore = (resumeText, jobDescription) => {
    // Remove stopwords and apply stemming to both resume and job description
    const cleanedResumeText = stemText(removeStopwords(resumeText));
    const cleanedJobDescription = stemText(removeStopwords(jobDescription));
   
    const resumeWords = cleanedResumeText.toLowerCase().split(/\s+/);
    const jobWords = cleanedJobDescription.toLowerCase().split(/\s+/);
   
    // Create a word frequency map for the resume
    const resumeWordCount = {};
    resumeWords.forEach(word => {
     resumeWordCount[word] = (resumeWordCount[word] || 0) + 1;
    });
   
    // Count how many job description words are found in the resume
    let matchedWords = 0;
    jobWords.forEach(word => {
     if (resumeWordCount[word]) {
      matchedWords++;
     }
    });
   
    // Calculate ATS score as percentage of matched words
    const atsScore = Math.round((matchedWords / jobWords.length) * 100);
    return atsScore;
   };
   
   // Route to handle resume uploads
   app.post("/upload", upload.single("resume"), async (req, res) => {
    try {
     const { file } = req;
     const jobDescription = req.body.job_description;
   
     if (!file) {
      return res.status(400).json({ error: "Resume file is required." });
     }
   
     if (!jobDescription) {
      return res.status(400).json({ error: "Job description is required." });
     }
   
     // Extract text from the uploaded PDF
     const filePath = path.join(__dirname, file.path);
     const resumeText = await extractTextFromPDF(filePath);
   
     // Calculate ATS score
     const atsScore = calculateATSScore(resumeText, jobDescription);
   
     // Clean up uploaded file
     fs.unlinkSync(filePath);
   
     return res.json({ score: atsScore });
    } catch (err) {
     console.error("Error handling upload:", err);
     return res.status(500).json({ error: "An error occurred while processing the request." });
    }
   });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
