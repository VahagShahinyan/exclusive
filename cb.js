// const db= require('./config/database')

// var myDate2='2015-03-25';
/*var myDate='02/08/2020 -  03/08/2020';
myDate=myTrim(myDate);
console.log(myDate);

let minDate=myDate.trim().split('-')[0].split('/').reverse().join('-');
let maxDate=myDate.trim().split('-')[1].split('/').reverse().join('-');
console.log(new Date(minDate).getTime());
console.log(maxDate);*/


// console.log("date format",date);
// let d2=new Date(date).getTimezoneOffset()*60*1000;
// let gmt0DateTime=new Date(date).getTime()-14400000;


// new Date().getTimezoneOffset()*60*1000


/*
function myTrim(x) {
    return x.replace(/(\s)*!/gmi,'');
}
*/



// console.log(new Date().getTimezoneOffset()*60*1000);
//
// console.log(new Date('2020-02-07 14:52').getTime()-new Date().getTimezoneOffset()*60*1000);
// console.log(new Date().getTime());
//
//
// console.log(new Date().getTime());
//
//
// "http://localhost/post/4087/am"
// "http://localhost/cat/2/am"
// "http://localhost/am"
// "http://localhost"

// var urlObj={};



// var x= '/cat/1/ru';
// var x= '/post/4087/am';
// var x= '/am';
// // var x= '/';
//
//
//
// if (x.includes("am")){
//     urlObj.am=x;
//     urlObj.ru=x.replace('am','ru');
//     urlObj.en=x.replace('am','en');
// }
// else if (x.includes("ru")){
//     urlObj.ru=x;
//     urlObj.am=x.replace('ru','am');
//     urlObj.en=x.replace('ru','en');
// }
// else if (x.includes("en")){
//     urlObj.en=x;
//     urlObj.ru=x.replace('en','ru');
//     urlObj.am=x.replace('en','am');
// }
// else {
//     urlObj.en=x+'en';
//     urlObj.ru=x+'ru';
//     urlObj.am=x+'am';
// }
//
// console.log('---',urlObj);


// var src="/uploa/2020/02/11/1581448819852_277.jpeg";
// console.log(src.replace('/upload/temp/105', '/upload'));

// console.log(x.includes('am'));
// let url_array=x.slice(1).split('/');
// let lastelemt= url_array[url_array.length-1];
// console.log(lastelemt);

// const db = require('./config/database');


        // var x=  await db.execute(`-- SELECT  id, image_path, image_alt, "date" from images where id=5`);



// async function getBlogPost(id) {
//
//     const result = await db.query('SELECT  id, image_path, image_alt, "date" from images where id=?', [id]);
//     // console.log(result[0][0]);
//
//     // if (!result[0].length < 1) {
//     //     throw new Error('Post with this id was not found');
//     // }
//     setTimeout(()=>{
//         console.log("set time out");
//         return result[0][0];
//     },2000)
//
//
// }
//
//
//
// let x= getBlogPost(5);
// x.then(result=>{
// })
// console.log("x-----");


// async  function myfunc() {
//
//
//  await    setTimeout(function () {
//         console.log("----skizb---");
//             return 1
//
//     },2000)
// }
//
//
//
// myfunc();
// console.log("----verj---");




// async function main() {
//     let user =await db.execute(`select image_path from images limit 10`)
//
//     console.log(user);
//     console.log("verjin---");
// }
//
//
// (async ()=>{
//
// })();
//
//
//
//
// main();
//


//
// let x= '(6094,9395)(6094,9394)(6094,9393)';
// console.log(x.replace(/\)\(/gmi,'),('));


//
// let x=[ null ]
//
//
//
//
//
// if(x[0]){
// console.log(x);
// }else {
//     console.log('ok');
// }




// let x='2020-02-07 14:52';

// var date='22:50 05-03-2020';
// date=date.split(' ')[1].split('-').reverse().join('-')+" "+date.split(' ')[0];
//
// console.log(date);


// function getDateByOffset(date) {
//     date= new Date(date)
//     var h = date.getHours()<10 ? '0' + date.getHours() : date.getHours();
//     var min = date.getMinutes()<10 ? '0' + date.getMinutes() : date.getMinutes();
//     var d = date.getDate()<10 ? '0' + date.getDate() : date.getDate();
//     var mon = date.getMonth()+1;
//     mon = mon<10 ? '0' + mon : mon;
//     var y = date.getFullYear()<10 ?'0'+date.getFullYear() :date.getFullYear();
//     return h+':'+min+' '+d+'-'+mon+'-'+y;
// }
// function postStatusDate(date,status){
//     console.log('----date---',date);
//     let newDate0Time = new Date().getTime();
// //+new Date().getTimezoneOffset()*60*1000
//     if (!date){
//         return {date:newDate0Time ,status: status}
//     }
//     else {
//         // date=date.split(' ')[1].split('-').reverse().join('-')+" "+date.split(' ')[0];
//         // console.log("date format",date);
//
//         // let d2=new Date(date).getTimezoneOffset()*60*1000;
//         // let gmt0DateTime= new Date(date).getTime()-14400000;
//         let gmt0DateTime= date
//         console.log('gmt0DateTime',gmt0DateTime);
//         console.log('newDate0Time',newDate0Time);
//         if(gmt0DateTime > newDate0Time){
//             if (status ==PUBLIC){
//                 status = PENDING;
//                 return { date:gmt0DateTime,status: status }
//             }
//             else if (status ==DRAFT){
//                 return {date: gmt0DateTime,status:status}
//             }
//         }else {
//             if (status ==PUBLIC){
//
//                 return { date:gmt0DateTime,status: status }
//             }
//             else if (status ==DRAFT){
//                 return {date: gmt0DateTime,status:status}
//             }
//         }
//     }
// }



//
// let x= 'vib.er_ima.ge_2020-02-20_23-43-01.png';
// console.log(x.replace(/\.jpeg|\.png|\.jpg|\.tif|\.gif|\.webp/gmi, ''))

//
// let images= db.execute(`INSERT INTO exclusive.images (image_path,image_alt)  VALUES ('AI for Marketing','2019-08-01'),
//     ('ML for Sales','2019-05-15')`);
//
//
// images.then(result=>{
//     console.log(result);
// })

// const datePath=require('./function/datePath');


// console.log(datePath);


// console.log(new Date(1582414200000));
//
// var jsonObj = {};
// jsonObj['1']='vahag';
//
//
//
//
// console.log(__dirname);
// function f(a,b) {
//     return a+b;
//
// }
//
// var sum=f(10,5);
// console.log(sum)
// 
// ;

//
// var str = "        ed  ";
// // var s="Փա".toLowerCase();
// // var n = str.toLowerCase().indexOf(s);
// // console.log(n);
//
// let x= str.replace(/(\s)+/gmi,'')?true:false;
// console.log(x);
// console.log(str);
var x='vahag/vahag1/vahag2/vahag3';
var array=x.split('/');
let path='';
array.forEach(function (dir) {
    path +=dir;
    fs.mkdirSync(path);


})


// const fs= require('fs');

// fs.mkdirSync('vahag/vahag1/vahag2/vahag3');
