const Banner = require('../../models/banner');
const fs= require('fs');
var path = require('path');




exports.getBanner=(req,res,next)=> {
    const id =req.params.id;
    Banner.getBanner(id).then(([result])=>{
        res.render('backend/banner/banner', {
            post:null,
            postId:null,
            categories:null,
            loadPost:null,
            page:'banner',
            banner:result[0]
        });
    });



};
exports.createBanner=(req,res,next)=> {

};

exports.postUpdateBannerImg=(req,res,next)=> {
    const id=req.body.id;
    const link=req.body.bannerLink;
    const img_src=req.body.bannerImg ;

    (async ()=>{
        await     Banner.updateBannerImg(id,img_src,link)

        const getAllBanner= await Banner.getAllBanner();
        updateJsonBanner(getAllBanner[0]);


        res.redirect(`/admin/page/banner/${id}`)


    })();



};
exports.postUpdateBannerHtml=(req,res,next)=> {
    const id=req.body.id;
    const html=req.body.bannerHtml;

    (async ()=>{
       await Banner.updateBannerHtml(id,html);
       const getAllBanner= await Banner.getAllBanner();
        updateJsonBanner(getAllBanner[0]);

        res.redirect(`/admin/page/banner/${id}`)
    })()



};
exports.postUpdateBanner=(req,res,next)=> {


    console.log('req body--',req.body);
    const id=req.id;
    const bannerLink=req.params.bannerLink;
    const bannerImg=req.params.bannerImg;
    const bannerStatus=req.params.bannerStatus;
    const bannerHtml=req.params.bannerHtml;

    if (bannerStatus=='img'){

    }else if(bannerStatus=='html'){

    }



    // console.log('-----------',req.body.banner1);
    // let bannerObj={};
    //
    // bannerObj.banner1=req.body.banner1;
    // bannerObj.banner2=req.body.banner2;
    // bannerObj.banner3=req.body.banner3;
    // bannerObj.banner4=req.body.banner4;
    // bannerObj.banner5=req.body.banner5;
    // bannerObj.banner6=req.body.banner6;
    // (async ()=>{
    //   try {
    //
    //       let result= await  Banner.updatePost(bannerObj);
      //     let getAllBanner= await Banner.getAllBanner();
      //     let myJson={};
      //     getAllBanner[0].forEach(function (banner) {
      //         myJson[banner.id]=banner.content;
      //     });
      //     fs.writeFileSync(  __dirname+'/../../json/banner.json', JSON.stringify(myJson, '\n', 4));
      //
      //           res.redirect('/admin/page/banner');
      //
      // }catch (e) {
      //     console.log(e);
      // }
    //
    //
    //
    // })()

//    res.redirect('/admin/page/banner')






};

function updateJsonBanner(data) {
    let myJson={};
    data.forEach(function (banner) {
        myJson[banner.id]={};
        myJson[banner.id]['html']=banner.html;
        myJson[banner.id]['img_src']=banner.img_src;
        myJson[banner.id]['link']=banner.link;
        myJson[banner.id]['status']=banner.status;

    });
    fs.writeFileSync(  __dirname+'/../../json/banner.json', JSON.stringify(myJson, '\n', 4));


}

exports.deleteBanner=(req,res,next)=> {

};

exports.getAllBanner=(req,res,next)=> {
   Banner.getAllBanner().then(([result])=>{
       res.render('backend/banner/allBanner', {
           post:null,
           postId:null,
           categories:null,
           loadPost:null,
           page:'banner',
           allBanner:result
       });

   })



};
