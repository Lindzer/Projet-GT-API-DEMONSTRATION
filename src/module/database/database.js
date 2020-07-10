const {
  Sequelize
} = require('sequelize');

const fs = require('fs');
const path = require('path');

const loDefaultParameter = {
  bdd: 'ticket',
  login: 'ticket',
  pw: 'ticket',
  host: 'localhost',
  port: null,
  dialect: 'mysql',
  logging: process.env.NODE_ENV !== 'production'
}


let loConfigData = {}

let loConfigDataPath = path.normalize(__dirname + '/../../database.config.json');

if (fs.existsSync(loConfigDataPath))
  loConfigData = require('../../database.config.json');

let loConfig = Object.assign({}, loDefaultParameter, loConfigData)

let loParameter = {
  host: loConfig.host,
  dialect: loConfig.dialect,
  logging: loConfig.logging,
  port: loConfig.port
}

module.exports = new Sequelize(loConfig.bdd, loConfig.login, loConfig.pw, loParameter);
