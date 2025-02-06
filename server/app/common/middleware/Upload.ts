import multer from "multer";
import path from "path";

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, "/server/app/common/uploads/images/"); // Store images in "uploads/images"
    } else if (
      file.mimetype === "application/zip" ||
      file.mimetype === "application/x-zip-compressed"
    ) {
      cb(null, "/server/app/common/uploads/files/"); // Store ZIPs in "uploads/files"
      // console.log(req);
    } else {
      cb(new Error("Invalid file type"), ""); // Invalid file type
    }
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Rename file
  },
});

// File filter to allow only images and ZIP files
const fileFilter = (req: any, file: Express.Multer.File, cb: any) => {
  if (
    file.mimetype.startsWith("image/") ||
    file.mimetype === "application/zip" ||
    file.mimetype === "application/x-zip-compressed"
  ) {
    cb(null, true); // Allow the file
  } else {
    console.log(file);
    cb(new Error("Only images and ZIP files are allowed!"), false); // Reject the file
  }
};

// Set up Multer to accept multiple files
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit per file
  fileFilter,
});

export default upload;
