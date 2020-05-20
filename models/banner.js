const db = require('../config/database');

module.exports = class Banner{
    constructor(content ) {
        this.content = content;

    }
    save() {
        return db.execute(
            `INSERT INTO banner (html ) VALUES (?)`, [ this.content]);
    }

    static updatePost(banner = null) {
     return  (async ()=>{
          await  db.execute(`UPDATE  banner SET  html=? WHERE banner.id=1`, [banner.banner1]);
          await  db.execute(`UPDATE  banner SET  html=? WHERE banner.id=2`, [banner.banner2]) ;
          await  db.execute(`UPDATE  banner SET  html=? WHERE banner.id=3`, [banner.banner3]) ;
          await  db.execute(`UPDATE banner SET  html=? WHERE banner.id=4`, [banner.banner4]);
          await  db.execute(`UPDATE  banner SET  html=? WHERE banner.id=5`, [banner.banner5]) ;
          await  db.execute(`UPDATE  banner SET  html=? WHERE banner.id=6`, [banner.banner6]) ;
            return  true

        })();




    }

    static updateBannerImg(id,img_src,link) {
        return db.execute(`UPDATE  banner SET  img_src=?,link=?,status='img' WHERE banner.id=?`,[img_src,link,id])

    }

    static updateBannerHtml(id,html) {
        return db.execute(`UPDATE  banner SET  html=?,status='html' WHERE banner.id=?`,[html,id])

    }

    static getAllBanner(){
        return db.execute(`select * from banner limit 10`);
    }

    static getBanner(id){
        return db.execute(`select * from banner where id=?`,[id]);
    }




};


