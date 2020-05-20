const express = require('express');
const router = express.Router();
const frontendController = require('../controllers/frontendController');
/**************************** GET REQUEST ******************************/
router.get('/post/:postId/:lang', frontendController.getPost);
router.get('/cat/:catId/:lang', frontendController.getCategory);
router.get('/contact/:lang?', frontendController.getContact);
router.get('/about/:lang',frontendController.getAbout);
router.get('/search/:lang',frontendController.getSearch);
router.get('/searchapi',frontendController.getSearchApi);
router.get('/staff/:lang?',frontendController.getStaff)

router.get('/:lang?',frontendController.getHome);

/**************************** POST REQUEST ******************************/
router.post('/sendmail',frontendController.sendMail);

router.post('/categories', frontendController.postAllCategory);
module.exports = router;
