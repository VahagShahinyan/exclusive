const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MYSQLSore = require('express-mysql-session')(session);
const options=require('./config/config').options;
const sessionStore=new MYSQLSore(options);
/************** require route ***************/
const frontendRoute=require('./routes/frontendRoute');
const backendRoute = require('./routes/backendRoute');
const jobinit= require('./middleware/job');
const upload= require('./controllers/MulterController');
const sharp= require('./controllers/SharpController').sharp;
/*************** APP *****************/
const app = express();
app.disable('x-powered-by');
app.use(function (req, res, next) {
    var str = "www.";
    if (req.hostname.indexOf(str) === 0) {
        res.redirect(301, req.protocol + "://" + req.hostname.slice(str.length) + ":80" + req.originalUrl);
        console.log(req.protocol);
        console.log(req.hostname.slice(str.length));
        console.log(req.hostname);
    } else {
        next();
    }
});
app.set('view engine', 'ejs');
app.set('views', 'viewsejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/admin/saveImages', upload,sharp);
app.use(cookieParser());
app.use(   session({
    secret: 'my_secret_key',
    resave: false,
    store:sessionStore,
    saveUninitialized: false,
}));




app.use('/admin', express.static(path.join(__dirname, 'public/backend')));
app.use( express.static(path.join(__dirname, 'public/frontend'),{ maxAge: 3600000 }));
app.use( express.static(path.join(__dirname, 'public'),{ maxAge: 3600000 }));
app.use('/admin',backendRoute);
app.use(frontendRoute);
app.listen(80,function () {
jobinit.jobInit()
});
// ----------


