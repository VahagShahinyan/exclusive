








function saveImages(tabSelected) {

    if (tabSelected == 'upload') {
        var sendImages = [];
        document.querySelectorAll('#modal_image_upload .dropzoneEditorImages img')
            .forEach(function (item) {
                sendImages.push(dataURLtoFile(item.getAttribute('src'), item.getAttribute('alt')))
            });
        var form_data = new FormData();
        sendImages.forEach(function (image) {
            form_data.append('files', image);
        });
        setTimeout(function () {
            $.ajax({
                url: "/admin/saveImages",
                cache: false,
                contentType: false,
                processData: false,
                data: form_data,
                type: 'post',
                success: function (res) {
                    var dataObject = res;
                    var i = 0;
                    document.querySelectorAll('#modal_image_upload .dropzoneEditorImages img').forEach(function (item) {
                        item.removeAttribute('src');
                        if (i < dataObject.length) {
                            item.setAttribute('src', dataObject[i].src);
                            item.setAttribute('data_id', dataObject[i].data_id);
                            i++;

                        }
                    });
                    if (geteditorButtonClick) {
                        document.querySelectorAll('#modal_image_upload .dropzoneEditorImages img').forEach(function (item) {
                            //$(currentEditorElement).summernote('editor.saveRange');
                            currentEditorElement.summernote('editor.focus');
                            currentEditorElement.summernote('editor.restoreRange');
                            // $(currentEditorElement).context.invoke('editor.insertNode', item)
                            // $(currentEditorElement).context.invoke('editor.insertNode', item);
                            currentEditorElement.summernote('insertNode', item);
                        });
                        geteditorButtonClick = false;
                    }
                    else if (uploadGallery) {
                        document.querySelectorAll('#modal_image_upload .dropzoneEditorImages img').forEach(function (item) {
                            $('div.dropzoneGallery').append(`<div class="col-md-3 col-lg-2 DropzonImageBlock" >
                                             <img   src="${item.getAttribute('src')}" alt="${item.getAttribute('alt')}" data_id="${item.getAttribute('data_id')}">
                                             <div>
                                                  <button   type="button" class=" dropzonRemuveBtn btn  btn-outline-danger"><i class="la la-trash"></i></button>
                                             </div>
                                         </div> `)
                        });
                        dropzoneRemuveButton()
                        uploadGallery = false;

                    }
                    else if (featuredImage) {
                        document.querySelectorAll('#modal_image_upload .dropzoneEditorImages img').forEach(function (item) {
                            $('div.featuredImage').append(`<div class="col-md-12 col-lg-12 DropzonImageBlock" >
                                             <img  class="img-fluid " src="${item.getAttribute('src')}" alt="${item.getAttribute('alt')}" data_id="${item.getAttribute('data_id')}" >
                                             <div>
                                                  <button   type="button" class=" dropzonRemuveBtn btn  btn-outline-danger"><i class="la la-trash"></i></button>
                                             </div>
                                         </div> `)
                        });
                        document.querySelector('div.featuredImage').addEventListener('click', function (e) {
                            if (e.target.classList.contains("dropzonRemuveBtn") || e.target.parentElement.classList.contains("dropzonRemuveBtn")) {
                                e.target.closest('.DropzonImageBlock').remove()
                                // element.closest(selectors);
                            }
                        });


                    }
                    $('#modal_image_upload .dropzoneEditorImages ').empty();
                    $('#modal_image_upload').modal('hide');
                }
            });
        }, 5)
    }
    else if (tabSelected = 'gallery') {

        var selectedGalleryImages = document.querySelectorAll('.galleryBlock.addImage img')

        if (geteditorButtonClick) {
            if (selectedGalleryImages.length > 0) {
                selectedGalleryImages.forEach(function (item) {
                    currentEditorElement.summernote('editor.focus');
                    currentEditorElement.summernote('editor.restoreRange');
                    item.setAttribute('src', item.getAttribute('src').replace('/temp/105', ''))
                    currentEditorElement.summernote('insertNode', item);
                });
                geteditorButtonClick = false;
            }

        }
        else if (uploadGallery) {
                document.querySelectorAll('#modal_image_upload .dropzoneEditorImages img');

                if (selectedGalleryImages.length > 0) {


                    selectedGalleryImages.forEach(function (item) {
                        item.setAttribute('src', item.getAttribute('src').replace('/temp/105', ''))
                        $('div.dropzoneGallery').append(`<div class="col-md-3 col-lg-2 DropzonImageBlock" >
                                                 <img   src="${item.getAttribute('src')}" alt="${item.getAttribute('alt')}" >
                                                 <div>
                                                      <button   type="button" class=" dropzonRemuveBtn btn  btn-outline-danger"><i class="la la-trash"></i></button>
                                                 </div>
                                             </div> `)
                    });
                }

                dropzoneRemuveButton()
                uploadGallery = false;

            }
        else if (featuredImage) {
                document.querySelectorAll('#modal_image_upload .dropzoneEditorImages img').forEach(function (item) {
                    $('div.featuredImage').append(`<div class="col-md-12 col-lg-12 DropzonImageBlock" >
                                                 <img  class="img-fluid " src="${item.getAttribute('src')}" alt="${item.getAttribute('alt')}" data_id="${item.getAttribute('data_id')}" >
                                                 <div>
                                                      <button   type="button" class=" dropzonRemuveBtn btn  btn-outline-danger"><i class="la la-trash"></i></button>
                                                 </div>
                                             </div> `)
                });
                document.querySelector('div.featuredImage').addEventListener('click', function (e) {
                    if (e.target.classList.contains("dropzonRemuveBtn") || e.target.parentElement.classList.contains("dropzonRemuveBtn")) {
                        e.target.closest('.DropzonImageBlock').remove()
                        // element.closest(selectors);
                    }
                });


            }
        $('#modal_image_upload .dropzoneEditorImages ').empty();
        $('#modal_image_upload').modal('hide');


    }

}


