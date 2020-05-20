// getCategoryId
const path = require('path');
const db = require('../config/database');

module.exports = class Category {
    static getCategoryId(id) {
        return db.execute(`SELECT id,title_am,title_ru,title_en,status FROM categories WHERE categories.id = ?`, [id]);
    }

    static getAllCategory(lang){
        return  db.execute(`SELECT id,title_${lang} as title FROM categories WHERE categories.status = ?`, ['1']);
    }

    static getNavigationMenu() {
        return  db.execute(`SELECT id,title_am,title_ru,title_en  FROM categories WHERE categories.status = ?`, ['1']);

    }

    static getCategoryForAdmin(){
        return  db.execute(`SELECT id,title_am,title_ru,title_en,status,date FROM categories `);
    }

    static getPostCategories(postId){
        return db.execute(`SELECT category_id FROM posts_categories WHERE post_id = ? `, [postId]);
    }
    static updateCategory(id,title_am,title_ru,title_en,status){
        return db.execute(`UPDATE categories SET  title_am=?,title_ru=?,title_en=?,status=? WHERE id=?`,[title_am,title_ru,title_en,status,id]);

    }
    static createCategory(title_am,title_ru,title_en,status){
        return db.execute(`INSERT INTO categories (title_am,title_ru,title_en,status) VALUES (?,?,?,?)`,[title_am,title_ru,title_en,status]);

    }


};
