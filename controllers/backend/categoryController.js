const Category = require('../../models/category');

const PUBLIC='1';
const DRAFT='0';
const PENDING='2';
/*********** category ************/
exports.getCategory=(req,res,next)=>{

    Category.getCategoryForAdmin()
        .then(categories=>{
            res.render('backend/category/category',{
                categories:categories[0],
                page:null
            });

        })
        .catch(err=>console.log(err));




};
exports.getCategoryEdit=(req,res,next)=>{
    let id = req.params.id;
    Category.getCategoryId(id)
        .then(category=>{
            res.render('backend/category/editCategory',{
                category:category[0][0],
                page:null
            })
        }).catch(err=>console.log(err));


};

exports.postUpdateCategory=(req,res,next)=>{
    let id = req.body.id;
    let title_am = req.body.title_am;
    let title_en = req.body.title_en;
    let title_ru = req.body.title_ru;
    let status=req.body.status ? PUBLIC.toString() : DRAFT.toString();
    Category.updateCategory(id,title_am,title_ru,title_en,status)
        .then((result)=>{
            res.redirect('/admin/category/edit/'+id)
        })
        .catch(err=>console.log(err))


};

exports.postCreateCategory=(req,res,next)=>{
    let title_am = req.body.title_am;
    let title_en = req.body.title_en;
    let title_ru = req.body.title_ru;

    let status=req.body.status ? PUBLIC.toString() : DRAFT.toString();

    Category.createCategory (title_am,title_ru,title_en,status)
        .then(result=>{
            res.redirect('/admin/category')
        })

};


/*********** category ************/
