import express from "express";
import multer from "multer";
import path from "path";

const router = express.Router();

// Upload කරන images save විය යුතු ස්ථානය සහ නම තීරණය කිරීම
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // කලින් ඔබ server.js හි සෑදූ uploads folder එක
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Frontend එකේ UPLOAD_IMAGE: "/upload" ලෙස ඇති නිසා මෙහි path එක "/upload" විය යුතුයි
router.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "කරුණාකර image එකක් තෝරන්න." });
  }
  
  res.status(200).json({
    message: "Image එක සාර්ථකව upload විය!",
    imageUrl: `/uploads/${req.file.filename}`, // මෙන්න මේ URL එක DB එකේ save කරගත හැක
  });
});

export default router;