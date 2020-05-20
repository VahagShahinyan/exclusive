const db = require('../config/database');
module.exports = class About{
    constructor(title_am = null,  content_am = null, title_ru = null,  content_ru = null, title_en = null,  content_en = null) {
        this.title_am = title_am;
        this.content_am = content_am;
        this.title_ru = title_ru;
        this.content_ru = content_ru;
        this.title_en = title_en;
        this.content_en = content_en;

    }
    save() {
        return db.execute(
            ` INSERT INTO page (
                                 title_am,
                                 content_am,
                                 title_ru,
                                 content_ru,
                                 title_en,
                                 content_en
                              )
        VALUES (?,?,?,?,?,?)`, [
                this.title_am,
                this.content_am,
                this.title_ru,
                this.content_ru,
                this.title_en,
                this.content_en

            ]);
    }

    static updatePost(id,title_am = null,  content_am = null, title_ru = null,  content_ru = null, title_en = null,  content_en = null) {

        return db.execute(` UPDATE  page SET  title_am=?,content_am=?, title_ru=?,content_ru=?,title_en=?,content_en=?
        WHERE page.id=? `, [title_am, content_am, title_ru, content_ru, title_en, content_en, id]);

    }
    static getEditPage(id){
        return db.execute(`select * from page where page.id=?`,[id])
    }


    static getAboutPage(id,lang){
        return db.execute(`select id, title_${lang} as title, content_${lang} as content  from page where page.id=?`,[id])

    }


};


