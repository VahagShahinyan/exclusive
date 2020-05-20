const { validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
const User=require('../../models/user');
// const fs=require('fs');
// const path=require('path');
// const passport=require('passport');
const ACTIVE="1";
const DISABLED="0";



exports.getRegister=(req,res,next)=>{
    User.getRoles()
        .then(([roles])=>{
            res.render('backend/user/register',{
                roles:roles,
                page:null
            })
        })
}


exports.getUsers=(req,res,next)=>{
    User.getUsersAndRole()
        .then(result=>{
            res.render('backend/user/users',{
                'users':result[0],
                page:null
            })
        })
}
exports.getAllUsers=(req,res,next)=>{
    User.fetchAll()
        .then(result=>{
            res.send(result[0])
        })
}
exports.getEditUser=(req,res,next)=>{
    const userId=req.params.userId;
    User.getUserId(userId)
        .then(result=>{
            User.getRoles()
                .then(([roles])=>{
                    res.render('backend/user/editUser.ejs',{
                        roles:roles,
                        user:result[0][0],
                        page:'user'
                    })
                })

        })
}

exports.updateUser=(req,res,next)=>{
    const id =           req.body.id;
    const name_am =         req.body.name_am;
    const lastName_am =     req.body.lastName_am;
    const name_ru =         req.body.name_ru;
    const lastName_ru =     req.body.lastName_ru;
    const name_en =         req.body.name_en;
    const lastName_en =     req.body.lastName_en;

    const email =        req.body.email;
    let password =       req.body.password;
    const status=        req.body.status ? ACTIVE:DISABLED;
    const image=         req.body.image;
    const nickname_am=   req.body.nickname_am;
    const nickname_ru=   req.body.nickname_ru;
    const nickname_en=   req.body.nickname_en;
    const facebook=      req.body.facebook;
    const twitter=       req.body.twitter;
    const instagram=     req.body.instagram;
    const linkedin=      req.body.linkedin;
    const user_role=     req.body.user_role;
    const staff=         req.body.staff ? ACTIVE:DISABLED;

    // if (status==DISABLED){
    //     User.userBlock(email).then(result=>{
    //         console.log("ok1");
    //         updateUser()
    //
    //     })
    // }else {
    updateUser()
    //
    // }





    function updateUser() {

        // console.log(id,name_am,lastName_am,name_ru,lastName_ru,name_en,lastName_en,email,password,status,image,nickname_am,nickname_ru,nickname_en,facebook,twitter,instagram,linkedin,user_role,staff);

        if (password){
            // console.log("ok");
            bcrypt.hash(password,12)
                .then(hashedPass=>{
                    return hashedPass;
                })
                .then(password=>{
                    // console.log("----",user_role,staff);
                    return User.updateUser(id,name_am,lastName_am,name_ru,lastName_ru,name_en,lastName_en,email,password,status,image,nickname_am,nickname_ru,nickname_en,facebook,twitter,instagram,linkedin,user_role,staff)
                })
                .then(result=>{
                    res.redirect('/admin/users/edit/'+id)
                })

        }else {
            // console.log("ok2");
            // console.log('ok4');
            User.updateUser(id,name_am,lastName_am,name_ru,lastName_ru,name_en,lastName_en,email,password,status,image,nickname_am,nickname_ru,nickname_en,facebook,twitter,instagram,linkedin,user_role,staff)
                .then(result=>{
                    res.redirect('/admin/users/edit/'+id)

                })

        }
    }







}
