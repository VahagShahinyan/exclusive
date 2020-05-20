const sharp = require('sharp');
const Image= require('../models/images');
const datePath=require('../function/datePath');
const createDir=require('../function/createDir');
exports.sharp=(req,res,next)=> {
    if(req.files && req.files.files){
        (async ()=>{
            var uploadImages = [];
            var uploadThumbnailImages=[];
            for (const item of req.files.files) {
                let imageDir = 'public/upload/'+ datePath + '/' + item.filename;
                let getImageAlt = item.originalname.replace(/\.jpeg|\.png|\.jpg|\.tif|\.gif|\.webp/gmi, '');
                let img=  await  Image.uploadImage(datePath + '/' + item.filename,getImageAlt);
                uploadImages.push({'src': '/upload/' + datePath + '/' + item.filename,'data_id': img[0].insertId});
                uploadThumbnailImages.push(item.filename);
            }
            const paramFolderArray=[800,750,600,560,389,277,105];
            for (const folder of paramFolderArray) {
                let dir='public/upload/temp/'+folder+'/'+datePath;
                createDir(dir);

            }
            async function thumbnailFunc(imageName,width,height,paramOutUrl) {
                await sharp('public/upload/'+datePath+'/'+imageName).resize(width, height)
                    .toFile('public/upload/temp/'+paramOutUrl+'/'+datePath+'/'+imageName, (err, info) => {
                        console.error(err)
                    });
            }
            for (const thumbnailFileName of uploadThumbnailImages){
                await thumbnailFunc(thumbnailFileName, 800, 787, 800);
                await thumbnailFunc(thumbnailFileName, 750, 853, 750);
                await thumbnailFunc(thumbnailFileName, 600, 476, 600);
                await thumbnailFunc(thumbnailFileName, 560, 407, 560);
                await thumbnailFunc(thumbnailFileName, 389, 272, 389);
                await thumbnailFunc(thumbnailFileName, 277, 200, 277);
                await thumbnailFunc(thumbnailFileName, 105, 108, 105);
            }
            res.json(uploadImages).status(200);
        })();
    }

};

