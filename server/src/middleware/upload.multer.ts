import multer, { FileFilterCallback } from "multer";
import path from "path";
import fs from "fs";
import { Request } from "express";

// Ensure the uploads directory exists
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer storage configuration (for local file storage before Cloudinary upload)
const storage = multer.diskStorage({
  destination: (_req: Request, _file: Express.Multer.File, cb) => {
    cb(null, uploadDir); // Directory to save files temporarily
  },
  filename: (_req: Request, file: Express.Multer.File, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique file name
  },
});

// File filter to validate allowed types
const fileFilter = (
  _req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
): void => {
  const allowedMimeTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true); // File is valid
  } else {
    cb(new Error("Invalid file type. Only JPEG and PNG are allowed.")); // Invalid file
  }
};

// Initialize multer with storage and file filter
const upload = multer({ storage, fileFilter });

// Export multer middleware
export default upload;
