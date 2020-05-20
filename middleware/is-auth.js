const jwt = require('jsonwebtoken');
const ACTIVE='1';
const DISABLE='0';
// module.exports = (req, res, next) => {
//
//     // const authHeader = req.get('Authorization');
//     const authHeader = req.cookies.Authorization;
//     userId
//     if (!authHeader) {
//         const error = new Error('Not authenticated.');
//         error.statusCode = 401;
//         throw error;
//     }
//     const token = authHeader.split(' ')[1];
//     let decodedToken;
//     try {
//         decodedToken = jwt.verify(token, 'secretSuperSecretSuper');
//     } catch (err) {
//         err.statusCode = 500;
//         throw err;
//     }
//     if (!decodedToken) {
//         console.log('decode false 2');
//
//         const error = new Error('Not authenticated.');
//         error.statusCode = 401;
//         throw error;
//     }
//     req.userId = decodedToken.userId;
//     next();
// };

module.exports = (req, res, next) => {


if (!req.session.isLoggedIn) {
    return res.redirect('/admin/login')
    
}
 if (req.session.isLoggedIn) {
    if (req.session.user.status == DISABLE) {
        req.session.isLoggedIn=false;
        return req.session.destroy(err => {
            return  res.redirect('/');
        });
    }
}
    next();
    
}
