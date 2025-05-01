import multer from "multer";






// Multer setup for uploading files to S3
// Configure Multer for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage });


export default upload;


