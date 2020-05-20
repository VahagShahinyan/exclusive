

new Modal({
    selector: '.setFeaturedImage',
    multiple: false,
    insert:function(images){
        let image={};
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
           </div> `);

        document.querySelector('input[name="bannerImg"]').setAttribute('value',image.src);

    },
    modalSelector: '#modal_image_upload',
});


document.querySelector('.emptyImgBanner').addEventListener('click',function (e) {
    e.preventDefault();
    $('div.featuredImage').empty();
    document.querySelector('input[name="bannerImg"]').value='';
    document.querySelector('input[name="bannerLink"]').value='';


});
