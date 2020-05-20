const path = require('path');
const db = require('../config/database');
module.exports = class Post {
    constructor(title_am = null, excerpt_am = null, content_am = null, title_ru = null, excerpt_ru = null, content_ru = null, title_en = null, excerpt_en = null, content_en = null, featuredImage, category, author, status, user, date) {
        this.title_am = title_am;
        this.excerpt_am = excerpt_am;
        this.content_am = content_am;
        this.title_ru = title_ru;
        this.excerpt_ru = excerpt_ru;
        this.content_ru = content_ru;
        this.title_en = title_en;
        this.excerpt_en = excerpt_en;
        this.content_en = content_en;
        this.image = featuredImage;
        this.category = category;
        this.author = author;
        this.status = status;
        this.user = user;
        this.date = date;
    }


    save() {
        return db.execute(
                ` INSERT INTO posts (
                                 title_am,
                                 excerpt_am,
                                 content_am,
                                 title_ru,
                                 excerpt_ru,
                                 content_ru,
                                 title_en,
                                 excerpt_en,
                                 content_en,
                                 image_id,
                                 cat_id,
                                 author,
                                 status,
                                 user,
                                 date)
        VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`, [
                this.title_am,
                this.excerpt_am,
                this.content_am,
                this.title_ru,
                this.excerpt_ru,
                this.content_ru,
                this.title_en,
                this.excerpt_en,
                this.content_en,
                this.image,
                this.category,
                this.author,
                this.status,
                this.user,
                this.date


            ]);
    }

    static getPostId(id) {
        // return db.execute(`SELECT * FROM posts WHERE posts.id = ?`, [id]);
        return db.execute(`SELECT * FROM posts WHERE posts.id = ?`, [id]);


    }

    static getPostViewID(id, lang = 'am') {

        // return db.execute(`SELECT * FROM main_view WHERE main_view.id = ?`, [id]);
        return db.execute(`SELECT 
        id,
        title_${lang} as   title,
        excerpt_${lang} as excerpt,
        content_${lang} as content,
        featured_image,
        date,
        gallery,
        cat_title_${lang} as cat_title,
        cat_id,
        user_nicname_${lang} as nicname,
        author
        FROM main_view WHERE main_view.id = ? and status='1'  and title_${lang} !=''`, [id]);

    }

    static getCatViewByID(lang = 'am', catId, page = 1, ITEMS_PER_PAGE = 2) {

        let offsetPost = (page - 1) * ITEMS_PER_PAGE;
        return db.execute(
            `SELECT
            cat_id,
            cat_title_${lang} as cat_title ,
            excerpt_${lang} as excerpt,
            title_${lang} as title,            
            id,
            featured_image, 
            user,
            user_name_${lang},
            user_lastName_${lang},
            user_image_url,
            
            author,
            status,
            date
            FROM main_view WHERE main_view.cat_id = ? and main_view.status='1'  and title_${lang} !='' ORDER BY id DESC  limit ? offset ?`, [catId, ITEMS_PER_PAGE, offsetPost]);

    }

    static search(data,page = 1, ITEMS_PER_PAGE = 10) {
        let offsetPost = (page - 1) * ITEMS_PER_PAGE;

        return db.execute(`select id, title_am, title_en,title_ru, status, date, featured_image  from  main_view  
        where   title_am like '%${data}%' or title_ru like '%${data}%' or title_en like '%${data}%' order by id desc  limit ? offset ?`,[ITEMS_PER_PAGE,offsetPost]);
    }


    static editPostViewId(id) {
        return db.execute(`SELECT * FROM main_view WHERE main_view.id = ?`, [id]);
    }

    static getPosts(page = 0, count = 5, search = '', filter = {}) {
        console.log("---====---", filter);
        let pagination;
        if (page > 0) {
            pagination = (page - 1) * count;
        } else {
            pagination = page
        }
        var searcharr = [];
        if (search != '') {
            var s = search.split(' ').filter(x => x != '');
            if (s.length)
                searcharr.push(" ( `title_en` LIKE '%" + s.join("%' OR `title_en` LIKE '%") + "%'  OR `title_am` LIKE '%" + s.join("%' OR `title_am` LIKE '%") + "%'  OR `title_ru` LIKE '%" + s.join("%' OR `title_ru` LIKE '%") + "%') ");

        }
        if (filter.status) searcharr.push("( `status`='" + filter.status.join("' OR `status`='") + "' )");
        if (filter.user) searcharr.push("( `user`=" + filter.user.join(" OR `user`=") + " )");
        if (filter.category) searcharr.push("( `cat_id`=" + filter.category.join(" OR `cat_id`=") + " )");
        if (filter.date_min) searcharr.push(' `date` >= ' + filter.date_min);
        if (filter.date_max) searcharr.push(' `date` <= ' + filter.date_max);
        let sort_type = filter.sort_type == 'asc' ? ' ASC ' : ' DESC ';
        var where = '';
        if (searcharr.length) {
            where = ' WHERE ' + searcharr.join(' AND ');
        }
        // console.log(`SELECT * FROM main_view ${where}`);

        console.log({
            count: `SELECT COUNT(id) as count from  main_view  ${where}`,
            data: `SELECT * FROM main_view ${where} order by main_view.id ${sort_type} limit ?,? `
        })
        return {
            count: db.execute(`SELECT COUNT(id) as count from  main_view  ${where}`),
            data: db.execute(`SELECT * FROM main_view ${where} order by main_view.id ${sort_type} limit ?,? `, [pagination, count])
        }
    }

    static getPostCount() {
        return db.execute(`SELECT COUNT(id) as count from  main_view `)
    }


    static updatePost(id, title_am = null, excerpt_am = null, content_am = null, title_ru = null, excerpt_ru = null, content_ru = null, title_en = null, excerpt_en = null, content_en = null, image_id, cat_id, author, status, date) {

        return db.execute(` UPDATE  posts SET  title_am=?,excerpt_am=?,content_am=?, title_ru=?,excerpt_ru=?,content_ru=?,title_en=?,excerpt_en=?,content_en=?,image_id=?,cat_id=?,author=?,status=?,date=?
        WHERE posts.id=? `, [title_am, excerpt_am, content_am, title_ru, excerpt_ru, content_ru, title_en, excerpt_en, content_en, image_id, cat_id, author, status, date.toString(), id]);

    }

    static deletePost(postId) {

        return db.execute(`delete from posts_images where posts_images.post_id =?`, [postId]).then(result => {
            db.execute(`delete  from posts where posts.id= ? `, [postId]);
        }).catch(err => console.log(err))


    }


    static postCount(catId) {
        return db.execute(`SELECT count(*) as count from posts WHERE  posts.status='1' and posts.cat_id=?`, [catId]);

    }

//todo pm2 error in method favicon 
    static homePostsView(lang, news = 5, political = 5, interview = 5, sport = 5, events = 5, fashion = 5, beauty = 5, lifestyle = 5) {
        return db.execute(`     
        
        (SELECT id,title_${lang} as title,excerpt_${lang} as excerpt,featured_image,date,cat_title_${lang} as cat_title,cat_id from main_view where  cat_id='1' and status='1' and title_${lang} !='' order by  id desc  limit ?) union
        (SELECT id,title_${lang} as title,excerpt_${lang} as excerpt,featured_image,date,cat_title_${lang} as cat_title,cat_id from main_view where  cat_id='2' and status='1' and title_${lang} !='' order by  id desc  limit ?) union
        (SELECT id,title_${lang} as title,excerpt_${lang} as excerpt,featured_image,date,cat_title_${lang} as cat_title,cat_id from main_view where  cat_id='3' and status='1' and title_${lang} !='' order by  id desc  limit ?) union
        (SELECT id,title_${lang} as title,excerpt_${lang} as excerpt,featured_image,date,cat_title_${lang} as cat_title,cat_id from main_view where  cat_id='4' and status='1' and title_${lang} !='' order by  id desc  limit ?) union
        (SELECT id,title_${lang} as title,excerpt_${lang} as excerpt,featured_image,date,cat_title_${lang} as cat_title,cat_id from main_view where  cat_id='5' and status='1' and title_${lang} !='' order by  id desc  limit ?) union
        (SELECT id,title_${lang} as title,excerpt_${lang} as excerpt,featured_image,date,cat_title_${lang} as cat_title,cat_id from main_view where  cat_id='6' and status='1' and title_${lang} !='' order by  id desc  limit ?) union
        (SELECT id,title_${lang} as title,excerpt_${lang} as excerpt,featured_image,date,cat_title_${lang} as cat_title,cat_id from main_view where  cat_id='7' and status='1' and title_${lang} !='' order by  id desc  limit ?) union
        (SELECT id,title_${lang} as title,excerpt_${lang} as excerpt,featured_image,date,cat_title_${lang} as cat_title,cat_id from main_view where  cat_id='8' and status='1' and title_${lang} !='' order by  id desc  limit ?)
    
        `, [news, political, interview, sport, events, fashion, beauty, lifestyle], function (err, rows, fields) {
            if (err) {
                console.log(err);

            }

        });


    }


    static selectPostsByCatId(post, lang, limit = null) {
        return db.execute(`SELECT id,
                                  title_${lang} as title,
                                  featured_image, 
                                  user, 
                                  author,
                                  status, 
                                  date, 
                                  gallery, 
                                  cat_title_${lang},
                                  cat_id, 
                                  user_name_${lang}, 
                                  user_lastName_${lang},
                                  user_image_url 
                                     FROM main_view where cat_id=? and title_${lang} !='' and id !=? order by id desc limit 10`, [post.cat_id, post.id])


    }



    static selectLastNews( lang) {
        return db.execute(`SELECT id,
                                  title_${lang} as title,
                                  featured_image, 
                                  user, 
                                  author,
                                  status, 
                                  date, 
                                  gallery, 
                                  cat_title_${lang},
                                  cat_id
                                  user_image_url 
                                     FROM main_view where title_${lang} !=''  order by id desc limit 10`)


    }
};

