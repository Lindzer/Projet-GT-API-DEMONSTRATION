const express = require('express');
const db = require('../database/index.model');
const {
  uuid
} = require('uuidv4');

const loPwGestion = require('../function/pwGestion.fn');
const loRigthGestion = require('../function/rigthGestion.fn');

let loRouter = express.Router();

loRouter.post('/', loRigthGestion.filter('createUser'), function(req, res) {

  let loUser = {
    idUser: uuid(),
    userLastName: req.body.userLastName,
    userFirstName: req.body.userFirstName,
    userLogin: req.body.userLogin,
    userRight: req.token.indexOf('temp_') == 0 ? loRigthGestion.rigth('admin') : req.body.userRight,
  }

  loUser.userHash = loPwGestion.fHashPW(req.body.userPassword, loUser)

  db.User.create(loUser)
  .then(poUser => {
    res.json({
      idUser: poUser.idUser,
      userLastName: poUser.userLastName,
      userFirstName: poUser.userFirstName,
      userLogin: poUser.userLogin,
      userRight: poUser.userRight,
    });
  })
  .catch(paError => {
    res.status(400)
    res.json(paError);
  })

});

module.exports = loRouter
