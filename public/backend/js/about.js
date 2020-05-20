var sum1=new SummerNote('#sum1');
var sum2 =new SummerNote('#sum2');
var sum3= new SummerNote('#sum3');

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
