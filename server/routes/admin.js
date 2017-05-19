const express = require('express');
const router = express.Router();
const User = require('../controllers/user');
const Article = require('../controllers/article');
const checkLogin = require('../middlewares/checkLogin');
const path = require('path');




router.post('/login', User.login)
router.post('/logout', checkLogin,User.logout)
router.get('/checkLogin', User.checkLogin)
router.get('/user', User.get)


router.route('/article/:id')
        .get(Article.detail)
        .delete(Article.delete)
        .put(Article.update)
        .patch(Article.changeFlag)


router.route('/article')
      .get(Article.articleList)
      .post(Article.newArticle)

router.route('/article/image')
      .post(Article.newBanner)

router.route('/user')
      .get(User.get)
      .put(User.update)


module.exports = router;
