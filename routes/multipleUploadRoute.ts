import express from 'express';
import multer from 'multer';
import { uploadFiles } from '../controller/multipleUploadController';

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (_req, _file, callback) {
    callback(null, 'uploads/');
  },
  filename: function (_req, file, callback) {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage });

router.post('/multipleupload', upload.array('jsonFile', 2), uploadFiles);

export default router;
