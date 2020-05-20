const Category = require('../../models/category');
const Post = require('../../models/post');
const Image = require('../../models/images');
const db = require('../../config/database');
const schedule = require('node-schedule');
const postStatus=require('../../function/status');
const redis = require('redis');
const client = redis.createClient();

exports.getPostCreate=(req,res,next)=>{
    const lang = req.params.lang || 'am';
    Category.getAllCategory(lang)
        .then(([categories])=>{
            res.render('backend/post/createPost',{
                page:'post',
                postId:null,
                loadPost:false,
                categories:categories,
                post:null
            });
        })
        .catch(err=>console.log(err));
};
exports.getEditPost = (req, res, next) => {
    let postId = req.params.postId;
    const lang = req.params.lang || 'am';
    (async ()=>{
        const post=await  Post.editPostViewId(postId);
        const categories=await  Category.getAllCategory(lang);
        client.del('home'+lang);

        res.render('backend/post/createPost',{
            postId:postId,
            page:'post',
            loadPost:true,
            post:post[0][0],
            categories:categories[0]
        })

    })()



};
exports.postPostCreate = (req, res, next) => {
    const currentDate = new Date();
    currentDate.setHours( currentDate.getHours() + 4 );
    const title_am = req.body.title_am;
    const excerpt_am = req.body.excerpt_am;
    const content_am = req.body.content_am;
    const title_ru = req.body.title_ru;
    const excerpt_ru = req.body.excerpt_ru;
    const content_ru = req.body.content_ru;
    const title_en = req.body.title_en;
    const excerpt_en = req.body.excerpt_en;
    const content_en = req.body.content_en;
    const featuredImage = req.body.featuredImage;
    const user = req.cookies.userId;
    const author = req.body.author ? postStatus.PUBLIC:postStatus.DRAFT;
    var date = req.body.date;
    var status = req.body.status ? postStatus.PUBLIC:postStatus.DRAFT;
    var statusDate=postStatusDate(date,status);
    status=statusDate.status;
    date=statusDate.date;
    const category = req.body.categories[0];
    const imageGallery = req.body.imageGallery;
    console.log('create date',date);
    (async ()=>{
        try {
            const  post = await new Post( title_am,excerpt_am,content_am,title_ru,excerpt_ru,content_ru,title_en,excerpt_en,content_en,featuredImage.data_id,category,author,status,user,date).save();
            const postId = post[0].insertId;
            if (status == postStatus.PENDING){
                // const d= date-new Date().getTimezoneOffset()*60*1000;
                // await createJob(postId,new Date(d));
                await createJob(postId,date);
            }
            if (imageGallery.length > 0) {
                let param = '';
                imageGallery.forEach(function (item) {
                    param += '(' + postId + ',' + item.data_id + ')';
                });
                let val = param.replace(/\)\(/g, "),(");
                await  Image.insetGalleryImages(val);
            }
            homePageCacheClear();

            res.json({'id':postId}).status(200)
        }catch (err) {
            console.error(err);

        }

    })();

};
exports.updatePost=(req,res,next)=>{

    let id = req.body.id;
    let title_am = req.body.title_am;
    let excerpt_am = req.body.excerpt_am;
    let content_am = req.body.content_am;
    let title_ru = req.body.title_ru;
    let excerpt_ru = req.body.excerpt_ru;
    let content_ru = req.body.content_ru;
    let title_en = req.body.title_en;
    let excerpt_en = req.body.excerpt_en;
    let content_en = req.body.content_en;
    let featuredImage = req.body.featuredImage;
    let author = req.body.author ? postStatus.PUBLIC:postStatus.DRAFT;
    let status = req.body.status ? postStatus.PUBLIC:postStatus.DRAFT;
    let categories = req.body.categories[0];
    let date = req.body.date;
    let statusDate=postStatusDate(date,status);
    status=statusDate.status;
    date=statusDate.date;
    let imageGallery = req.body.imageGallery;

    (async ()=>{
        const post=  await  Post.updatePost(id,title_am,excerpt_am,content_am,title_ru,excerpt_ru,content_ru,title_en,excerpt_en,content_en,featuredImage.data_id,categories,author,status, date);
        console.log('post---',post);
        if(imageGallery.length > 0){
            const images=  await  Image.updateGallery(id,imageGallery)
            console.log('images---',images);
        }
        if (status == postStatus.PENDING){
            // var d= date-new Date().getTimezoneOffset()*60*1000;
            // await createJob(id,new Date(d));
            await createJob(id,date);

        }
        homePageCacheClear();


        res.send(req.body)

    })();


};
exports.getAllPost=(req,res,next)=>{
    res.render('backend/post/allPosts',{
        page:null
    });
};
// IMAGE API
exports.postSendingPostData=(req,res,next)=>{

    // console.log('XHR',req.body);
    const page=req.params.page;
    const imageCount=req.body.imageCount;
    let imageSearch=req.body.imageSearch

    Image.getImages(page,imageCount,imageSearch).then(result=>{

        res.send(result[0])
    })
};
exports.deletePost=(req,res,next)=>{
    var postId=req.body.postId;
    // var postStatus
    db.execute(`SELECT status from posts WHERE posts.id=? `, [postId])
        .then(res=>{
                if ( res[0][0].status.toString()=='2'){
                    console.log("remove job ");
                    removeScheduleJob(postId)
                }

            }
        )
        .then(()=>{
            Post.deletePost(postId).then(result=>{
                homePageCacheClear();

                return res.send(postId)
            });

        })


};
exports.sendingPostData=(req,res,next)=>{
    let page=req.body.page;
    let count=req.body.count;
    let q=3;
    let r={};
    let filter={};
    if(req.body['filter[date_min]']) filter.date_min=req.body['filter[date_min]'];
    if(req.body['filter[date_max]']) filter.date_max=req.body['filter[date_max]'];
    if(req.body['filter[sort_type]']) filter.sort_type=req.body['filter[sort_type]'];
    if(req.body['filter[status][]']) filter.status= Array.isArray(req.body['filter[status][]'])?req.body['filter[status][]']:[req.body['filter[status][]']]
    if(req.body['filter[user][]']) filter.user= Array.isArray(req.body['filter[user][]'])?req.body['filter[user][]']:[req.body['filter[user][]']]
    if(req.body['filter[category][]']) filter.category= Array.isArray(req.body['filter[category][]'])?req.body['filter[category][]']:[req.body['filter[category][]']]

    let search = req.body.search;
    Post.getPostCount().then(result=>{
        r.recordsTotal=result[0][0].count;
        if(--q==0)
            res.status(200).json(r)
    });
    var Postobj = Post.getPosts(page,count,search,filter);

    Postobj.count.then(result=>{
        r.recordsFiltered=result[0][0].count;
        if(--q==0)
            res.status(200).json(r)
    }).catch(err=>console.log(err))
    Postobj.data.then(result=>{
        r.data=result[0];
        if(--q==0)
            res.status(200).json(r)
    }).catch(err=>console.log(err))
};
async function  createJob(postId,date,prefix="post_") {
    console.log('-------------------create job-------');
    if (schedule.scheduledJobs[prefix+postId]){

        console.log("update new job",new Date(date).getTime());
        console.log('---------update date-----', date);
        schedule.scheduledJobs[prefix+postId].cancel();
        await  schedule.scheduleJob(prefix+postId, date, function (f) {
            console.log(f);
            console.log("yes update");
            return  db.execute(` UPDATE  posts SET  status=? WHERE posts.id=? `, [postStatus.PUBLIC, postId]);

        });
    }else {
        console.log("create new job",new Date(date));
        console.log('----------create date-----',date);

        await schedule.scheduleJob(prefix+postId, date, function (f) {
            console.log(postId,f);
            console.log("yes create");
            return db.execute(` UPDATE  posts SET  status=? WHERE posts.id=? `, [postStatus.PUBLIC, postId]);

        });
    }
}
function removeScheduleJob(postId,prefix="post_") {
    if (schedule.scheduledJobs[prefix+postId]) {
        schedule.scheduledJobs[prefix+postId].cancel();

    }


}


