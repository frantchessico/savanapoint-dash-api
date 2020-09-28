const router = require('express').Router();
const OneArticlesController = require('../controllers/ArticleController')
const ArticlesController = require('../controllers/ArticlesController');
const UserHandlerController = require('../controllers/userHandlerController');
const PagesAcess = require('../controllers/pages.controller');
const UpdateUserController = require('../controllers/UpdateUserController');
const UploadImageController = require('../controllers/UploadImageController');
const guards = require('../util/guards');
const LikesAndCommentsController = require('../controllers/likesANDcommentsController');
const likesANDcommentsController = require('../controllers/likesANDcommentsController');



router.get('/', ArticlesController.index);
router.post('/user/register', UserHandlerController.createUser);
router.post('/user/google',  UserHandlerController.googleAuth);
router.post('/user/login', UserHandlerController.login);
router.post('/user/update-user', guards, UpdateUserController.updateUser);
router.post('/user/update-user/upload',  UploadImageController.uploadImage
);

router.post('/user/user-preferences',  likesANDcommentsController.chatMessage);

// router.post('/user/update-user/upload-cover',
// UploadImageController.uploadImageCover
// );


router.post('/user/update-user/email',  guards, UpdateUserController.emailUpadet);
router.post('/user/signout', UserHandlerController.signOutUser);
router.post('/reset-password', UpdateUserController.resetPassword);
router.get('/user/login', PagesAcess.loginPage);
router.get('/user',  guards, UserHandlerController.getCurrentUser);
router.get('/user/on', UpdateUserController.isOnUser);
router.get('/:slug', OneArticlesController.getOneArticle );
router.post('/articles', ArticlesController.store);
router.post('/user/update-user/delete',  guards, UpdateUserController.deleteAccount);

module.exports = router;


