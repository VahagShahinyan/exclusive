const User = require('../models/user');
const Post = require('../models/post');
const Category = require('../models/category');
const ITEMS_PER_PAGE = 12;
const moment = require('moment');
const config = require('../config/config');
const nodemailer = require('nodemailer');
const redis = require('redis');
const client = redis.createClient();
const fs = require('fs');
const path = require('path');
const exchange = require('../api/cba.am/exchangerate');
const menu = require('./../navigation/menu');
const urlTranslate = require('./../function/urlTranslate');
const myBanner = require('../json/banner');
const About = require('../models/about');
const requestIp = require('request-ip');
var geoip = require('geoip-lite');
const weather = require('../api/w/api');


const bannerJson = require('../json/banner');
exchange[0].date = formatDate(exchange[0].date);
client.on('connect', function () {
    console.log('redis is connected ');
});

function getLocation(req) {
    var clientIp = requestIp.getClientIp(req);
    var geo = geoip.lookup(clientIp);
    return  geo ? geo.timezone.split('/')[1].toLowerCase() :'yerevan';
}


exports.getHome = (req, res, next) => {
    const lang = langF(req.params.lang);
    const urlObj = urlTranslate(req.url);
    const news = 8;
    const political = 5;
    const interview = 6;
    const sport = 6;
    const events = 8;
    const fashion = 8;
    const beauty = 8;
    const lifestyle = 6;
    // client.del('home'+lang);

    var location=getLocation(req);
    weather.getRenederedHTML(location,lang).then(renderedHTML=>{

        client.get('home'+lang , function (err, data) {
            if (err || data === null) {


                Post.homePostsView(lang, news, political, interview, sport, events, fashion, beauty, lifestyle)
                    .then(([result]) => {
                        res.render('frontend/index', {
                                result: result,
                                lang: lang,
                                domain: config.domain,
                                exchange: exchange,
                                menu: menu,
                                urlObj: urlObj,
                                myBanner:myBanner,
                                bannerJson:bannerJson,
                                eghanak:renderedHTML
                            },
                            function (err, html) {
                                if (err) {
                                    throw new Error("ERROR Page not found !")

                                }
                                client.set('home'+lang, html, 'EX', 100);
                                res.send(html);
                            });

                    })
                    .catch(err => {
                        res.render('frontend/404', {
                            menu: menu,
                            lang: lang,
                            exchange: exchange,
                            urlObj: urlObj,
                            myBanner:null,
                            eghanak:renderedHTML


                        })

                    })

            }
            else {
                res.send(data);
            }
        })


    })

};
exports.getCategory = (req, res, next) => {
    const urlObj = urlTranslate(req.url);
    let catId = req.params.catId;
    var lang = req.params.lang || 'am';
    let page = req.query.page || 1;
    let pagination = {};
    var location=getLocation(req);

    (async () => {
        try {
            let posts = await Post.getCatViewByID(lang, catId, page, ITEMS_PER_PAGE);
            posts = posts[0];
            if (!posts.length > 0) {
                throw new Error("ERROR Page not found !")
            }

            let postCount = await Post.postCount(catId);
            postCount = postCount[0][0].count;
            pagination.currentPage = +page;
            pagination.hasNextPage = +page * ITEMS_PER_PAGE < postCount;
            pagination.hasPreviousePage = +page > 1;
            pagination.nextPage = +page + 1;
            pagination.previousePage = +page - 1;
            pagination.lastPage = Math.ceil(postCount / ITEMS_PER_PAGE);
            var renderedHTML= await weather.getRenederedHTML(location,lang);
            res.render('frontend/category', {
                'posts': posts,
                'pagination': pagination,
                lang: lang,
                exchange: exchange,
                menu: menu,
                urlObj: urlObj,
                eghanak:renderedHTML

            });
        } catch (e) {
            res.render('frontend/404', {
                menu:menu,
                lang:lang,
                exchange:exchange,
                urlObj:urlObj,
                eghanak:renderedHTML

            })
        }
    })();

};
exports.getPost = (req, res, next) => {
    const urlObj = urlTranslate(req.url);
    var lang = req.params.lang || 'am';
    var postId = req.params.postId;
    var location=getLocation(req);

    (async () => {
        try {
            let post = await Post.getPostViewID(postId, lang);
            post = post[0][0];
            let postsCategory = await Post.selectPostsByCatId(post, lang);
            postsCategory = postsCategory[0];
            var renderedHTML= await weather.getRenederedHTML(location,lang);


            res.render('frontend/post', {
                post: post,
                menu: menu,
                'isAuth': req.session.isLoggedIn,
                lang: lang,
                exchange: exchange,
                postsCategory: postsCategory,
                urlObj: urlObj,
                bannerJson:bannerJson,
                eghanak:renderedHTML


            });
        } catch (e) {
            res.render('frontend/404', {
                menu: menu,
                lang: lang,
                exchange: exchange,
                urlObj: urlObj,
                eghanak:renderedHTML

            })
        }
    })();


};
exports.getContact = (req, res, next) => {
    const urlObj = urlTranslate(req.url);

    const lang = req.params.lang || 'am';

    var location=getLocation(req);
weather.getRenederedHTML(location,lang).then(renderedHTML=>{

    Category.getAllCategory(lang)
        .then(categories => {

            res.render('frontend/contact', {
                categories: categories[0],
                lang: lang,
                exchange: exchange,
                menu: menu,
                urlObj:urlObj,
                eghanak:renderedHTML
            });
        });
})




};
exports.getAbout=(req,res,next)=> {
    const urlObj = urlTranslate(req.url);

    const lang = req.params.lang || 'am';
    var location=getLocation(req);
    weather.getRenederedHTML(location,lang).then(renderedHTML=>{
        About.getAboutPage(1,lang)
            .then(([result])=>{

                res.render('frontend/about', {
                        about:result[0],
                        lang: lang,
                        exchange: exchange,
                        menu: menu,
                        urlObj:urlObj,
                        'isAuth': req.session.isLoggedIn,
                    eghanak:renderedHTML

                    }
                );
            })

    })


};
exports.sendMail = async (req, res, next) => {
    let transporter = nodemailer.createTransport({
        host: 'smtp.yandex.ru',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'info@exclusive.am', // generated ethereal user
            pass: 'b1LftcvJFsheV9f986yI' // generated ethereal password
        }
    });

    let html = `<p>Name:   ${req.body.name}</p>
    <p>Email:  ${req.body.email}</p><p>Message:${req.body.message}</p>`;
    let info = await transporter.sendMail({
        from: '"Exclusive.am 👻"info@exclusive.am', // sender address
        to: 'info@exclusive.am', // list of receivers
        subject: 'Hello ✔', // Subject line
        text: 'Hello world????', // plain text body
        html: `<h1>Form message1</h1>` + html.toString() // html body
    });
    await transporter.sendMail({
        from: '"Exclusive.am 👻"info@exclusive.am', // sender address
        to: req.body.email, // list of receivers
        subject: 'Hello ✔', // Subject line
        text: 'Hello world????', // plain text body
        html: `<h1>Form succsess</h1>` + html.toString() // html body
    });

    // console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));


    let name = req.body.name;
    let email = req.body.email;
    let message = req.body.message;

};
exports.postAllCategory = (req, res, next) => {
    const lang = req.params.lang || 'am';
    Category.getAllCategory(lang)
        .then(categories => {
            res.status(200).json(categories[0])
        })
        .catch(err => console.log(err));
};
exports.getSearch=(req,res,next)=> {
    let page = req.query.page || 1;

    const urlObj = urlTranslate(req.url);
    const lang = req.params.lang || 'am';


    let search = req.query.s;


    const  ITEMS_PER_PAGE=10;

    var location=getLocation(req);


    (async ()=>{
        let postsCategory = await Post.selectLastNews(lang);
        postsCategory = postsCategory[0];

        let postsSearch= await Post.search(search,page,ITEMS_PER_PAGE);
        postsSearch=postsSearch[0];
        search=search.toLowerCase();


        postsSearch.forEach(function (item) {
            if (item.title_am.toLowerCase().indexOf(search) !=-1){
                item.lang='am'
            }
            else if (item.title_ru.toLowerCase().indexOf(search) !=-1){
                item.lang='ru'
            }
            else if(item.title_en.toLowerCase().indexOf(search) !=-1){
                item.lang='en'
            }

        });

        var renderedHTML= await weather.getRenederedHTML(location,"hy");

        res.render('frontend/search', {
            lang: lang,
            exchange: exchange,
            menu: menu,
            urlObj:urlObj,
            search:postsSearch,
            searchText:search,
            postsCategory: postsCategory,
            bannerJson:bannerJson,
            eghanak:renderedHTML



        });



    })();




//
// Post.search(search,page,ITEMS_PER_PAGE).then(([result])=>{
//     console.log('result',result);
//     search=search.toLowerCase();
// result.forEach(function (item) {
//         if (item.title_am.toLowerCase().indexOf(search) !=-1){
//             item.lang='am'
//         }
//    else if (item.title_ru.toLowerCase().indexOf(search) !=-1){
//        item.lang='ru'
//         }
//     else if(item.title_en.toLowerCase().indexOf(search) !=-1){
//         item.lang='en'
//         }
//
// });
//
//
//     res.render('frontend/search', {
//         lang: lang,
//         exchange: exchange,
//         menu: menu,
//         urlObj:urlObj,
//         search:result,
//         searchText:search,
//         postsCategory: postsCategory,
//         bannerJson:bannerJson
//
//
//     });
// });




};
exports.getStaff=(req,res,next)=> {
    const urlObj = urlTranslate(req.url);
    const lang = req.params.lang || 'am';
    var location=getLocation(req);
    weather.getRenederedHTML(location,lang).then(renderedHTML=>{
        User.getStaff(lang).then(([result])=>{
            res.render('frontend/staff', {
                lang: lang,
                exchange: exchange,
                menu: menu,
                urlObj:urlObj,
                staff:result,
                eghanak:renderedHTML
            });
        })

    })


};


exports.getSearchApi=(req,res,next)=> {
    let page = req.query.page || 1;
    const lang = req.params.lang || 'am';

    let search = req.query.s;

    const  ITEMS_PER_PAGE=10;



    Post.search(search,page,ITEMS_PER_PAGE).then(([result])=>{

        search=search.toLowerCase();

        result.forEach(function (item) {
            if (item.title_am.toLowerCase().indexOf(search) !=-1){
                item.lang='am'
            }
            else if (item.title_ru.toLowerCase().indexOf(search) !=-1){
                item.lang='ru'
            }
            else if(item.title_en.toLowerCase().indexOf(search) !=-1){
                item.lang='en'
            }

        });

        res.json(result)



    });


};

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear(),
        hours = d.getHours() ,
        minute = d.getMinutes();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    if (minute < 10) minute = '0' + minute;
    if (hours < 10) hours = '0' + hours;

    return hours + ':' + minute + ' ' + [day, month, year].join('-');
}
function langF(lang) {
    if (lang == 'am' || lang == 'ru' || lang == 'en') {
        return lang;
    } else return 'am'
}
function requestUrl(url) {


}
