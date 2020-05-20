
/********************** SummerNote ***************************/
var sum1=new SummerNote('#sum1');
var sum2 =new SummerNote('#sum2');
var sum3= new SummerNote('#sum3');
/********************** SummerNote ***************************/

/********************** Modal ***************************/

new Modal({
    selector: '.uploadGallery',
    multiple: true,
    insert:function(images){
        images.forEach(function (image) {
            console.log('data_id',image);
            $('div.dropzoneGallery')
                .append(` <div class="col-md-3 col-lg-2 DropzonImageBlock" >
                                                 <img   src="${Modal.srcReplace(image.src)}" alt="${image.alt}" data_id="${image.data_id}" >
                                                 <div><button   type="button" class=" dropzonRemuveBtn btn  btn-outline-danger"><i class="la la-trash"></i></button> </div>
                                             </div> `)
        });
    },
    modalSelector: '#modal_image_upload',
});
new Modal({
    selector: '.setFeaturedImage',
    multiple: false,
    insert:function(images){
        let image={};
        console.log("images0",images[0]);
        image.src=Modal.srcReplace(images[0].src);
        image.alt=images[0].alt | null;
        image.data_id=images[0].data_id;

        $('div.featuredImage')
            .empty()
            .append(`<div class="col-md-12 col-lg-12 DropzonImageBlock" >
               <img  class="img-fluid " src="${image.src}" alt="${image.alt}" data_id="${image.data_id}" >
               <div>
                    <button   type="button" class=" dropzonRemuveBtn btn  btn-outline-danger"><i class="la la-trash"></i></button>
               </div>
           </div> `)

    },
    modalSelector: '#modal_image_upload',
});
new Modal({
    selector: '#sum1 .editorImage',
    multiple: true,
    insert:function(images){
        images.forEach(function (image) {
            let rng = sum1.config.createRange
            rng.pasteHTML(`  <img width="600"  src="${Modal.srcReplace(image.src)}" alt="${image.alt}" >`);
        });
    },
    modalSelector: '#modal_image_upload',
});
new Modal({
    selector: '#sum2 .editorImage',
    multiple: true,
    insert:function(images){
        images.forEach(function (image) {
            let rng = sum2.config.createRange
            rng.pasteHTML(`  <img width="600"  src="${Modal.srcReplace(image.src)}" alt="${image.alt}" >`);

        });

    },
    modalSelector: '#modal_image_upload',
});
new Modal({
    selector: '#sum3 .editorImage',
    multiple: true,
    insert:function(images){

        images.forEach(function (image) {
            let rng = sum3.config.createRange
            rng.pasteHTML(`  <img width="600"  src="${Modal.srcReplace(image.src)}" alt="${image.alt}" >`);

        });
    },
    modalSelector: '#modal_image_upload',
});
/********************** Modal ***************************/


/*************** Save Post ******************/
function selectFormField(tagName, inputName) {
    if (tagName == 'select') {
        return Array.from(document.querySelectorAll(tagName + '[name="' + inputName + '"] option')).filter(x => x.selected == true).map(x => x.value);

    }
    if (tagName == 'input' && (inputName == 'status' || inputName == 'author')) {

        return document.querySelector(tagName + '[name="' + inputName + '"]').checked;
    }
    if (tagName == 'textarea' && (inputName == 'content_am' || inputName == 'content_en' || inputName == 'content_ru')) {
        if (inputName == 'content_am') {
            return document.querySelector('#sum1 .note-editable').innerHTML;
        }
        if (inputName == 'content_ru') {
            return document.querySelector('#sum2 .note-editable').innerHTML;
        }


        if (inputName == 'content_en') {
            return document.querySelector('#sum3 .note-editable').innerHTML;

        }

    }
    return document.querySelector(tagName + '[name="' + inputName + '"]').value;

}
document.querySelector('#savePost').addEventListener('click', function (e) {
    e.preventDefault();
    let featuredImage = {
        'src': document.querySelector('.featuredImage img').getAttribute('src'),
        'data_id': document.querySelector('.featuredImage img').getAttribute('data_id')
    };
    let title_am = selectFormField('input', 'title_am');
    let excerpt_am = selectFormField('textarea', 'excerpt_am');
    let content_am = selectFormField('textarea', 'content_am');
    let title_ru = selectFormField('input', 'title_ru');
    let excerpt_ru = selectFormField('textarea', 'excerpt_ru');
    let content_ru = selectFormField('textarea', 'content_ru');
    let title_en = selectFormField('input', 'title_en');
    let excerpt_en = selectFormField('textarea', 'excerpt_en');
    let content_en = selectFormField('textarea', 'content_en');
    let categories = selectFormField('select', 'categories');
    let date = selectFormField('input', 'date')
    let status = selectFormField('input', 'status');
    let author = selectFormField('input', 'author');
    let imageGallery = [];
    document.querySelectorAll('.dropzoneGallery img').forEach(function (image) {
        imageGallery.push({'src': image.src, 'alt': image.alt, 'data_id': image.getAttribute('data_id')})
    });
    if (document.querySelector('input[name="date"]').value){
        date=date.split(' ')[1].split('-').reverse().join('-')+" "+date.split(' ')[0];
        date=new Date(date).getTime();
    }




    var sendingData = {
        title_am,
        excerpt_am,
        content_am,
        title_ru,
        excerpt_ru,
        content_ru,
        title_en,
        excerpt_en,
        content_en,
        categories,
        date,
        status,
        author,
        imageGallery,
        featuredImage
    };
    if (document.querySelector('.postId')) {
        sendingData.id = document.querySelector('.postId').value;
    }
    var data = JSON.stringify(sendingData);

    /** create post */
    if (e.target.classList.contains("createPost")) {
        let config={};
        config.url='/admin/post/create';
        config.data=data;
        config.type='POST';
        ajaxPost(config);
    }
    /** update post*/
    else if (e.target.classList.contains("updatePost")) {
        let config={};
        config.url='/admin/post/update';
        config.data=data;
        config.type='PUT';
        ajaxPost(config);


    }
});
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
function ajaxPost(config) {
    $.ajax({
        url: config.url,
        data: config.data,
        type: config.type,
        dataType: 'json',
        cache: false,
        processData: false,
        contentType: 'application/json; charset=utf-8',
        success: function (res) {
            console.log('ajax res',res);
            window.location.href = '/admin/post/' + res.id + '/edit';
        }
    })
}
/*************** Save Post ******************/









