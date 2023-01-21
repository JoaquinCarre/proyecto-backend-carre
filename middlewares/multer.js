import multer from "multer";
import path from 'path';
import { __dirname } from "../app.js";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname,`/public/avatars`))
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const upload = multer({ storage: storage }).single('inputUploadFile');

export default upload;