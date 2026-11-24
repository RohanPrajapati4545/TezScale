import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import cloudinary from '../config/cloudinary.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.join(__dirname, '../uploads/temp');

// Ensure temporary upload directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer Disk Storage for temporary upload buffer before Cloudinary streaming
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const basename = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
    cb(null, `${basename}-${Date.now()}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB limit for high-res videos and images
});

const router = express.Router();

// Direct High-Reliability Cloudinary Upload Endpoint
router.post('/', upload.single('file'), async (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).json({ success: false, message: 'No file received' });
  }

  const filePath = file.path;
  const isVideo = file.mimetype.startsWith('video/') || /\.(mp4|webm|mov|mkv|avi)$/i.test(file.originalname);

  try {
    let result;

    if (isVideo || file.size > 20 * 1024 * 1024) {
      // Chunked upload for videos or files over 20MB
      result = await cloudinary.uploader.upload_large(filePath, {
        resource_type: isVideo ? 'video' : 'auto',
        folder: 'tezscale_assets',
        chunk_size: 6000000, // 6MB chunks
        use_filename: true,
        unique_filename: true,
      });
    } else {
      // Standard upload for images
      result = await cloudinary.uploader.upload(filePath, {
        resource_type: 'auto',
        folder: 'tezscale_assets',
        use_filename: true,
        unique_filename: true,
      });
    }

    // Safely remove temporary local file after Cloudinary upload
    try {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    } catch (cleanupErr) {
      console.warn('Temp file cleanup warning:', cleanupErr.message);
    }

    console.log(`☁️ Cloudinary upload success: ${result.secure_url}`);

    return res.status(200).json({
      success: true,
      message: 'File uploaded to Cloudinary successfully',
      url: result.secure_url,
      public_id: result.public_id,
      format: result.format,
      resource_type: result.resource_type,
      bytes: result.bytes,
    });
  } catch (error) {
    console.error('Cloudinary upload failed, falling back to local storage:', error);

    // If Cloudinary hits an issue, keep file in persistent uploads directory as fallback
    const persistentDir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(persistentDir)) {
      fs.mkdirSync(persistentDir, { recursive: true });
    }
    const fallbackPath = path.join(persistentDir, file.filename);
    try {
      if (fs.existsSync(filePath)) {
        fs.renameSync(filePath, fallbackPath);
      }
    } catch (mvErr) {
      console.warn('Fallback move error:', mvErr.message);
    }

    const fallbackUrl = `/uploads/${file.filename}`;
    return res.status(200).json({
      success: true,
      message: 'Uploaded to server (Cloudinary fallback)',
      url: fallbackUrl,
      warning: error.message,
    });
  }
});

export default router;
