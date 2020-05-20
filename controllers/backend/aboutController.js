const About=require('../../models/about');




exports.getAbout=(req,res,next)=> {



    res.render('backend/page/about', {
            post:null,
            postId:null,
            categories:null,
            loadPost:null,
            page:'about',
            about:null
        });
};

exports.getEdit=(req,res,next)=> {

    const id= req.params.id;
    About.getEditPage(id).then(([result])=>{
        res.render('backend/page/about', {
            about:result[0],
            page:'about'


        });
    })

};

exports.postCreateAbout=(req,res,next)=> {
    const title_am = req.body.title_am;
    const content_am = req.body.content_am;
    const title_ru = req.body.title_ru;
    const content_ru = req.body.content_ru;
    const title_en = req.body.title_en;
    const content_en = req.body.content_en;


    new About(title_am,content_am,title_ru,content_ru,title_en,content_en).save().then(([result])=>{
        const id=result.insertId;
        console.log('--',id);

        return res.redirect(`/admin/page/about/${id}`);

    })



};



exports.postUpdateAbout=(req,res,next)=> {
    const title_am = req.body.title_am;
    const content_am = req.body.content_am;
    const title_ru = req.body.title_ru;
    const content_ru = req.body.content_ru;
    const title_en = req.body.title_en;
    const content_en = req.body.content_en;
    const id = +req.body.id;
    About.updatePost(id,title_am,content_am,title_ru,content_ru,title_en,content_en).then(([result])=>{
        return res.redirect(`/admin/page/about/${id}`)

    })

}
