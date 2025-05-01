import multer from "multer";






// Multer setup for uploading files to S3
// Configure Multer for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage });


export default upload;
// Endpoint to handle image upload
// app.post(
//   "/api/upload",
//   upload.single("image"),
//   (req: Request, res: Response) => {
//     if (!req.file) {
//       return res
//         .status(400)
//         .json({ success: false, message: "No file uploaded." });
//     }

//     const imageUrl = req.file.location;

//     return res.json({
//       success: true,
//       message: "Image uploaded successfully!",
//       imageUrl: imageUrl, // URL of the uploaded image in S3
//     });
//   }
// );


