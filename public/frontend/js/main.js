(function ($) {
    "use strict";

    /*-------------------------------------
    Current Day and Date
    -------------------------------------*/
    if($("#current_date").length) {
        document.getElementById("current_date").innerHTML = formatAMPM();
    }
    function formatAMPM() {
    var d = new Date(),
        months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
        days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    return days[d.getDay()]+' , '+months[d.getMonth()]+' '+d.getDate()+' , '+d.getFullYear();
    }
    
    /*-------------------------------------
    IE Fixing
    -------------------------------------*/
    function isIE() {
        var myNav = navigator.userAgent.toLowerCase();
        return (myNav.indexOf('msie') != -1 || myNav.indexOf('trident') != -1) ? true : false;
    }

    if (isIE()) {
        $('body').addClass('ie');
    }

    /*-------------------------------------
    Popup
    -------------------------------------*/
    var yPopup = $(".popup-youtube");
    if (yPopup.length) {
        yPopup.magnificPopup({
            disableOn: 700,
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,
            fixedContentPos: false
        });
    }
    if ($('.zoom-gallery').length) {
        $('.zoom-gallery').each(function () { // the containers for all your galleries
            $(this).magnificPopup({
                delegate: 'a.ne-zoom', // the selector for gallery item
                type: 'image',
                gallery: {
                    enabled: true
                }
            });
        });
    }

    /*-------------------------------------
     Jquery Serch Box
     -------------------------------------*/
    $(document).on('click', '#top-search-form .search-button', function (e) {
        e.preventDefault();
        var targrt = $(this).prev('input.search-input');
        targrt.animate({
            width: ["toggle", "swing"],
            height: ["toggle", "swing"],
            opacity: "toggle"
        }, 500, "linear");
        return false;
    });

    /*-------------------------------------
    On click loadmore functionality 
    -------------------------------------*/
    $('.loadmore').on('click', 'a', function (e) {
        e.preventDefault();
        var _this = $(this),
            _parent = _this.parents('.menu-list-wrapper'),
            _target = _parent.find('.menu-list'),
            _set = _target.find('.menu-item.hidden').slice(0, 3);
        if (_set.length) {
            _set.animate({
                opacity: 0
            });
            _set.promise().done(function () {
                _set.removeClass('hidden');
                _set.show().animate({
                    opacity: 1
                }, 1000);
            });
        } else {
            _this.text('No more item to display');
        }
        return false;
    });

    /*-------------------------------------
     jQuery MeanMenu activation code
     --------------------------------------*/
    $('nav#dropdown').meanmenu({
        siteLogo: "<div class='mobile-menu-nav-back'><a href='/' class='logo-mobile'><img src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHMAAAAyCAYAAABvR+QvAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjdFMTM5QUM4N0VENzExRTk5QzdFQTU3QjUzM0JCQzA0IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjdFMTM5QUM5N0VENzExRTk5QzdFQTU3QjUzM0JCQzA0Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6N0UxMzlBQzY3RUQ3MTFFOTlDN0VBNTdCNTMzQkJDMDQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6N0UxMzlBQzc3RUQ3MTFFOTlDN0VBNTdCNTMzQkJDMDQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6RldS5AAAI0UlEQVR42uxc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\" alt=\"\" /></a></div>"
    });

    /*-------------------------------------
     Wow js Active
    -------------------------------------*/
    new WOW().init();

    /*-------------------------------------
     Jquery Scollup
     -------------------------------------*/
    $.scrollUp({
        scrollText: '<i class="fa fa-angle-double-up"></i>',
        easingType: 'linear',
        scrollSpeed: 900,
        animation: 'fade'
    });

    /*-------------------------------------
    Offcanvas Menu activation code
    -------------------------------------*/
    $('#wrapper').on('click', '#side-menu-trigger a.menu-bar', function (e) {
        e.preventDefault();
        var $this = $(this),
            wrapper = $(this).parents('body').find('>#wrapper'),
            wrapMask = $('<div />').addClass('offcanvas-mask');
        wrapper.addClass('open').append(wrapMask);
        $this.addClass('open');
        $this.next('.menu-times').removeClass('close');
        document.getElementById('offcanvas-body-wrapper').style.right = '0';
        return false;
    });
    $('#wrapper').on('click', '#side-menu-trigger a.menu-times', function (e) {
        e.preventDefault();
        var $this = $(this);
        $("#offcanvas-body-wrapper").attr('style', '');
        $this.prev('.menu-bar').removeClass('open');
        $this.addClass('close');
        closeSideMenu();
        return false;
    });
    $('#wrapper').on('click', '#offcanvas-nav-close a', function (e) {
        closeSideMenu();
        return false;
    });
    $(document).on('click', '#wrapper.open .offcanvas-mask', function () {
        closeSideMenu();
    });
    $(document).on('keyup', function (event) {
        if (event.which === 27) {
            event.preventDefault();
            closeSideMenu();
        }
    });

    function closeSideMenu() {
        var wrapper = $('body').find('>#wrapper'),
            $this = $('#side-menu-trigger a.menu-times');
        wrapper.removeClass('open').find('.offcanvas-mask').remove();
        $("#offcanvas-body-wrapper").attr('style', '');
        $this.prev('.menu-bar').removeClass('open');
        $this.addClass('close');
    }

    /*-------------------------------------
    Select2 activation code
    -------------------------------------*/
    if ($('#archive-search select.select2').length) {
        $('#archive-search select.select2').select2({
            theme: 'classic',
            dropdownAutoWidth: true,
            width: '100%'
        });
    }

    /*-------------------------------------
     Window load function
     -------------------------------------*/
    $(window).on('load', function () {

        /*-------------------------------------
        Page Preloader
        -------------------------------------*/
       /* $('#preloader').fadeOut('slow', function () {
            $(this).remove();
        });*/

        /*-------------------------------------
         jQuery for Isotope initialization
         -------------------------------------*/
        var iso_container = $('.ne-isotope');
        if (iso_container.length > 0) {

            iso_container.each(function () {
                var $container = $(this),
                    selector = $container.find('.isotope-classes-tab a.current').attr('data-filter');
                // Isotope initialization
                var $isotope = $container.find('.featuredContainer').isotope({
                    filter: selector,
                    animationOptions: {
                        duration: 750,
                        easing: 'linear',
                        queue: false
                    }
                });

                // Isotope filter
                $container.find('.isotope-classes-tab').on('click', 'a', function () {

                    var $this = $(this);
                    $this.parent('.isotope-classes-tab').find('a').removeClass('current');
                    $this.addClass('current');
                    var selector = $this.attr('data-filter');
                    $isotope.isotope({
                        filter: selector,
                        animationOptions: {
                            duration: 750,
                            easing: 'linear',
                            queue: false
                        }
                    });
                    return false;

                });

            });
        }

        /*-------------------------------------
         jQuery for Isotope initialization
         -------------------------------------*/
        var $container = $('.ne-isotope-all');
        if ($container.length > 0) {

            var selector = $container.find('.isotope-classes-tab a.current').attr('data-filter');
            console.log(selector);
            // Isotope initialization
            var $isotope = $container.find('.featuredContainer').isotope({
                filter: selector,
                animationOptions: {
                    duration: 750,
                    easing: 'linear',
                    queue: false
                }
            });

            // Isotope filter
            $container.find('.isotope-classes-tab').on('click', 'a', function () {

                var $this = $(this);
                $this.parent('.isotope-classes-tab').find('a').removeClass('current');
                $this.addClass('current');
                var selector = $this.attr('data-filter');
                $isotope.isotope({
                    filter: selector,
                    animationOptions: {
                        duration: 750,
                        easing: 'linear',
                        queue: false
                    }
                });
                return false;

            });
        }
    });

    /*-------------------------------------
     Accordion
     -------------------------------------*/
    var accordion = $('#accordion');
    accordion.children('.panel').children('.panel-collapse').each(function () {
        if ($(this).hasClass('in')) {
            $(this).parent('.panel').children('.panel-heading').addClass('active');
        }
    });
    accordion.on('show.bs.collapse', function (e) {
        $(e.target).prev('.panel-heading').addClass('active');
    }).on('hide.bs.collapse', function (e) {
        $(e.target).prev('.panel-heading').removeClass('active');
    });

    /*-------------------------------------
     Contact Form initiating
     -------------------------------------*/
    var contactForm = $('#contact-form');
    if (contactForm.length) {
        contactForm.validator().on('submit', function (e) {
            var $this = $(this),
                $target = contactForm.find('.form-response');
            if (e.isDefaultPrevented()) {
                $target.html("<div class='alert alert-success'><p>Please select all required field.</p></div>");
            } else {
                $.ajax({
                    url: "vendor/php/contact-form-process.php",
                    type: "POST",
                    data: contactForm.serialize(),
                    beforeSend: function () {
                        $target.html("<div class='alert alert-info'><p>Loading ...</p></div>");
                    },
                    success: function (text) {
                        if (text === "success") {
                            $this[0].reset();
                            $target.html("<div class='alert alert-success'><p>Message has been sent successfully.</p></div>");
                        } else {
                            $target.html("<div class='alert alert-success'><p>" + text + "</p></div>");
                        }
                    }
                });
                return false;
            }
        });
    }

    /*-------------------------------------
    Login pop up form
    -------------------------------------*/
    $('#login-button').on('click', function (e) {
        e.preventDefault();
        var self = $(this),
            target = self.next('#login-form');
        if (self.hasClass('open')) {
            target.slideUp('slow');
            self.removeClass('open');
        } else {
            target.slideDown('slow');
            self.addClass('open');
        }
    });
    $('#login-form').on('click', '.form-cancel', function (e) {
        e.preventDefault();
        var self = $(this),
            parent = self.parents('#login-form'),
            loginButton = parent.prev('#login-button');
        parent.slideUp('slow');
        loginButton.removeClass('open');
    });

    /*-------------------------------------
    Google Map
    -------------------------------------*/
/*
    if ($("#googleMap").length) {
        window.onload = function () {
            var styles = [{
                featureType: 'water',
                elementType: 'geometry.fill',
                stylers: [{
                    color: '#b7d0ea'
                }]
            }, {
                featureType: 'road',
                elementType: 'labels.text.fill',
                stylers: [{
                    visibility: 'off'
                }]
            }, {
                featureType: 'road',
                elementType: 'geometry.stroke',
                stylers: [{
                    visibility: 'off'
                }]
            }, {
                featureType: 'road.highway',
                elementType: 'geometry',
                stylers: [{
                    color: '#c2c2aa'
                }]
            }, {
                featureType: 'poi.park',
                elementType: 'geometry',
                stylers: [{
                    color: '#b6d1b0'
                }]
            }, {
                featureType: 'poi.park',
                elementType: 'labels.text.fill',
                stylers: [{
                    color: '#6b9a76'
                }]
            }];
            var options = {
                mapTypeControlOptions: {
                    mapTypeIds: ['Styled']
                },
                // center: new google.maps.LatLng(-37.81618, 144.95692),
                zoom: 11,
                disableDefaultUI: true,
                mapTypeId: 'Styled'
            };
            var div = document.getElementById('googleMap');
            var map = new google.maps.Map(div, options);
            var marker = new google.maps.Marker({
                position: map.getCenter(),
                animation: google.maps.Animation.BOUNCE,
                icon: 'img/map-marker.png',
                map: map
            });:1 Element does not exist in DOM!
            var styledMapType = new google.maps.StyledMapType(styles, {
                name: 'Styled'
            });

            map.mapTypes.set('Styled', styledMapType);
        };
    }
*/

    /*-------------------------------------
     Carousel slider initiation
     -------------------------------------*/
    $('.ne-carousel').each(function () {
        var carousel = $(this),
            loop = carousel.data('loop'),
            items = carousel.data('items'),
            margin = carousel.data('margin'),
            stagePadding = carousel.data('stage-padding'),
            autoplay = carousel.data('autoplay'),
            autoplayTimeout = carousel.data('autoplay-timeout'),
            smartSpeed = carousel.data('smart-speed'),
            dots = carousel.data('dots'),
            nav = carousel.data('nav'),
            navSpeed = carousel.data('nav-speed'),
            rXsmall = carousel.data('r-x-small'),
            rXsmallNav = carousel.data('r-x-small-nav'),
            rXsmallDots = carousel.data('r-x-small-dots'),
            rXmedium = carousel.data('r-x-medium'),
            rXmediumNav = carousel.data('r-x-medium-nav'),
            rXmediumDots = carousel.data('r-x-medium-dots'),
            rSmall = carousel.data('r-small'),
            rSmallNav = carousel.data('r-small-nav'),
            rSmallDots = carousel.data('r-small-dots'),
            rMedium = carousel.data('r-medium'),
            rMediumNav = carousel.data('r-medium-nav'),
            rMediumDots = carousel.data('r-medium-dots'),
            rLarge = carousel.data('r-Large'),
            rLargeNav = carousel.data('r-Large-nav'),
            rLargeDots = carousel.data('r-Large-dots'),
            center = carousel.data('center');
        carousel.owlCarousel({
            loop: (loop ? true : false),
            items: (items ? items : 4),
            lazyLoad: true,
            margin: (margin ? margin : 0),
            autoplay: (autoplay ? true : false),
            autoplayTimeout: (autoplayTimeout ? autoplayTimeout : 1000),
            smartSpeed: (smartSpeed ? smartSpeed : 250),
            dots: (dots ? true : false),
            nav: (nav ? true : false),
            navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right" aria-hidden="true"></i>'],
            navSpeed: (navSpeed ? true : false),
            center: (center ? true : false),
            responsiveClass: true,
            responsive: {
                0: {
                    items: (rXsmall ? rXsmall : 1),
                    nav: (rXsmallNav ? true : false),
                    dots: (rXsmallDots ? true : false)
                },
                480: {
                    items: (rXmedium ? rXmedium : 2),
                    nav: (rXmediumNav ? true : false),
                    dots: (rXmediumDots ? true : false)
                },
                768: {
                    items: (rSmall ? rSmall : 3),
                    nav: (rSmallNav ? true : false),
                    dots: (rSmallDots ? true : false)
                },
                992: {
                    items: (rMedium ? rMedium : 4),
                    nav: (rMediumNav ? true : false),
                    dots: (rMediumDots ? true : false)
                },
                1200: {
                    items: (rLarge ? rLarge : 5),
                    nav: (rLargeNav ? true : false),
                    dots: (rLargeDots ? true : false)
                }
            }
        });
    });

    /*-------------------------------------
     Window onLoad and onResize event trigger
     -------------------------------------*/
    $(window).on('load resize', function () {
        var wHeight = $(window).height(),
            mLogoH = $('a.logo-mobile').outerHeight();
        wHeight = wHeight - 50;
        $('.mean-nav > ul').css('height', wHeight + 'px');

        /* add top margin */
        var target = $(".add-top-margin"),
            mHeight = $(".header-menu-fixed").outerHeight();
        target.css({
            "margin-top": mHeight + 'px'
        });
        var windowWidth = $(window).width();
        if (windowWidth < 991) {
            $('body.mean-container').css('margin-top', 0);
        }

    });

    /*-------------------------------------
     Jquery Stiky Menu at window Load
     -------------------------------------*/
    $(window).on('scroll', function () {
        var s = $('#sticker'),
            sH = s.outerHeight(),
            windowpos = $(window).scrollTop(),
            windowWidth = $(window).width(),
            h1 = $('#header-layout1'),
            h2 = $('#header-layout2');
        if (windowWidth > 991) {
            var topBarH = 1,
                mBottom = 0;

            if (h2.length) {
                topBarH = h2.find('.header-top-bar').outerHeight();
            }

            if (windowpos >= topBarH) {
                if (h1.length) {
                    s.addClass('stick');
                }
                if (h2.length) {
                    s.addClass('stick');
                    $('.main-menu-area').addClass('header-menu-fixed');
                    $('body').css({
                        'margin-top': sH + 'px'
                    });
                }

            } else {
                s.removeClass('stick');
                if (h2.length) {
                    s.removeClass('stick');
                    $('.main-menu-area').removeClass('header-menu-fixed');
                    $('body').css({
                        'margin-top': 0
                    });
                }
            }
        }
    });

    /*-------------------------------------
     Masonry
     -------------------------------------*/
    $('.masonry-items').masonry({
        // set itemSelector so .grid-sizer is not used in layout
        itemSelector: '.masonry-item',
        // use element for option
        columnWidth: '.masonry-item',
        // percentPosition: true
    });

    var flag = true
    var page = 1;
    if (document.querySelector('.mySearch')){
        document.querySelector('.mySearch').addEventListener('keyup', function (e) {
            var searchText = e.target.value;
            var validText = searchText.replace(/(\s)+/gmi, '') ? true : false;
            if (validText && flag) {
                flag = false;
                fetch(`/searchapi?s=${searchText}&page=1`, {method: 'get'})
                    .then(res => {
                        return res.json()
                    })
                    .then(data => {
                        $('.searchPosts').empty()
                        data.forEach(function (item) {
                            var post = renderPost(item)

                            $('.searchPosts').append(post)


                        })
                    })
                    .then(() => {
                        flag = true
                    })
                    .catch(err => console.log(err))
                console.log('myObjS2', myObjS);
            } else {
                $('.searchPosts').empty()
            }


        })
    }
    if (document.querySelector('.loadMoreBtn')) {
        document.querySelector('.loadMoreBtn').addEventListener('click', function (e) {
            page++
            var searchText = document.querySelector('.mySearch').value;
            var validText = searchText.replace(/(\s)+/gmi, '') ? true : false;
            if (validText && flag) {
                flag=false
                fetch(`/searchapi?s=${searchText}&page=${page}`, {method: 'get'})
                    .then(res => {
                        return res.json()
                    })
                    .then(data => {
                        console.log('data', data);
                        data.forEach(function (item) {
                            var post = renderPost(item)

                            $('.searchPosts').append(post)


                        })
                    })
                    .then(()=>{
                        flag=true;
                    })
                    .catch(err => console.log(err))
            }
        });

    }
    if (document.querySelectorAll('.dateTime')) {
        document.querySelectorAll('.dateTime').forEach(function (item) {
            var gmt0=+item.getAttribute('value');
            var myDate=getDateByOffset(gmt0);
            item.innerHTML=myDate;
        });

    }
    if (document.querySelector('.search-input')) {
        document.querySelector('.search-input').addEventListener("keyup", function(e) {
            if (e.keyCode === 13) {
                e.preventDefault();
                var getLang= document.querySelector('a[data-lang]').getAttribute('data-lang')
                var searchText= document.querySelector('.search-input').value;
                window.location.href=`/search/${getLang}?s=${searchText}`

            }
        });
    }
    function renderPost(item) {
        return `<div class="col-xl-12 col-lg-6 col-md-6 col-sm-12">
                    <div class="media media-none--lg mb-30">
                    <div class="position-relative width-40">
                    <a href="/post/${item.id}/${item.lang}" class="img-opacity-hover img-overlay-70">
                    <img src="/upload/temp/389/${item.featured_image.image_path}" alt="news" class="img-fluid">
                    </a>

                    </div>
                    <div class="media-body p-mb-none-child media-margin30">
                    <div class="post-date-dark">
                    <ul>
                    <li>
                    <span class="dateTime">
                    <i class="fa fa-calendar" aria-hidden="true"></i>
                    </span>${getDateByOffset(item.date)}</li>
                </ul>
                </div>
                <h3 class="title-semibold-dark size-lg mb-15">
                    <a href="/post/${item.id}/${item.lang}">${item['title_' + item.lang]}</a>
                    </h3>
                    </div>
                    </div>
                    </div>`
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










})(jQuery);
