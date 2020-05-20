const db = require('../config/database');
module.exports = class Image {


    constructor() {


    }


    static getPostGalleryIDS(postId) {
        // return db.execute(`SELECT image_id FROM posts_images WHERE post_id= ?`, [postId]);
        // return db.execute(` SELECT id,image_alt,image_path FROM images WHERE images.id  IN (select image_id from posts_images where posts_images.post_id=?)`, [postId]);
        return db.execute(`SELECT image_id,image_alt,image_path FROM posts_gallery_view WHERE posts_gallery_view.post_id=?`, [postId]);

        //posts_gallery_view


    }

    static   updateGallery(postId, galleryIds) {

        let param = '';
        galleryIds.forEach(function (image) {
            param += '(' + postId + ',' + image.data_id + '),';
        });
        param=param.slice(0,-1);
       const images= async ()=>{
            await db.execute(`DELETE FROM posts_images WHERE posts_images.post_id = ? `, [postId]);
            console.log('images');
          return   await db.execute(`INSERT INTO posts_images (post_id,image_id) VALUES ${param}`);
        };
      return  images()



    }


    static getImages(page = 1,imageCount,imageSearch=null) {
        let offsetPost = (page - 1) * imageCount;
        console.log('----imageCount',imageCount);
        console.log('----imageSearch',imageSearch);
        console.log('----page',page);

        if (imageSearch) {
            console.log('ok1');
            return db.execute(`SELECT * FROM images where image_alt like '%${imageSearch}%' order by id desc  limit ? offset ?`, [ imageCount, offsetPost]);

        }else {
            console.log('ok2');
            return db.execute(`SELECT * FROM images order by id desc  limit ? offset ?`, [ imageCount, offsetPost]);

        }


    }


    static uploadImage(imagePath,imageAlt) {
      return   db.execute(`INSERT INTO exclusive.images (image_path,image_alt)  VALUES (?, ?)`, [imagePath, imageAlt])

    }


    static insetGalleryImages(val) {
        return db.execute(` INSERT INTO posts_images (post_id,image_id) VALUES ${val}`);

    }






}
