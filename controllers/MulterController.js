const multer = require('multer');
const datePath=require('../function/datePath');
const createDir=require('../function/createDir');
const maxFileUploadCount=50;
const uploadDir= ()=>{
    let dir = 'public/upload/'+datePath+'';
    createDir(dir);
    return dir;
};
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir());
    },
    filename: (req, file, cb) => {
        let extension = file.mimetype.split('/')[1];
        let setFileName= new Date().getTime()+"_"+ Math.round( 1000*Math.random())+'.'+extension;
        cb(null, setFileName);
    }
});
const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'||
        file.mimetype === 'image/gif'
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};
const upload=multer({ storage: fileStorage, fileFilter: fileFilter ,onError : function(err, next) { console.log('error', err); next(err); }}).fields([{name:'files',maxCount:maxFileUploadCount}]);
module.exports=upload;






