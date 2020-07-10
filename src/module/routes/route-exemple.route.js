const express = require('express');
const db = require('../database/index.model');

let loRouter = express.Router();

loRouter.get('/', function(req, res) {
  res.json({
    result: 'success'
  });
});

module.exports = loRouter
