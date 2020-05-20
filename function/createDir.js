const fs=require('fs');

function createDir(dir) {
    var array=dir.split('/');
    let path='';
    array.forEach(function (dir) {
        path +=dir+'/';
        if (!fs.existsSync(path)){
            fs.mkdirSync(path);
        }
    })
}


module.exports=createDir;
