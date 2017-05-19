const { User } = require('../models/');
const util = require('../utils/util');
const _ = require('lodash');

exports.login = (req,res,next) => {
  const body = req.body;
  const { username, password } = body;

  User
  .findOne({
    where: { username }
  })
  .then( (user) => {
    if(user) {
      const isMatch = user.comparePassword(password);

      if(isMatch) {

        req.session.user = user;
        res.send(util.reply(true,'登录成功',null))

      }else {

        res.send(util.reply(false,'账号或密码不正确'))

      }

    }else {

      res.send(util.reply(false,'用户不存在'))

    }
  })
  .catch( (err) => {

    console.log(err);

  })
}

exports.logout = (req,res,next) => {
  delete req.session.user;
  res.json(util.reply(true,null,'登出成功'))
}

 exports.checkLogin = (req,res,next) => {
   console.log(req.session.user);
  if(req.session.user) {

    return res.json(util.reply(true,'已登录'))
  }

  // res.clearCookie('connect.sid').end()
  return res.json(util.reply(false,'未登录'))

 }


 exports.get = (req,res,next) => {
  User
    .findOne()
    .then(result => {
      return res.json(
        util.reply(true,'ok',
          _.pick(result,'avatar', 'username','createdAt')
        )
      );
    })
    .catch(err => {
      return json(util.reply(false,'获取用户失败'))
    })
 }

 exports.update = (req,res,next) => {
   console.log(req.session.user);
  if(req.session.user) {

    return res.json(util.reply(true,'已登录'))
  }

  // res.clearCookie('connect.sid').end()
  return res.json(util.reply(false,'未登录'))

 }
