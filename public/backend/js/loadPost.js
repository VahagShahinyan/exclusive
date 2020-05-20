document.addEventListener("DOMContentLoaded", function () {
    var postID= document.querySelector('.postId').value;
    function setData(tagName, inputName,data) {
        if (tagName.toString() === 'textarea' && (inputName == 'excerpt_am' ||  inputName == 'excerpt_ru' || inputName == 'excerpt_en')) {
            document.querySelector(tagName+"[name="+inputName+"]").value=data
        }
        else if (tagName.toString() === 'textarea' && inputName == 'content_am' ) {
            document.querySelector('#sum1 div.note-editable').innerHTML=data
        }
        else if (tagName.toString() === 'textarea' && inputName == 'content_ru' ) {
            document.querySelector('#sum2 div.note-editable').innerHTML=data
        }
        else if (tagName.toString() === 'textarea' &&  inputName == 'content_en') {
            document.querySelector('#sum3 div.note-editable').innerHTML=data
        }
        else if(inputName=='status'){
            if (data == '0') {
                document.querySelector(tagName+"[name="+inputName+"]").checked=false;
                document.querySelector('div.status').innerHTML=`<span class="kt-badge kt-badge--danger kt-badge--lg">Ч</span>`
            }
            else if (data=='2') {
                document.querySelector(tagName+"[name="+inputName+"]").checked=false;
                document.querySelector('div.status').innerHTML=`<span class="kt-badge kt-badge--warning kt-badge--lg">З</span>`

            }

            else if (data=='1') {
                document.querySelector(tagName+"[name="+inputName+"]").checked=true;

                document.querySelector('div.status').innerHTML=`<span class="kt-badge kt-badge--success kt-badge--lg">О</span>`

            }

        }
        else if(inputName=='author'){
            if (data == '0' ||data=='2') {
                document.querySelector(tagName+"[name="+inputName+"]").checked=false;
            }
            else if (data=='1') {
                document.querySelector(tagName+"[name="+inputName+"]").checked=true;
            }

        }
        else if (inputName=="date") {
            document.querySelector(tagName + "[name=" + inputName + "]").setAttribute('value', data);
        } else {
            console.log('tagName', inputName);
            document.querySelector(tagName + "[name=" + inputName + "]").setAttribute('value', data);
        }
    }
    function setGallery(data) {
        var data2=    JSON.parse('[' +data+']');
        if (data2.length>0 && data2[0][0] != null) {
            var gallery="";

            data2.forEach(function (item) {
                gallery += ` <div class="col-md-3 col-lg-2 DropzonImageBlock">
                                    <img class="img-fluid " src="/upload/${item[1]}" alt="${item[2]}" data_id="${item[0]}">
                                        <div>
                                            <button type="button" class=" dropzonRemuveBtn btn  btn-outline-danger">
                                                <i class="la la-trash"></i>
                                            </button>
                                        </div>
                                    </div>
                            `;

            });
            document.querySelector('div.dropzoneGallery').innerHTML=gallery;
        }
    }
    function setfeaturedImage(postData) {
        $('div.featuredImage').empty();
        document.querySelector('div.featuredImage').innerHTML=
            `<div class="col-md-12 col-lg-12 DropzonImageBlock">
                        <img class="img-fluid "
                         src="/upload/${postData.featured_image_url}"
                          alt="${postData.featured_image_alt}"
                          data_id="${postData.featured_image_id}">
                        <div>
                        <button type="button" class=" dropzonRemuveBtn btn  btn-outline-danger"><i class="la la-trash"></i></button>
                    </div>
                    </div>`
        document.querySelector('.featuredImage').addEventListener('click', function (e) {
            if (e.target.classList.contains("dropzonRemuveBtn") || e.target.parentElement.classList.contains("dropzonRemuveBtn")) {
                e.target.closest('.DropzonImageBlock').remove()
                // element.closest(selectors);
            }
        });
    }
    function categories(allCat,selectedCat){
        renderPosts(allCat.concat());
        document.querySelectorAll('select[name="categories"] option').forEach(function (cat) {
            if (selectedCat.toString()== cat.value.toString()) {
                cat.setAttribute('selected','selected');
            }

        });
        $('#kt_select2_3').select2();

    }
    function renderPosts(_posts = []) {
        const $posts = document.querySelector('#kt_select2_3');
        if (_posts.length > 0) {
            $posts.innerHTML = '<option></option>'+ _posts.map(post => option(post)).join(' ')
        } else {
            $posts.innerHTML = `<div class="center">Постов пока нет</div>`
        }
    }
    function option(item) {
        return `<option value="${item.id}">${item.title}</option>`
    }

    var dateSelected=document.querySelector('input[name="date"]');
   var dateMillisecond= +dateSelected.getAttribute('dateValue');
    var date=getDateByOffset(dateMillisecond);
    console.log('dateMillisecond',dateMillisecond);
    // dateSelected.setAttribute('value',date)

    let datepicker=$('#kt_datetimepicker_4_3_1').datetimepicker({
        todayHighlight: false,
        autoclose: false,
        pickerPosition: 'top-left',
        forceParse: 0,
        format: 'hh:ii dd-mm-yyyy'
    });
    datepicker.datetimepicker('update', new Date(dateMillisecond));




    function getDateByOffset(date) {
         date= new Date(date);
        var h = date.getHours()<10 ? '0' + date.getHours() : date.getHours();
        var min = date.getMinutes()<10 ? '0' + date.getMinutes() : date.getMinutes();
        var d = date.getDate()<10 ? '0' + date.getDate() : date.getDate();
        var mon = date.getMonth()+1;
        mon = mon<10 ? '0' + mon : mon;
        var y = date.getFullYear()<10 ? '0'+date.getFullYear() :date.getFullYear();
        return h+':'+min+' '+d+'-'+mon+'-'+y;
    }

    // $.ajax({
    //     url: "/admin/post/"+postID+"/edit",
    //     data: JSON.stringify( {'postID':postID}),
    //     type: 'POST',
    //     dataType: 'json',
    //     cache: false,
    //     processData: false,
    //     contentType: 'application/json; charset=utf-8',
    //     success: function (res) {
    //             console.log("----res",res);
    //         setData('input','title_am',res.postData.title_am);
    //         setData('textarea','excerpt_am',res.postData.excerpt_am);
    //         setData('textarea','content_am',res.postData.content_am);
    //         setData('input','title_ru',res.postData.title_ru);
    //         setData('textarea','excerpt_ru',res.postData.excerpt_ru);
    //         setData('textarea','content_ru',res.postData.content_ru);
    //         setData('input','title_en',res.postData.title_en);
    //         setData('textarea','excerpt_en',res.postData.excerpt_en);
    //         setData('textarea','content_en',res.postData.content_en);
    //         setData('input','date',getDateByOffset(res.postData.date));
    //         setData('input','status',res.postData.status);
    //         setData('input','author',res.postData.author);
    //         setGallery(res.postData.gallery);
    //         setfeaturedImage(res.postData);
    //         categories(res.allCategories,res.postData.selectedCategory);
    //         document.querySelector('button.deletePost').addEventListener('click',function (e) {
    //             e.preventDefault();
    //             var postId= document.querySelector('button.deletePost').getAttribute('data_id');
    //             if(confirm("Delete post?")){
    //                 $.ajax({
    //                     url: "/admin/post/",
    //                     data: JSON.stringify( {'postId':postId}),
    //                     type: 'DELETE',
    //                     dataType: 'json',
    //                     cache: false,
    //                     processData: false,
    //                     contentType: 'application/json; charset=utf-8',
    //                     success: function (res) {
    //                         window.location.href = "/admin/posts";
    //
    //                     }
    //                 })
    //             }
    //         })

        // }
    // })
//




    document.querySelector('button.deletePost').addEventListener('click',function (e) {
        e.preventDefault();
        var postId= document.querySelector('button.deletePost').getAttribute('data_id');
        if(confirm("Delete post?")){
            $.ajax({
                url: "/admin/post/",
                data: JSON.stringify( {'postId':postId}),
                type: 'DELETE',
                dataType: 'json',
                cache: false,
                processData: false,
                contentType: 'application/json; charset=utf-8',
                success: function (res) {
                    window.location.href = "/admin/posts";

                }
            })
        }
    })


});

