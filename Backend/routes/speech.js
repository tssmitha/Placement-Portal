const express = require("express");
const router = express.Router();
const multer = require("multer");
const { createClient } = require("@deepgram/sdk");

// Correct way to initialize the Deepgram SDK in v3
const deepgram = createClient(process.env.DEEPGRAM_API_KEY);

const upload = multer();

router.post("/", upload.single("audio"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No audio file uploaded" });
    }

    const audioBuffer = req.file.buffer;

    const transcription = await deepgram.transcription.preRecorded(
      { buffer: audioBuffer, mimetype: req.file.mimetype },
      { punctuate: true }
    );

    res.json({ transcript: transcription.results.channels[0].alternatives[0].transcript });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