function initDropzone(files_count = 2) {
    DropzoneEditor = new Dropzone("div#dropzoneEditor", {
        url: "/file/post",
        maxFiles: files_count,
        autoQueue: false,
        resizeWidth: 600,
        resizeHeight: 600,
        resizeMethod: 'contain',
        resizeQuality: 1.0,
        filesCountNow: 0,
        dictMaxFilesExceeded: "Mekic avel chi kareli",
        addRemoveLinks: true,
        autoProcessQueue: false,
        acceptedFiles: ".jpg,.jpeg,.gif,.png",
        addedfile: function (file) {
            if (DropzoneEditor.options.maxFiles == 1) {
                document.querySelector('.dropzoneEditorImages').innerHTML = '';
            }
            var filename = file.name.slice(0, (file.name.lastIndexOf(".") - 2 >>> 0) + 2)
            let reader = new FileReader();
            reader.onload = function (event) {
                $(".dropzoneEditorImages").append(
                    `<div class="col-md-3 col-lg-2 DropzonImageBlock" >
                             <img  class="img-fluid " style=" height: 130px;
    width: 195px;
    object-fit: contain;" class="img-fluid objDropzoneUpload " src="${event.target.result}" alt="${filename}" >
                                <input type="text" value="${filename}">
                            <div>
                                 <button   type="button" class=" dropzonRemuveBtn btn  btn-outline-danger"><i class="la la-trash"></i></button>
                                 <button   type="button"  class="editImg btn  btn-outline-danger dropzonRemuveBtn"  ><i class="la la-edit"></i></button>
                            </div>
                    </div>`
                );
                document.querySelector('.dropzoneEditorImages').addEventListener('change', function (e) {
                    if (e.target.nodeName == 'INPUT') {
                        e.target.parentElement.querySelector('img').setAttribute('alt', e.target.value)
                    }
                })
            };
            reader.readAsDataURL(file)
        }

    });
}
document.querySelector('#modal_image_upload').addEventListener('click', function (e) {
    if (e.target.classList.contains("editImg") || e.target.parentElement.classList.contains("editImg")) {
        var getImage = e.target.closest(".DropzonImageBlock").querySelector('img');
        getImage.setAttribute('class', 'editNow');
        var getEditImgSrc = getImage.getAttribute('src');
        var modal = document.querySelector('#modal_image_editor .modal-body');
        modal.innerHTML = '';
        modal.appendChild(strToDom(`
            <div class="row">
                <div class="col-12">
                    <img src="${getEditImgSrc}"  class="img-cropper-a">
                </div>
            </div>
        `));
        $('#modal_image_upload').modal('hide');
        $('#modal_image_editor').modal('show');
    }
    else if (e.target.classList.contains("dropzonRemuveBtn") || e.target.parentElement.classList.contains("dropzonRemuveBtn")) {
        e.target.closest('.DropzonImageBlock').remove()
        // element.closest(selectors);
    }
    else if (e.target.parentElement.classList.contains("galleryBlock")) {
        console.log('click');
        var clickPositionModal=document.querySelector('#modal_image_upload').getAttribute('clickPosition');
        var divGallery = e.target.parentElement;
        if (clickPositionModal=='featuredImage'){

            if (divGallery.classList.contains('addImage')) {
                console.log('11');
                divGallery.classList.remove('addImage');
                divGallery.classList.remove("selectedGalleryImg");
                divGallery.classList.add("unSelectedGalleryImg");

            } else {
                console.log('22');
                if (document.querySelectorAll('.galleryBlock.addImage').length>0){
                    document.querySelectorAll('.galleryBlock.addImage').forEach(function (item) {
                        console.log('remove');
                        item.classList.remove('addImage')
                        item.classList.remove("selectedGalleryImg");
                        item.classList.add("unSelectedGalleryImg");
                    })
                }


                divGallery.classList.remove("unSelectedGalleryImg");
                divGallery.classList.add("selectedGalleryImg");
                divGallery.classList.add("addImage");
            }
        }
        else {

            if (divGallery.classList.contains('addImage')) {
                divGallery.classList.remove('addImage');
                divGallery.classList.remove("selectedGalleryImg");
                divGallery.classList.add("unSelectedGalleryImg");

            } else {
                divGallery.classList.remove("unSelectedGalleryImg");
                divGallery.classList.add("selectedGalleryImg");
                divGallery.classList.add("addImage");
            }
        }



    }
    else if (e.target.classList.contains("gallery") || e.target.parentElement.classList.contains("gallery")) {
        tabSelected='gallery';
        $('.imageSearch').css("display", "block");
        $('.galleryContainer').empty();
        AjaxGetImages(pagination, false, imageSearchAlt);
        document.querySelector('#kt_tabs_1_2').addEventListener('scroll', function (e) {
            if (request_pending) {
                return;
            }
            if (this.scrollHeight - this.scrollTop - this.clientHeight <= 500) {
                request_pending = true;
                pagination++;

                AjaxGetImages(pagination, false, imageSearchAlt);
            }

        })


    }
    else if (e.target.classList.contains("upload") || e.target.parentElement.classList.contains("upload")) {
        tabSelected='upload';

        $('.imageSearch').css("display", "none");



    }
    else if (e.target.classList.contains('saveImages')) {

    }//

});
/*
document.querySelector('button.uploadGallery').addEventListener('click', function (e) {
    $('#modal_image_upload').modal({backdrop: 'static', keyboard: false});
    $('#modal_image_upload').attr('clickPosition','uploadGallery');

    if (e.target.classList.contains("uploadGallery") || e.target.parentElement.classList.contains("uploadGallery")) {
        if (DropzoneEditor)
            DropzoneEditor.destroy();
        initDropzone();
        uploadGallery = true;
    }
    document.querySelector('#modal_image_upload a.gallery').addEventListener('click', function (e) {
        if (e.target.classList.contains("gallery") || e.target.parentElement.classList.contains("gallery")) {

            console.log("yeess");
        }

    })
});
document.querySelector('button.setFeaturedImage').addEventListener('click', function (e) {
    $('#modal_image_upload').modal({backdrop: 'static', keyboard: false});
    $('#modal_image_upload').attr('clickPosition','featuredImage');
    if (DropzoneEditor)
        DropzoneEditor.destroy();
    initDropzone(1);
    featuredImage = true;
});
*/
//--------------
// function modal_widget(config) {
//     let thisWidget = this;
//     console.log(thisWidget);
//     thisWidget.config = {};
//     Object.assign(thisWidget.config, config);
//     console.log(thisWidget.config.selector);
//     // console.log('thisWidget.config.selector',thisWidget.config.selector,thisWidget);
//     document.querySelector(thisWidget.config.selector).addEventListener('click', function () {
//         $(thisWidget.config.modalSelector).modal({backdrop: 'static', keyboard: false});
//
//     });
//     $(`${thisWidget.config.modalSelector}`).on('hide.bs.modal', function () {
//         // $('#modal_image_upload').modal('show');
//         console.log('modal close');
//         // $('#modal_image_upload').modal({backdrop: 'static', keyboard: false});mod
//
//         $(`${thisWidget.config.modalSelector} .dropzoneEditorImages`).empty();
//         $(`${thisWidget.config.modalSelector} .galleryContainer`).empty();
//     });
/*
    document.querySelector(thisWidget.config.modalSelector).addEventListener('click', function (e) {
        if (e.target.classList.contains("editImg") || e.target.parentElement.classList.contains("editImg")) {
            var getImage = e.target.closest(".DropzonImageBlock").querySelector('img');
            getImage.setAttribute('class', 'editNow');
            var getEditImgSrc = getImage.getAttribute('src');
            var modal = document.querySelector('#modal_image_editor .modal-body');
            modal.innerHTML = '';
            modal.appendChild(strToDom(`
            <div class="row">
                <div class="col-12">
                    <img src="${getEditImgSrc}"  class="img-cropper-a">
                </div>
            </div>
        `));
            $('#modal_image_upload').modal('hide');
            $('#modal_image_editor').modal('show');
        } else if (e.target.classList.contains("dropzonRemuveBtn") || e.target.parentElement.classList.contains("dropzonRemuveBtn")) {
            e.target.closest('.DropzonImageBlock').remove()
            // element.closest(selectors);
        } else if (e.target.parentElement.classList.contains("galleryBlock")) {
            console.log('galleryBlock', thisWidget.config.selector);
            var divGallery = e.target.parentElement;
            console.log('multiple', thisWidget.config.selector);
            if (thisWidget.config.selector == '.setFeaturedImage') {
                if (divGallery.classList.contains('addImage')) {
                    divGallery.classList.remove('addImage');
                    divGallery.classList.remove("selectedGalleryImg");
                    divGallery.classList.add("unSelectedGalleryImg");

                } else {
                    divGallery.classList.remove("unSelectedGalleryImg");
                    divGallery.classList.add("selectedGalleryImg");
                    divGallery.classList.add("addImage");
                }
            } else {
                if (divGallery.classList.contains('addImage')) {
                    console.log('11');
                    divGallery.classList.remove('addImage');
                    divGallery.classList.remove("selectedGalleryImg");
                    divGallery.classList.add("unSelectedGalleryImg");

                } else {
                    if (document.querySelectorAll('.galleryBlock.addImage').length > 0) {
                        document.querySelectorAll('.galleryBlock.addImage').forEach(function (item) {
                            console.log('remove');
                            item.classList.remove('addImage')
                            item.classList.remove("selectedGalleryImg");
                            item.classList.add("unSelectedGalleryImg");
                        })
                    }


                    divGallery.classList.remove("unSelectedGalleryImg");
                    divGallery.classList.add("selectedGalleryImg");
                    divGallery.classList.add("addImage");
                }
            }


            // var clickPositionModal=document.querySelector('#modal_image_upload').getAttribute('clickPosition');
            // console.log('clickPositionModal',clickPositionModal);
            // if (clickPositionModal=='featuredImage'){
            //
            //
            // }
            // else {
            //
            //
            // }


        } else if (e.target.classList.contains("gallery") || e.target.parentElement.classList.contains("gallery")) {
            tabSelected = 'gallery';
            $('.imageSearch').css("display", "block");
            $('.galleryContainer').empty();
            AjaxGetImages(pagination, false, imageSearchAlt);
            document.querySelector('#kt_tabs_1_2').addEventListener('scroll', function (e) {
                if (request_pending) {
                    return;
                }
                if (this.scrollHeight - this.scrollTop - this.clientHeight <= 500) {
                    request_pending = true;
                    pagination++;

                    AjaxGetImages(pagination, false, imageSearchAlt);
                }

            })


        } else if (e.target.classList.contains("upload") || e.target.parentElement.classList.contains("upload")) {
            tabSelected = 'upload';

            $('.imageSearch').css("display", "none");


        } else if (e.target.classList.contains('saveImages')) {

        }
    });

// }
// document.querySelector( '#modal_image_upload button.closeModal').addEventListener('click',function (e) {
//     // e.preventDefault();
//     // e.stopPropagation();
//     console.log('close event');
//     $('#modal_image_upload .dropzoneEditorImages ').empty();
//     $('#modal_image_upload .galleryContainer').empty();
// })

*/
// <img  class="img-fluid " src="${image.src}" alt="${image.alt}" data_id="${item.getAttribute('data_id')}" >
