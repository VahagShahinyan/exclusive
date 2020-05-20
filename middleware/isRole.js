const jwt = require('jsonwebtoken');
const ACTIVE='1';
const DISABLE='0';
module.exports = (req, res, next) => {



    if (req.session.isLoggedIn) {

        if (req.session.user.user_role !==1){
            return  res.redirect('/admin');
        }

    }
    next();

}
