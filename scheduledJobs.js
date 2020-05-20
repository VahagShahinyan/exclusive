const schedule = require('node-schedule');



let date=1582403580000;


schedule.scheduleJob('xxx', date, function (f) {
    // console.log(postId,f);
    console.log("yes create");
    // return db.execute(`--  UPDATE  posts SET  status=? WHERE posts.id=? `, [PUBLIC, postId]);

});

async function  createJob(postId,date,prefix="post_") {
    console.log('-------------------create job-------');
    if (schedule.scheduledJobs[prefix+postId]){

        console.log("update new job",new Date(date).getTime());
        console.log('---------update date-----', date);
        schedule.scheduledJobs[prefix+postId].cancel();
        await  schedule.scheduleJob(prefix+postId, date, function (f) {
            console.log(f);
            console.log("yes update");
            return  db.execute(` UPDATE  posts SET  status=? WHERE posts.id=? `, [PUBLIC, postId]);

        });
    }else {
        console.log("create new job",new Date(date));
        console.log('----------create date-----',date);

        await schedule.scheduleJob(prefix+postId, date, function (f) {
            console.log(postId,f);
            console.log("yes create");
            return db.execute(` UPDATE  posts SET  status=? WHERE posts.id=? `, [PUBLIC, postId]);

        });
    }
}
// console.log('schedule-----',JSON.stringify(schedule.scheduledJobs));

function removeScheduleJob(postId,prefix="post_") {
    if (schedule.scheduledJobs[prefix+postId]) {
        schedule.scheduledJobs[prefix+postId].cancel();

    }


}
