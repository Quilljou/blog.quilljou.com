const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');
const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname,'..','config','config.json'))[env]

const database = new Sequelize(config.database.database,config.database.username,config.database.password,config.database.config)


var db = {}


fs
  .readdirSync(__dirname)
  .filter( (file) => {
    return ((file.indexOf(".") !== 0) && (file !== 'index.js'));
  })
  .forEach( (file) => {
    var model = database.import(path.join(__dirname,file));
    db[model.name] = model;
  })

// Object.keys(db).forEach( (modelName) => {
//     if ("associate" in db[modelName]) {
//        db[modelName].associate(db);
//    }
// })




db.database = database;
// db.Sequelize = Sequelize;



module.exports = db;
