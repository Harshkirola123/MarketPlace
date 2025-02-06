import multer, { StorageEngine } from "multer";
import path from "path";
import fs from "fs";

// Directory where files will be stored
const uploadDirectory = "uploads/projects/";

// Ensure the directory exists, if not, create it
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

// Multer storage configuration
const storage: StorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory);
  },
  filename: (req, file, cb) => {
    const fileExtension = path.extname(file.originalname);
    const fileName = `${Date.now()}-${file.fieldname}${fileExtension}`;
    cb(null, fileName);
  },
});

/**
 * File filter to allow only ZIP files
 *
 * @param {Object} req - The request object.
 * @param {Object} file - The file object.
 * @param {Function} cb - The callback function.
 *
 * @description
 * This middleware function filters the file based on its MIME type.
 * If the MIME type is "application/zip", the file is allowed; otherwise,
 * an error is thrown.
 */
const fileFilter = (req: any, file: any, cb: any) => {
  if (file.mimetype === "application/zip") {
    cb(null, true);
  } else {
    cb(new Error("Only ZIP files are allowed"), false);
  }
};

// Create the upload instance
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 50 * 1024 * 1024 }, // Limit file size to 50 MB
});

/**
 * Middleware to handle file upload.
 *
 * @description
 * This middleware function handles the file upload using Multer.
 * It will check if the file is a ZIP file and has a size less than
 * 50 MB. If the file is invalid, it will return a 400 error response
 * with a message indicating the problem. If the file is valid, it will
 * pass to the next middleware in the stack.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware in the stack.
 */
const handleFileUpload = (req: any, res: any, next: any) => {
  upload.single("sourceCode")(req, res, (err: any) => {
    if (err) {
      if (err instanceof multer.MulterError) {
        // Multer specific errors
        return res.status(400).json({ error: err.message });
      } else {
        // General errors (like invalid file type)
        return res.status(400).json({ error: err.message });
      }
    }
    // If no error, pass to the next middleware
    next();
  });
};

export default handleFileUpload;
