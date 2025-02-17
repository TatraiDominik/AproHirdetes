import multer from "multer";
import path from "path";
import fs from "fs";  


const uploadsDir = path.resolve(__dirname, '../uploads'); 
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);  
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));  
    }
});



const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|gif/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);
        
        if (extname && mimetype) {
            return cb(null, true);
        } else {
            cb(new Error("Csak képfájlokat fogadunk el!"));
        }
    },
    limits: {
        fileSize: 10 * 1024 * 1024,  
    }
});

export default upload;
