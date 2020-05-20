const express = require('express');
const router = express.Router();
const  authController= require('../controllers/backend/authController');
const categoryController=require('../controllers/backend/categoryController');
const dashboardController = require('../controllers/backend/dashboardController');
const postController = require('../controllers/backend/postController');
const userController = require('../controllers/backend/userController');
const aboutController= require('../controllers/backend/aboutController');
const bannerController = require('../controllers/backend/bannerController');

const { body } = require('express-validator/check');
const User = require('../models/user');
const isAuth = require('../middleware/is-auth');
const isRole = require('../middleware/isRole');
/**************** dashboard ROUTE ******************************/
router.get('/',isAuth, dashboardController.dashboard);
/**************** POST ROUTE ******************************/
router.get('/posts',isAuth, postController.getAllPost);
router.get('/post/create',isAuth,postController.getPostCreate);
router.get('/post/:postId/edit',isAuth,postController.getEditPost);
router.post('/posts/:page?',isAuth,postController.sendingPostData);
router.post('/post/create',isAuth, postController.postPostCreate);
router.put('/post/update',isAuth,postController.updatePost);
router.delete('/post/',isAuth,postController.deletePost);
router.post('/getimages/:page?',isAuth,postController.postSendingPostData);
/**************** Category ROUTE ******************************/
router.get('/category/',isAuth,categoryController.getCategory);
router.post('/category/',isAuth,categoryController.postCreateCategory);
router.get('/category/edit/:id',isAuth,categoryController.getCategoryEdit);
router.post('/category/update',isAuth,categoryController.postUpdateCategory);
/**************** REGISTER ROUTE ******************************/
router.get('/login',authController.getLogin);
router.post('/login', authController.signin);
router.post('/logout', isAuth,authController.postLogout);
router.post('/register',isAuth,isRole, [
        body('email')
            .isEmail()
            .withMessage('Please enter a valid email')
            .custom(value => {
                return User.findUserByEmail(value)
                    .then(userDoc => {
                        if (userDoc[0].length>0) {

                            return Promise.reject('E-mail address already exists');
                        }
                    });
            }).normalizeEmail(),
        body('password').trim().isLength({ min: 5 }),
        body('name').trim().not().isEmpty()
    ],authController.signup);
/**************** USER ROUTE ******************************/
router.get('/register',isAuth,isRole,userController.getRegister);
router.get('/users',isAuth,isRole,userController.getUsers);
router.get('/allusers',isAuth,userController.getAllUsers);
router.get('/users/edit/:userId',isAuth,isRole,userController.getEditUser);
router.post('/users/update',isAuth,isRole,userController.updateUser);

/**************** About ROUTE ******************************/

router.get('/page/about',isAuth,aboutController.getAbout);
router.get('/page/about/:id',isAuth,aboutController.getEdit);
router.post('/page/about/create',isAuth,aboutController.postCreateAbout);
router.post('/page/about/update',isAuth,aboutController.postUpdateAbout);


/**************** Banner ROUTE ******************************/
router.get('/page/banner/:id',isAuth,bannerController.getBanner);
router.get('/page/banner/create',isAuth,bannerController.createBanner);
router.get('/page/banner',isAuth,bannerController.getAllBanner);

//
router.post('/page/banner/update/img',isAuth,bannerController.postUpdateBannerImg);
router.post('/page/banner/update/html',isAuth,bannerController.postUpdateBannerHtml);
// router.post('page/banner/:id/delete',isAuth,bannerController.deleteBanner);


module.exports = router;



