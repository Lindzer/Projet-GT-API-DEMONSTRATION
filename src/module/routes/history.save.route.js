const express = require('express');
const db = require('../database/index.model');

let loRouter = express.Router();

loRouter.get('/', function(req, res) {
  db.History.findAll().then((historys) => {
    historys = historys.map(history => {
      return {
        idHistory: history.idHistory,
        historyModif: history.historyModif,
        historyDescription: history.historyDescription,
        historyState: history.historyState
      }
    })
    res.json(historys);
  });
});

loRouter.get('/:idHistory', function(req, res) {
  db.History.findOne({
    where: {
      idHistory: req.params.idHistory
    }
  }).then((history) => {
    res.json({
      idHistory: history.idHistory,
      historyModif: history.historyModif,
      historyDescription: history.historyDescription,
      historyState: history.historyState
    });
  });
});

loRouter.post('/', function(req, res) {
  db.History.create(req.body)
    .then((history) => {
      res.json({
        idHistory: history.idHistory,
        historyModif: history.historyModif,
        historyDescription: history.historyDescription,
        historyState: history.historyState
      });
    });
});

loRouter.put('/:idHistory', function(req, res) {
  db.History.update({
      where: {
        idHistory: req.params.idHistory
      }
    })
    .then((history) => {
      res.json({
        idHistory: history.idHistory,
        historyModif: history.historyModif,
        historyDescription: history.historyDescription,
        historyState: history.historyState
      });
    });
});

loRouter.delete('/:idHistory', function(req, res) {
  db.History.destroy({
      where: {
        idHistory: req.params.idHistory
      }
    })
    .then((history) => {
      res.json({
        result: 'success'
      });
    });
});

module.exports = loRouter
