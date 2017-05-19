"use strict";




module.exports = function Article(sequelize, DataTypes) {
  var Article = sequelize.define("Article", {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    article: DataTypes.TEXT,
    flag: DataTypes.INTEGER, // post or draft
    banner:  DataTypes.STRING,
    tag: DataTypes.STRING,
    pv: DataTypes.INTEGER.UNSIGNED,
  }, {
    classMethods: {

      /**
      * @params page 页数
      * @params perPage 每页页数
       * @params 标志 0是文章，1是草稿
       */
      findAndCountByFlag (page,perPage,flag) {
        page = Number(page);
        perPage = Number(perPage);

        const baseOption = {
          offset: (page - 1) * perPage,
          limit: perPage
        }
        const option = Object.assign({},baseOption,{
          where: {
            flag
          }
        })

        if(flag) {
          // 如果传入flag查询flag
          return Article.findAndCount(option)
        }else {
          // flag为null查询所有
          return Article.findAndCount(baseOption)
        }

      }
    },
    instanceMethods: {
    }
  });


  return Article;
};
