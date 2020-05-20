const schedule = require('node-schedule');
const db = require('../config/database');
const PUBLIC='1';
const DRAFT='0';
const PENDING='2';
const dateTime = new Date().getTime();

exports.jobInit = (req, res, next) => {
    var GMT4 = new Date().getTime() - new Date().getTimezoneOffset() * 60 * 1000;

    console.log(dateTime);
    console.log(GMT4);
    db.execute(`UPDATE  posts SET posts.status=? where posts.date < ? and posts.status=?`, [PUBLIC, dateTime, PENDING]);
    db.execute(`SELECT id,date FROM posts where posts.status=? and posts.date > ?`, [PENDING, dateTime])
        .then(result => {


            result[0].forEach(function (item) {
                createJob(item.id, item.date)
            })
        })

}

function createJob(postId,date,prefix="post_") {
        if (schedule.scheduledJobs[prefix+postId]){
            schedule.scheduledJobs[prefix+postId].cancel();
            schedule.scheduleJob(prefix+postId, date, function (f) {
                return db.execute(` UPDATE  posts SET  status=? WHERE posts.id=? `, [PUBLIC, postId]);

            });
        }else {
            schedule.scheduleJob(prefix+postId, date, function (f) {
                return db.execute(` UPDATE  posts SET  status=? WHERE posts.id=? `, [PUBLIC, postId]);

            });
            console.log("jobs lisrt--",schedule.scheduledJobs);

        }

}
