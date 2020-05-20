"use strict";

function getDateGMT0(date) {
    date = date.split('/').reverse().join('-');
    console.log('---date', date);
    return (new Date(date))
}

const PUBLIC = '1';
const DRAFT = '0';
const PENDING = '2';
var categories = '';
$(document).ready(function () {

    $.ajax({
        url: '/admin/allusers',
        type: 'get',
        success: function (data, textStatus, jQxhr) {

        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });


    var table = $('#posts_datatable');
    var filter = {};
    table = table.DataTable({
        searchDelay: 500,
        scrollX: "90%",
        processing: true,
        serverSide: true,
        paging: true,
        ajax: {
            url: '/admin/posts',
            method: "POST",
            data: function (d) {
                console.log("----", d);
                d.search = d.search.value;
                d.page = d.start / d.length + 1;
                d.filter = filter;
                d.count = d.length;
                return d;
            },
        },
        columns: [
            {
                data: 'id',
                render: function (data, type, row) {
                    return data;
                }
            },
            {
                data: 'title_am',
                render: function (data, type, row) {
                    return `<a href="/admin/post/${row.id}/edit">${data}</a>`;
                }
            },
            {
                data: 'title_ru',
                render: function (data, type, row) {
                    return `<a href="/admin/post/${row.id}/edit">${data}</a>`;
                }
            },
            {
                data: 'title_en',
                render: function (data, type, row) {
                    return data;
                }
            },
            {
                data: 'cat_title_am',
                render: function (data, type, row) {
                    return data;
                }
            },


            {
                data: 'status',
                render: function (data, type, row) {
                    if (data == DRAFT) {
                        return `<span class="kt-badge  kt-badge--danger kt-badge--inline kt-badge--pill">Черновик</span>`;
                    } else if (data == PUBLIC) {
                        return `<span class="kt-badge  kt-badge--success kt-badge--inline kt-badge--pill">Опубликовано</span>`;
                    } else if (data == PENDING) {
                        return `<span class="kt-badge  kt-badge--warning kt-badge--inline kt-badge--pill">Запланировано</span>`;
                    }
                }
            },
            {
                data: 'author',
                render: function (data, type, row) {
                    if (data == PUBLIC) {

                        return `<span class="kt-font-bold  kt-font-success"><i class="la la-plus  author"></i></span>`


                    } else if (data == DRAFT) {
                        return `<span class="kt-font-bold kt-font-danger "><i class="la la-minus author"></span>`
                    }

                }
            },
            {
                data: 'user_name_am',
                render: function (data, type, row) {
                    return data;
                }
            },
            {
                data: 'date',
                render: function (data, type, row) {
                    return new Date(data).toString().split('GMT')[0];
                }
            },
            {
                data: 'featured_image',
                render: function (data, type, row) {
                    console.log('-----data--',data.image_path);
                    if (data.image_path)
                        return '<img src="/upload/temp/105/' + data.image_path + '">';
                    return '';
                }
            },
            {
                data: 'id',
                render: function (data, type, row) {
                    return `<a href="/admin/post/${data}/edit" class="btn btn-sm btn-clean btn-icon btn-icon-md" title="Edit"><i class="la la-edit"></i></a>`;


                }
            },
            {
                data: 'id',
                render: function (data, type, row) {
                    return `<a href="#" data-id="${data}" class="btn btn-sm btn-clean btn-icon btn-icon-md delete-btn" title="Delete"><i class="la la-close"></i></a>`;
                }
            }


        ],
    });

    $(".posts-form .status-select").select2({
        multiple: true,

        data: [
            {
                id: 0,
                text: 'Черновик'
            },
            {
                id: 1,
                text: 'Опубликовано'
            },
            {
                id: 2,
                text: 'Запланировано'
            }
        ]

    });




    $(".posts-form .user-select").select2({
        "multiple": true,
        "ajax": {
            "url": '/admin/allusers',
            "type": 'get',
            "processResults": function (data) {
                console.log('data',data);
                return {
                    results: data.map((x) => {
                        return {id: x.id, text: x.name_am}
                    })
                };
            }
        }


    });

    $(".posts-form .category-select").select2({
        "multiple": true,
        "ajax": {
            "url": '/categories',
            "type": 'post',
            "processResults": function (data) {
                return {
                    results: data.map((x) => {
                        return {id: x.id, text: x.title}
                    })
                };
            }
        }


    })


    $('body').on('change', '.posts-form select', function () {
        filter[$(this).attr('name')] = $(this).val();
        table.clear();
        table.draw();
    });


    $('body').on('click', '.delete-btn', function () {
        var id = $(this).attr('data-id');
        if (confirm("Delete post?")) {
            $.ajax({
                type: "DELETE",
                url: "/admin/post/",
                data: {postId: id},
                success: function (response) {
                    table.clear();
                    table.draw();
                }
            });
        }
    })


    $("#kt_daterangepicker_2 input").daterangepicker({
        autoUpdateInput: false,
        locale: {
            format: 'DD/MM/YYYY'
        },
    });
    $("#kt_daterangepicker_2 input").on('apply.daterangepicker', function (ev, picker) {
        let daterange = picker.startDate.format('DD/MM/YYYY') + ' - ' + picker.endDate.format('DD/MM/YYYY');
        $(this).val(daterange);
        daterange = daterange.split('-').map(x => x.trim());
        filter.date_min = new Date(daterange[0].split('/').reverse().join('-') + ' 00:00').getTime();
        filter.date_max = new Date(daterange[1].split('/').reverse().join('-') + ' 23:59').getTime();
        table.clear();
        table.draw();
    });
    $("#kt_daterangepicker_2 input").on('cancel.daterangepicker', function (ev, picker) {
        $(this).val('');
        if (filter.date_max) delete filter.date_max
        if (filter.date_min) delete filter.date_min
        table.clear();
        table.draw();
    });


})
