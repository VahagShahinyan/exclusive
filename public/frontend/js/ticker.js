!function (e) {
    e.fn.ticker = function (t) {
        var o = e.extend({}, e.fn.ticker.defaults, t);
        if (0 == e(this).length) return window.console && window.console.log ? window.console.log("Element does not exist in DOM!") : alert("Element does not exist in DOM!"), !1;
        var n = "#" + e(this).attr("id"), i = e(this).get(0).tagName;
        return this.each(function () {
            function t(e) {
                var t, o = 0;
                for (t in e) e.hasOwnProperty(t) && o++;
                return o
            }

            function d() {
                var e = new Date;
                return e.getTime()
            }

            function l(e) {
                o.debugMode && (window.console && window.console.log ? window.console.log(e) : alert(e))
            }

            function a() {
                s(), e(n).wrap('<div id="' + f.dom.wrapperID.replace("#", "") + '"></div>'), e(f.dom.wrapperID).children().remove(), e(f.dom.wrapperID).append('<div id="' + f.dom.tickerID.replace("#", "") + '" class="ticker"><div id="' + f.dom.titleID.replace("#", "") + '" class="ticker-title"><span><!-- --></span></div><p id="' + f.dom.contentID.replace("#", "") + '" class="ticker-content"></p><div id="' + f.dom.revealID.replace("#", "") + '" class="ticker-swipe"><span><!-- --></span></div></div>'), e(f.dom.wrapperID).removeClass("no-js").addClass("ticker-wrapper has-js " + o.direction), e(f.dom.tickerElem + "," + f.dom.contentID).hide(), o.controls && (e(f.dom.controlsID).on("click mouseover mousedown mouseout mouseup", function (t) {
                    var o = t.target.id;
                    if ("click" == t.type) switch (o) {
                        case f.dom.prevID.replace("#", ""):
                            f.paused = !0, e(f.dom.playPauseID).addClass("paused"), h("prev");
                            break;
                        case f.dom.nextID.replace("#", ""):
                            f.paused = !0, e(f.dom.playPauseID).addClass("paused"), h("next");
                            break;
                        case f.dom.playPauseID.replace("#", ""):
                            1 == f.play ? (f.paused = !0, e(f.dom.playPauseID).addClass("paused"), p()) : (f.paused = !1, e(f.dom.playPauseID).removeClass("paused"), u())
                    } else "mouseover" == t.type && e("#" + o).hasClass("controls") ? e("#" + o).addClass("over") : "mousedown" == t.type && e("#" + o).hasClass("controls") ? e("#" + o).addClass("down") : "mouseup" == t.type && e("#" + o).hasClass("controls") ? e("#" + o).removeClass("down") : "mouseout" == t.type && e("#" + o).hasClass("controls") && e("#" + o).removeClass("over")
                }), e(f.dom.wrapperID).append('<ul id="' + f.dom.controlsID.replace("#", "") + '" class="ticker-controls"><li id="' + f.dom.playPauseID.replace("#", "") + '" class="jnt-play-pause controls"><a href=""><!-- --></a></li><li id="' + f.dom.prevID.replace("#", "") + '" class="jnt-prev controls"><a href=""><!-- --></a></li><li id="' + f.dom.nextID.replace("#", "") + '" class="jnt-next controls"><a href=""><!-- --></a></li></ul>')), "fade" != o.displayType && e(f.dom.contentID).mouseover(function () {
                    0 == f.paused && p()
                }).mouseout(function () {
                    0 == f.paused && u()
                }), o.ajaxFeed || r()
            }

            function s() {
                if (0 == f.contentLoaded) if (o.ajaxFeed) "xml" == o.feedType ? e.ajax({
                    url: o.feedUrl,
                    cache: !1,
                    dataType: o.feedType,
                    async: !0,
                    success: function (e) {
                        count = 0;
                        for (var n = 0; n < e.childNodes.length; n++) "rss" == e.childNodes[n].nodeName && (xmlContent = e.childNodes[n]);
                        for (var i = 0; i < xmlContent.childNodes.length; i++) "channel" == xmlContent.childNodes[i].nodeName && (xmlChannel = xmlContent.childNodes[i]);
                        for (var d = 0; d < xmlChannel.childNodes.length; d++) if ("item" == xmlChannel.childNodes[d].nodeName) {
                            xmlItems = xmlChannel.childNodes[d];
                            for (var a, s = !1, c = 0; c < xmlItems.childNodes.length; c++) "title" == xmlItems.childNodes[c].nodeName ? a = xmlItems.childNodes[c].lastChild.nodeValue : "link" == xmlItems.childNodes[c].nodeName && (s = xmlItems.childNodes[c].lastChild.nodeValue), a !== !1 && "" != a && s !== !1 && (f.newsArr["item-" + count] = {
                                type: o.titleText,
                                content: '<a href="' + s + '">' + a + "</a>"
                            }, count++, a = !1, s = !1)
                        }
                        return t(f.newsArr) < 1 ? (l("Couldn't find any content from the XML feed for the ticker to use!"), !1) : (f.contentLoaded = !0, void r())
                    }
                }) : l("Code Me!"); else {
                    if (!o.htmlFeed) return l("The ticker is set to not use any types of content! Check the settings for the ticker."), !1;
                    if (!(e(n + " LI").length > 0)) return l("Couldn't find HTML any content for the ticker to use!"), !1;
                    e(n + " LI").each(function (t) {
                        f.newsArr["item-" + t] = {type: o.titleText, content: e(this).html()}
                    })
                }
            }

            function r() {
                f.contentLoaded = !0, e(f.dom.titleElem).html(f.newsArr["item-" + f.position].type), e(f.dom.contentID).html(f.newsArr["item-" + f.position].content), f.position == t(f.newsArr) - 1 ? f.position = 0 : f.position++, distance = e(f.dom.contentID).width(), time = distance / o.speed, c()
            }

            function c() {
                if (e(f.dom.contentID).css("opacity", "1"), !f.play) return !1;
                var t = e(f.dom.titleID).width() + 20;
                e(f.dom.revealID).css(o.direction, t + "px"), "fade" == o.displayType ? e(f.dom.revealID).hide(0, function () {
                    e(f.dom.contentID).css(o.direction, t + "px").fadeIn(o.fadeInSpeed, m)
                }) : "scroll" == o.displayType || e(f.dom.revealElem).show(0, function () {
                    e(f.dom.contentID).css(o.direction, t + "px").show(), contentWindowSize = e(f.dom.tickerID).width() - e(f.dom.titleID).width() - 20, e(f.dom.contentID).width() <= contentWindowSize ? (animationAction = "right" == o.direction ? {marginRight: distance + "px"} : {marginLeft: distance + "px"}, e(f.dom.revealID).css("margin-" + o.direction, "0px").delay(20).animate(animationAction, time, "linear", m)) : (delay_scroll = contentWindowSize / o.speed, time_scroll = e(f.dom.contentID).width() / o.speed - delay_scroll, animationAction = "right" == o.direction ? {marginRight: contentWindowSize - 7 + "px"} : {marginLeft: contentWindowSize - 7 + "px"}, e(f.dom.revealID).css("margin-" + o.direction, "0px").delay(20).animate(animationAction, delay_scroll, "linear"), scrollSize = e(f.dom.titleID).width() + 20 - e(f.dom.contentID).width() + contentWindowSize, animationAction_scroll = "right" == o.direction ? {right: scrollSize + "px"} : {left: scrollSize + "px"}, e(f.dom.contentID).delay(delay_scroll).animate(animationAction_scroll, time_scroll, "linear", m))
                })
            }

            function m() {
                f.play ? (e(f.dom.contentID).delay(o.pauseOnItems).fadeOut(o.fadeOutSpeed), "fade" == o.displayType ? e(f.dom.contentID).fadeOut(o.fadeOutSpeed, function () {
                    e(f.dom.wrapperID).find(f.dom.revealElem + "," + f.dom.contentID).hide().end().find(f.dom.tickerID + "," + f.dom.revealID).show().end().find(f.dom.tickerID + "," + f.dom.revealID).removeAttr("style"), r()
                }) : e(f.dom.revealID).hide(0, function () {
                    e(f.dom.contentID).fadeOut(o.fadeOutSpeed, function () {
                        e(f.dom.wrapperID).find(f.dom.revealElem + "," + f.dom.contentID).hide().end().find(f.dom.tickerID + "," + f.dom.revealID).show().end().find(f.dom.tickerID + "," + f.dom.revealID).removeAttr("style"), r()
                    })
                })) : e(f.dom.revealElem).hide()
            }

            function p() {
                f.play = !1, e(f.dom.tickerID + "," + f.dom.revealID + "," + f.dom.titleID + "," + f.dom.titleElem + "," + f.dom.revealElem + "," + f.dom.contentID).stop(!0, !0), e(f.dom.revealID + "," + f.dom.revealElem).hide(), e(f.dom.wrapperID).find(f.dom.titleID + "," + f.dom.titleElem).show().end().find(f.dom.contentID).show()
            }

            function u() {
                f.play = !0, f.paused = !1, m()
            }

            function h(o) {
                switch (p(), o) {
                    case"prev":
                        0 == f.position ? f.position = t(f.newsArr) - 2 : 1 == f.position ? f.position = t(f.newsArr) - 1 : f.position = f.position - 2, e(f.dom.titleElem).html(f.newsArr["item-" + f.position].type), e(f.dom.contentID).html(f.newsArr["item-" + f.position].content);
                        break;
                    case"next":
                        e(f.dom.titleElem).html(f.newsArr["item-" + f.position].type), e(f.dom.contentID).html(f.newsArr["item-" + f.position].content)
                }
                f.position == t(f.newsArr) - 1 ? f.position = 0 : f.position++
            }

            var I = d(), f = {
                position: 0,
                time: 0,
                distance: 0,
                newsArr: {},
                play: !0,
                paused: !1,
                contentLoaded: !1,
                dom: {
                    contentID: "#ticker-content-" + I,
                    titleID: "#ticker-title-" + I,
                    titleElem: "#ticker-title-" + I + " SPAN",
                    tickerID: "#ticker-" + I,
                    wrapperID: "#ticker-wrapper-" + I,
                    revealID: "#ticker-swipe-" + I,
                    revealElem: "#ticker-swipe-" + I + " SPAN",
                    controlsID: "#ticker-controls-" + I,
                    prevID: "#prev-" + I,
                    nextID: "#next-" + I,
                    playPauseID: "#play-pause-" + I
                }
            };
            return "UL" != i && "OL" != i && o.htmlFeed === !0 ? (l("Cannot use <" + i.toLowerCase() + "> type of element for this plugin - must of type <ul> or <ol>"), !1) : ("rtl" == o.direction ? o.direction = "right" : o.direction = "left", void a())
        })
    }, e.fn.ticker.defaults = {
        speed: .05,
        ajaxFeed: !1,
        feedUrl: "",
        feedType: "xml",
        displayType: "reveal",
        htmlFeed: !0,
        debugMode: !0,
        controls: !1,
        direction: "ltr",
        pauseOnItems: 3e3,
        fadeInSpeed: 600,
        fadeOutSpeed: 300
    }, e("#sample").ticker()
}(jQuery);
