const { validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
const User=require('../../models/user');
// const fs=require('fs');
// const path=require('path');
// const passport=require('passport');
const ACTIVE="1";
const DISABLED="0";

exports.signup=(req,res,next)=>{
    const name = req.body.name;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
    const status =req.body.status? ACTIVE:DISABLED;
    const nickname =req.body.nickname;
    const facebook =req.body.facebook;
    const twitter =req.body.twitter;
    const instagram =req.body.instagram;
    const linkedin =req.body.linkedin;
    const image =req.body.image;
    const user_role= req.body.user_role;
    const staff=  req.body.staff ? ACTIVE:DISABLE;

    bcrypt.hash(password,12)
        .then(hashedPw=>{
            const user= new User( name,lastName,email,hashedPw,status,image,nickname,facebook,twitter,instagram,linkedin,user_role,staff );
            return user.save()
        })
        .then(result=>{
            return   res.redirect(301,`/admin/users/edit/${result[0].insertId}`)
        })
        .catch(err=>{
            console.log(err);
        })

};

exports.signin = (req, res, next) => {

    const email = req.body.email;
    const password = req.body.password;
    let loadedUser;
    User.findUserByEmail(email)

        .then(user => {
            console.log('user1');
            if (user[0].length==0) {
                const error = new Error('A user with this email could not be found')
                error.statusCode = 401;
                throw error;
            }
            if (user[0][0].status=='0'){
                console.log('user error');

                const error = new Error('A user with this email as blocked')
                error.statusCode = 404;
                throw error;
            }
            loadedUser = user[0][0];

            return bcrypt.compare(password, user[0][0].password);

        })
        .then(isEqual => {
            if (!isEqual) {
                console.log('is queale', isEqual); 
                const error = new Error('Wrong password');
                error.statusCode = 401;
                throw error;

            }

            req.session.isLoggedIn = true;
            req.session.user = loadedUser;
            return req.session.save(err => {
                res.cookie('userId', loadedUser.id.toString(), { maxAge: 36000000, httpOnly: true })
                    .redirect('/admin');
            });

        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
};

exports.postLogout = (req, res, next) => {

    return req.session.destroy(err => {
        return  res.redirect('/');
    });


};



exports.getLogin=(req,res,next)=>{
    // let getLogin = fs.readFileSync(path.join(__dirname, '..', 'views/backend/login', 'login.html'), { encoding: 'utf-8' });
    // res.end(getLogin)
    if (req.session.isLoggedIn) {
        return res.redirect('/admin')

    }
    res.render('backend/login/login')
}
