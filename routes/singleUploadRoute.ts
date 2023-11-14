

// // import { Router } from 'express';
// // import { uploadFile } from '../controller/uploadController';

// // const router = Router();

// // router.post('/upload', uploadFile);

// // export default router;





// import { Router } from 'express';
// import multer from 'multer';
// import { uploadFile } from '../controller/uploadController';

// const router = Router();

// // Configure multer with the destination folder
// // const storage = multer.diskStorage({
// //   destination: function (_req, _file, callback) {
// //     callback(null, 'uploads/'); // Specify the destination folder
// //   },
// //   filename: function (_req, file, callback) {
// //     callback(null, file.originalname); // Use the original file name
// //   },
// // });

// const upload = multer(); // Use the configured storage for multer

// router.post('/upload', upload.single('jsonFile'), uploadFile);

// export default router;



import { Router } from 'express';
import multer from 'multer';
import { uploadFile } from '../controller/singleUploadController';

const router = Router();

// Configure multer with the destination folder
const storage = multer.diskStorage({
  destination: function (_req, _file, callback) {
    callback(null, 'uploads/'); 
  },
  filename: function (_req, file, callback) {
    callback(null, file.originalname); 
  },
});

const upload = multer({ storage }); 

router.post('/singleupload', upload.single('jsonFile'), uploadFile);

export default router;
