const { util } = require('../utils/');


module.exports = (req,res,next)  => {
 if(req.session.user) {
   next()
 }
  res.json(util.reply(false,'未登录'))
}
