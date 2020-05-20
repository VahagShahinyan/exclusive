const db = require('../config/database');

module.exports = class User {
    constructor(name_am,lastName_am,name_ru,lastName_ru,name_en,lastName_en, email, password,status,image,nickname_am,nickname_ru,nickname_en,facebook,twitter,instagram,linkedin,user_role,staff) {
       
        this.name_am = name_am;
        this.lastName_am = lastName_am;
        this.name_ru= name_ru;
        this.lastName_ru = lastName_ru;
        this.name_en = name_en;
        this.lastName_en = lastName_en;
        this.email = email;
        this.password = password;
        this.status=status;
        this.image=image;
        this.nickname_am=nickname_am;
        this.nickname_ru=nickname_ru;
        this.nickname_en=nickname_en;
        this.facebook=facebook;
        this.twitter=twitter;
        this.instagram=instagram;
        this.linkedin=linkedin;
        this.user_role=user_role;
        this.staff=staff;
    }
    save() {
        return db.execute(
            'INSERT INTO users (name_am,lastName_am,name_ru,lastName_ru,name_en,lastName_en,email,password,status,image,nickname_am,nickname_ru,nickname_en,facebook,twitter,instagram,linkedin,user_role,staff) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
            [
                this.name_am,
                this.lastName_am,
                this.name_ru,
                this.lastName_ru,
                this.name_en,
                this.lastName_en,
                this.email,
                this.password,
                this.status,
                this.image,
                this.nickname_am,
                this.nickname_ru,
                this.nickname_en,
                this.facebook,
                this.twitter,
                this.instagram,
                this.linkedin,
                this.user_role,
                this.staff


            ]
        );
    }

    static getUserId(id) {
        return db.execute(`SELECT id,name_am,lastName_am,name_ru,lastName_ru,name_en,lastName_en,email,status, image,nickname_am,nickname_ru,nickname_en,facebook,twitter,instagram,linkedin,user_role,staff FROM users WHERE users.id = ?`, [id]);
    }
    static   findUserByEmail(email) {
        return db.execute(`SELECT id,name_am,lastName_am,name_ru,lastName_ru,name_en,lastName_en,email,password,status,user_role FROM users WHERE users.email = ?`, [email]);
    }
    static fetchAll() {
        return db.execute('SELECT id,name_am,lastName_am,name_ru,lastName_ru,name_en,lastName_en,status,user_role FROM users');
    }
    static deleteById(id) {
        return db.execute(`DELETE FROM users WHERE users.id = ?`, [id]);

     }

    static deactivateUser(id){
        return db.execute(`UPDATE users set user.status=1 where user.id = ? `,[id]);

    }


    static updateUser(id,name_am='',lastName_am='',name_ru='',lastName_ru='',name_en='',lastName_en='',email='',password='',status='',image='',nickname_am='',nickname_ru='',nickname_en='',facebook='',twitter='',instagram='',linkedin='',user_role='',staff='')
    {
        if (password) {
            return db.execute(` UPDATE  users SET  name_am=?,lastName_am=?,name_ru=?,lastName_ru=?,name_en=?,lastName_en=?,email=?,password=?,status=?,image=?,nickname_am=?,nickname_ru=?,nickname_en=?,facebook=?,twitter=?,instagram=?,linkedin=?, user_role=?,staff=? WHERE users.id=? `,
                [name_am,lastName_am,name_ru,lastName_ru,name_en,lastName_en,email,password,status,image,nickname_am,nickname_ru,nickname_en,facebook,twitter,instagram,linkedin,user_role,staff,id]);
        }
        else {
            user_role=+user_role;
            // console.log('----j--',staff,typeof staff);
            // console.log('----jj--',user_role, typeof user_role);

            return db.execute(` UPDATE  users SET  name_am=?,lastName_am=?,name_ru=?,lastName_ru=?,name_en=?,lastName_en=?,email=?,status=?,image=?,nickname_am=?,nickname_ru=?,nickname_en=?,facebook=?,twitter=?,instagram=?,linkedin=?,user_role=?,staff=? WHERE users.id=? `,
                [name_am,lastName_am,name_ru,lastName_ru,name_en,lastName_en,email,status,image,nickname_am,nickname_ru,nickname_en,facebook,twitter,instagram,linkedin, +user_role,staff ,id]);
        }


    }


    static userBlock(email) {
        return db.execute(`delete from sessions where JSON_EXTRACT(data, '$.user.email') =?`,[email]);


    }


    static getUsersAndRole(){
        return db.execute(`SELECT users.id, users.name_am, lastName_am, email, status, image, nickname_am,nickname_ru,nickname_en, facebook, twitter, instagram, linkedin, user_role, staff,user_role.name as user_role FROM users
                left join user_role on users.user_role = user_role.id`)
    }

    static getRoles(){
      return   db.execute(`SELECT * from user_role`);
    }
    // static getStaff(){
    //     return db.execute(`select id from users where users.staff='1' limit 100`);
    //
    //
    // }

    static getStaff(lang) {
        return db.execute(`select id, name_${lang} as name, lastName_${lang} as lastName, email, image, facebook, twitter, instagram, linkedin,  nickname_${lang} as nickname  from users where staff='1'`)
    }

};



// status
// role -> admin, editor, moderator .... 
