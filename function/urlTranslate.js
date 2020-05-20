// exports.urlTranslate=(req,res,next)=> {
//
// };
//


module.exports=function (x) {
    let urlObj={};
    if (x == '/') {
        urlObj.en = x + 'en';
        urlObj.ru = x + 'ru';
        urlObj.am = x + 'am';
    } else if (x.includes("am")) {
        urlObj.am = x;
        urlObj.ru = x.replace('am', 'ru');
        urlObj.en = x.replace('am', 'en');
    } else if (x.includes("ru")) {
        urlObj.ru = x;
        urlObj.am = x.replace('ru', 'am');
        urlObj.en = x.replace('ru', 'en');
    } else if (x.includes("en")) {
        urlObj.en = x;
        urlObj.ru = x.replace('en', 'ru');
        urlObj.am = x.replace('en', 'am');
    } else {
        urlObj.en = x + '/en';
        urlObj.ru = x + '/ru';
        urlObj.am = x + '/am';
    }
    return urlObj
}
