const fs = require('fs');
const path = require('path')
const { multerUtil, util } = require('../utils/');
const  { Article: ArticleModel }  = require('../models/');


var upload = multerUtil.single('banner')

// 某篇文章
exports.detail = ( req, res, next ) => {
  const {id} = req.params;
  ArticleModel.findById(id).then((result) => {
    if(result) {
      res.send(util.reply(true,'ok',result))
    }else {
      res.send(util.reply(false,'没有对应的记录',result))
    }
  })
}

exports.delete = ( req, res, next ) => {
  const {id} = req.params;
  ArticleModel.findById(id).then((result) => {
    if(result) {
      result.destroy()
      res.send(util.reply(true,'删除成功'))
    }else {
      res.send(util.reply(false,'没有找到对应记录'))
    }
  })
  .catch((err) => {
    console.log(err);
    res.send(util.reply(false,'服务器错误'))
  })

}

exports.update = ( req, res, next ) => {
  const {id} = req.params;
  const { title, article,banner, description = '', tag = '' } = req.body;
  try {
    if (!title) {
      throw new Error('请填写标题');
    }
    if (!article) {
      throw new Error('请填写内容');
    }
    if (!banner) {
      throw new Error('请上传图片');
    }
  } catch (e) {
    return res.send(util.reply(false,e.message));
  }

  ArticleModel.findById(id).then((result) => {
    result.update({
      title,
      article,
      description,
      banner,
      tag
    })
    .then((article)=> res.send(util.reply(true,'更新陈宫',article)))
  })
}

exports.changeFlag = ( req, res, next ) => {
  const {id} = req.params;
  const { flag } = req.body;

  ArticleModel
  .findById(id)
  .then((result) => {
    result.update({
      flag
  })
  .then((article)=>
  {
    res.send(util.reply(true,'更新成功',article))
  })
})
}


exports.articleList = ( req, res, next ) => {
  const { page = 1, perPage = 10, flag} = req.query;

  ArticleModel.findAndCountByFlag(page,perPage,flag)
  .then( (result) =>{
    const { rows: records, count :total } = result;
    const data =  {
      records,
      total
    };

    res.send(util.reply(true,'ok',data))
  })
  .catch((err) => {
    console.log(err);
    res.send(util.reply(false,'服务器异常'))
  })
}


exports.newArticle = ( req, res, next ) => {
  const { title, article, flag, banner} = req.body;
  try {
    if (!title.length) {
      throw new Error('请填写标题');
    }
    if (!article.length) {
      throw new Error('请填写内容');
    }
    if (!flag) {
      throw new Error('请填写类型');
    }
    if (!banner.length) {
      throw new Error('没有上传图片url');
    }
  } catch (e) {
    return res.send(util.reply(false,e.message));
  }

  ArticleModel.create(req.body)
  .then( (article) => {
    res.send(util.reply(true,'创建成功',article))
  })
}


exports.newBanner = ( req, res, next ) => {
  upload(req, res,function(err){
    res.send(util.reply(true,'创建成功',{banner: req.file.path}))
    if(err) console.log(err);
  })
}
