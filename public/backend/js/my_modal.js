class Modal {
    static config={
        btnSelector:"",
        multiple:false,
        pagination:1,
        imageSearchAlt:''
    };
    static request_pending=false;
    static tabSelected='upload';
    constructor(config) {
        this.openModal(config);

    }
    static click(selector){
        document.querySelector(selector).click()
    }
    static addModalEvent(config){
        document.querySelector(config.modalSelector).addEventListener('click', function (e) {
            let t=e.target;
            if (t.classList.contains("editImg") || t.parentElement.classList.contains("editImg")) {
                var getImage = e.target.closest(".DropzonImageBlock").querySelector('img');
                Modal.openEditModal(getImage)
            }
            if (t.classList.contains("dropzonRemuveBtn") || t.parentElement.classList.contains("dropzonRemuveBtn")) {
                e.target.closest('.DropzonImageBlock').remove()
                // element.closest(selectors);
            }
            if (t.classList.contains("gallery") || t.parentElement.classList.contains("gallery")) {
                Modal.tabSelected = 'gallery';
                $('.imageSearch').css("display", "block");
                $('.galleryContainer').empty();
                Modal.AjaxGetImages(Modal.config.pagination, false, Modal.config.imageSearchAlt);
            }
            if (t.classList.contains("upload") || t.parentElement.classList.contains("upload")) {
                Modal.tabSelected = 'upload';
                $('.imageSearch').css("display", "none");
            }
            if (t.classList.contains('saveImages')) {
                if (Modal.tabSelected=="upload"){
                    var sendImages = [];
                    document.querySelectorAll('#modal_image_upload .dropzoneEditorImages img')
                        .forEach(function (item) {
                            sendImages.push(Modal.dataURLtoFile(item.getAttribute('src'), item.getAttribute('alt')))
                        });

                    console.log('upload save',document.querySelectorAll('#modal_image_upload .dropzoneEditorImages img'));
                    var form_data = new FormData();
                    sendImages.forEach(function (image) {
                        form_data.append('files', image);
                    });
                    Modal.ajaxSaveImages(form_data)
                }
                if (Modal.tabSelected=="gallery"){
                    var selectedGalleryImages=[];
                    document.querySelectorAll('.galleryBlock.addImage img').forEach(function (image) {
                        let obj={};
                        obj.alt=   image.getAttribute('alt');
                        obj.src=  image.getAttribute('src');
                        obj.data_id=  image.getAttribute('data_id');
                        selectedGalleryImages.push(obj)
                    });
                    console.log('galery save',selectedGalleryImages[0]);
                    Modal.config.insert(selectedGalleryImages);

                    // $('#modal_image_upload').modal('hide');
                    Modal.hideModal()

                }

            }
            if (t.parentElement.classList.contains("galleryBlock")) {
                var divGallery = e.target.parentElement;
                if (Modal.config.multiple) {
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
                else {
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
            }
        });
        document.querySelector('#kt_tabs_1_2').addEventListener('scroll', function (e) {
            if (Modal.request_pending) {
                return;
            }
            if (this.scrollHeight - this.scrollTop - this.clientHeight <= 500) {
                Modal.request_pending = true;
                Modal.config.pagination++;

                Modal.AjaxGetImages(Modal.config.pagination, false, Modal.config.imageSearchAlt);
            }
        })
    }
    openModal(config) {
        document.querySelector(config.selector).addEventListener('click', function (e) {
            Modal.config=config;
            Modal.click('.upload');
            if(Modal.btnSelector!==config.selector){
                Modal.config.pagination=1;
                Modal.config.imageSearchAlt='';
                Modal.element.querySelector('.imageSearch input').value='';
                Modal.click('.upload');
                Modal.btnSelector=config.selector
            }
            $(config.modalSelector).modal({backdrop: 'static', keyboard: false});
        });
    }


    static hideModal() {
        $('#modal_image_upload').modal('hide');
        $('#modal_image_upload .dropzoneEditorImages').empty();
        $('#modal_image_upload .galleryContainer').empty();

    }

    static hideModalOnly() {
        $('#modal_image_upload').modal('hide');
    }
    static showModal() {
        console.log('showModal');
        // $('#modal_image_upload').modal('show');
        $('#modal_image_upload').modal({backdrop: 'static', keyboard: false});
    }

    static modalHideEvent() {
        console.log('modalHideEvent');
        $('#modal_image_upload').on('hide.bs.modal', function () {
            $('#modal_image_upload .dropzoneEditorImages').empty();
            $('#modal_image_upload .galleryContainer').empty();

        });

    }

    static hideModalEventInClose() {
        document.querySelector('.closeModal').addEventListener('click',function (e) {
            $('#modal_image_upload .dropzoneEditorImages').empty();
            $('#modal_image_upload .galleryContainer').empty();

        });
        document.querySelector('.modalClose').addEventListener('click',function (e) {
            $('#modal_image_upload .dropzoneEditorImages').empty();
            $('#modal_image_upload .galleryContainer').empty();

        });

    }

    static modalShowEvent() {
        console.log('modalShowEvent');
        $('#modal_image_editor').on('shown.bs.modal', function () {
            Modal.click('.upload');
        })

    }
    static openEditModal(getImage){
        getImage.setAttribute('class', 'editNow');
        var getEditImgSrc = getImage.getAttribute('src');
        var modal = document.querySelector('#modal_image_editor .modal-body');
        modal.innerHTML = '';
        modal.appendChild(Modal.strToDom(` <div class="row"><div class="col-12"><img src="${getEditImgSrc}"  class="img-cropper-a"></div></div>`));
        // // $('#modal_image_upload').modal('hide');
        Modal.hideModalOnly();
        $('#modal_image_editor').modal('show');
        $('#modal_image_editor').on('shown.bs.modal', function () {
            // var img = $(this).find('.modal-body').find('img').get(0);
            var img = document.querySelector('#modal_image_editor .modal-body img');
            var myCropper = new Cropper(img, {
                minWidth: 800,
                viewMode: 1,
                scaleX: 1, scaleY: 1,
                autoCropArea: 1,
                minHeight: 600,
                maxWidth: 800,
                maxHeight: 600
            });
            var buttons = $(this).find('button.cropper');
            var x = 1, y = 1;
            buttons.click(function (e) {
                var operation = $(this).attr('id');
                switch (operation) {
                    case 'RotateLeft':
                        myCropper.rotate(-90);
                        myCropper.zoom(-1)
                        break;
                    case 'RotateRight':
                        myCropper.rotate(90);
                        myCropper.zoom(-1)

                        break;
                    case 'FlipHorizontal':
                        x = x * (-1);
                        myCropper.scaleX(x);
                        myCropper.zoom(-1)

                        break;
                    case 'FlipVertical':
                        y = y * (-1);
                        myCropper.scaleY(y);
                        myCropper.zoom(-1)

                        break;
                    case 'CropperReset':
                        myCropper.reset();
                        break;
                    case 'Crop':
                        console.log('----',img.cropper.getCroppedCanvas());
                        console.log('----',img.cropper);
                        console.log('----',img.cropper.getCroppedCanvas());
                        var b64 = img.cropper.getCroppedCanvas().toDataURL('image/jpeg');
                        myCropper.destroy();
                        img.src = b64;
                        new Cropper(img, {
                            minWidth: 800,
                            viewMode: 1,
                            scaleX: 1, scaleY: 1,
                            autoCropArea: 1,
                            minHeight: 600,
                            maxWidth: 800,
                            maxHeight: 600
                        });
                        // myCropper.crop();
                        break;
                    case 'saveCrop':
                        var getImageSrc = e.target.closest(".modal-content").querySelector('.modal-body img').getAttribute('src');
                        //    var imageBlock= document.querySelector('#modal_image_upload .dropzoneEditorImages img.editNow');
                        var imageBlock = document.querySelector('#modal_image_upload .dropzoneEditorImages img.editNow');
                        imageBlock.setAttribute('src', getImageSrc);
                        // imageBlock.classList.remove('editNow');
                        imageBlock.removeAttribute('class');

                        $('#modal_image_editor').modal('hide');
                        // $('#modal_image_upload').modal('show');

                        Modal.showModal();
                        break;
                }
            })
        });
        $('#modal_image_editor').on('hide.bs.modal', function () {
            // $('#modal_image_upload').modal({backdrop: 'static', keyboard: false});
            Modal.showModal()
        });
    }
    static strToDom(str) {
        var wrapper = document.createElement('div');
        wrapper.innerHTML = str.trim();
        return wrapper.firstChild;

    };

    static initDropzone(files_count = 2) {

        const DropzoneEditor = new Dropzone("div#dropzoneEditor", {
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
                             <img  class="img-fluid " style=" height: 130px; width: 195px;object-fit: contain;" class="img-fluid objDropzoneUpload " src="${event.target.result}" alt="${filename}" >
                                <input type="text" value="${filename}">
                            <div>
                                 <button   type="button" class=" dropzonRemuveBtn btn  btn-outline-danger"><i class="la la-trash"></i></button>
                                 <button   type="button"  class="editImg btn  btn-outline-danger" style="width: 100%;" ><i class="la la-edit"></i></button>
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




    };
    static AjaxGetImages(page = 1, requestStatus, imageSearch = null) {
        $.ajax({
            url: "/admin/getimages/" + page,
            data: JSON.stringify({imageCount: 40, imageSearch: imageSearch}),
            type: 'POST',
            dataType: 'json',
            cache: false,
            processData: false,
            contentType: 'application/json; charset=utf-8',
            success: function (res) {
                var images = '';
                res.forEach(function (item) {

                    let imageParse = $(`<div class="galleryBlock unSelectedGalleryImg">
                                    <img src="/upload/temp/105/${item.image_path}" alt="${item.image_alt}" data_id="${item.id}" width="600" height="400">
                                    <div class="desc">${item.image_alt}</div>
                                </div>`).get(0);
                    document.querySelector('.galleryContainer').append(imageParse)


                });
                Modal.request_pending = requestStatus;
            }
        });

    };
    static dataURLtoFile(dataurl, filename) {
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        var extension = mime.split("/")[1];
        var image = filename + '.' + extension;
        return new File([u8arr], image, {type: mime});
    }
    static imageSearch() {
        document.querySelector('.imageSearch input').addEventListener('keyup', function (e) {
            Modal.config.imageSearchAlt = e.target.value;
            Modal.config.pagination = 1;
            if (Modal.request_pending) {
                return;
            }
            Modal.request_pending = true;
            $('.galleryContainer').empty();
            Modal.AjaxGetImages(Modal.config.pagination, false, Modal.config.imageSearchAlt);


        });
    }
    static  ajaxSaveImages(form_data) {
        $.ajax({
            url: "/admin/saveImages",
            cache: false,
            contentType: false,
            processData: false,
            data: form_data,
            type: 'post',
            success: function (res) {
                Modal.hideModal();
                console.log('modal close----',res);
                Modal.config.insert(res);
                // Modal.click('.upload');

            }
        });
    }
    static  srcReplace(src){
        return src.replace(/http:\/\/localhost\/upload\/temp\/105|http:\/\/exclusive\.am\/upload\/temp\/105|\/upload\/temp\/105/gmi,'/upload')

    }

    static dropzoneGalleryRemuveBtnEvent() {
        if (document.querySelector('div.dropzoneGallery'))
        document.querySelector('div.dropzoneGallery').addEventListener('click', function (e) {
            if (e.target.classList.contains("dropzonRemuveBtn") || e.target.parentElement.classList.contains("dropzonRemuveBtn")) {
                e.target.closest('.DropzonImageBlock').remove()
            }
        });
    }

    static featuredImageRemuveBtnEvent() {
        if (document.querySelector('div.featuredImage'))
        document.querySelector('div.featuredImage').addEventListener('click', function (e) {
            if (e.target.classList.contains("dropzonRemuveBtn") || e.target.parentElement.classList.contains("dropzonRemuveBtn")) {
                e.target.closest('.DropzonImageBlock').remove()
                // element.closest(selectors);
            }
        });
    }

}


Modal.element= document.querySelector('#modal_image_upload');
Modal.addModalEvent({modalSelector:'#modal_image_upload'});
// Modal.modalHideEvent();
Modal.hideModalEventInClose();
Modal.modalShowEvent();
Modal.imageSearch();
Modal.initDropzone();
Modal.dropzoneGalleryRemuveBtnEvent();
Modal.featuredImageRemuveBtnEvent();