function postStatusDate(date,status){
    let newDate0Time = new Date().getTime();
    if (!date){
        return {date:newDate0Time ,status: status}
    }
    else {

        if(date > newDate0Time){
            if (status ==postStatus.PUBLIC){
                status = postStatus.PENDING;
                return { date:date,status: status }
            }
            else if (status == postStatus.DRAFT){
                return {date: date,status:status}
            }
        }else {
            if (status ==postStatus.PUBLIC){

                return { date:date,status: status }
            }
            else if (status ==postStatus.DRAFT){
                return {date: date,status:status}
            }
        }
    }
}
function getDateByOffset(date) {
    date= new Date(date)
    var h = date.getHours()<10 ? '0' + date.getHours() : date.getHours();
    var min = date.getMinutes()<10 ? '0' + date.getMinutes() : date.getMinutes();
    var d = date.getDate()<10 ? '0' + date.getDate() : date.getDate();
    var mon = date.getMonth()+1;
    mon = mon<10 ? '0' + mon : mon;
    var y = date.getFullYear()<10 ?'0'+date.getFullYear() :date.getFullYear();
    return h+':'+min+' '+d+'-'+mon+'-'+y;
}




function homePageCacheClear() {
    client.get('homeam', function(err, reply) {
        if (reply)  client.del('homeam');
    });
    client.get('homeru', function(err, reply) {
        if (reply)  client.del('homeru');
    });
    client.get('homeen', function(err, reply) {
        if (reply)  client.del('homeen');
    });
}
