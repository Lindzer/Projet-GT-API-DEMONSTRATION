const express = require('express');
const crypto = require('crypto');

const db = require("../database/index.model");
const loPwGestion = require('../function/pwGestion.fn');
const goErrorList = require('../error.list');

const pnTokenValidity = 3600000; // durée en ms

let goConnectedTokens = {};

let gsTempsTokens = null;

function fDeleteToken(psToken) {
  console.log(`delete token => ${psToken}`);
  delete goConnectedTokens[psToken];
}

function fTestToken(psToken) {
  return new Promise((pResolve, pReject) => {
    if (!!goConnectedTokens[psToken]) {
      clearTimeout(goConnectedTokens[psToken].timeout);

      goConnectedTokens[psToken].timeout = setTimeout(fDeleteToken, pnTokenValidity, psToken);

      db.User.findOne({
        where: {
          idUser: goConnectedTokens[psToken].user
        }
      }).then(pResolve)

    } else return pResolve();
  })

  return lPromise;
}

function fCreateConnectedToken(poUser) {
  return new Promise((pResolve, pReject) => {
    try {
      let lsSecret = Date.now().toString();
      let lsHash = crypto.createHmac('sha512', lsSecret)
        .update(Date.now().toString() + JSON.stringify(poUser) + Date.now())
        .digest('hex');

      lsSecret = Date.now().toString();
      lsHash = crypto.createHmac('sha512', lsSecret)
        .update(Date.now().toString() + lsHash + poUser.idUser + Date.now())
        .digest('hex');
      lsSecret = Date.now().toString();
      let lsHash2 = crypto.createHmac('sha512', lsSecret)
        .update(Date.now().toString() + Math.random() + Date.now())
        .digest('hex');

      let psToken = lsHash + Date.now() + lsHash2;

      let lsHash3 = crypto.createHmac('sha512', lsSecret)
        .update(psToken)
        .digest('hex');

      psToken = lsHash + Date.now() + lsHash2 + Date.now() + lsHash3;

      let loConnectedToken = {};
      loConnectedToken.token = psToken;
      loConnectedToken.user = poUser.idUser;
      loConnectedToken.timeout = setTimeout(fDeleteToken, pnTokenValidity, psToken);

      goConnectedTokens[psToken] = loConnectedToken;

      pResolve(psToken);
    } catch (e) {
      pReject(e)
    }
  });
}

function fCreateTempToken() {
  return new Promise((pResolve, pReject) => {
    try {
      let lsSecret = Date.now().toString();
      let lsHash = crypto.createHmac('sha512', lsSecret)
        .update(Date.now().toString() + Math.random() + Date.now())
        .digest('hex');

      gsTempsTokens = 'temp_' + lsHash + Date.now()

      pResolve(gsTempsTokens);
    } catch (e) {
      pReject(e)
    }
  });
}

function fConnect(req, res) {
  return db.User.count({})
    .then(pnCount => {
      if (pnCount)
        return db.User.findOne({
          where: {
            userLogin: req.body.userLogin
          }
        }).then(poUser => {
          if (poUser) {
            let lsHash = loPwGestion.fHashPW(req.body.userPassword, poUser);
            if (poUser.userHash == lsHash) {
              return fCreateConnectedToken(poUser).then(psToken => {
                res.json({
                  token: psToken
                });
              })
            } else throw Error(goErrorList.badPW);
          } else throw Error(goErrorList.badLogin);
        })
      else if (req.body.userPassword == "root" && req.body.userLogin == "root") {
        return fCreateTempToken().then(psToken => {
          res.json({
            token: psToken
          });
        })
      } else throw Error(goErrorList.badLogin);

    })
}

function fDisconnect(req, res) {
  return new Promise((pResolve, pReject) => {

    let psToken = req.headers['token'];

    if (goConnectedTokens[psToken] instanceof Object) {
      clearTimeout(goConnectedTokens[psToken].timeout);
      fDeleteToken(psToken)
    }

    pResolve();
  });
}

let goRouter = express.Router();

let goAuthentificationRouter = express.Router();

goAuthentificationRouter.post('/login', (req, res) => {
  if (req.body.userLogin != null && req.body.userPassword != null) {
    fConnect(req, res).catch(err => {
      res.json({
        error: err.message
      });
    });
  } else
    res.json({
      error: goErrorList.badData
    });
})


goAuthentificationRouter.use('/disconnect', (req, res) => {
  fDisconnect(req, res).then(() => {
      res.json({
        result: "disconnected"
      });
    })
    .catch(err => {
      // a ajouter filtre erreur
      res.json({
        error: err.message
      });
    });
})

goRouter.use("/authentification", goAuthentificationRouter);

goRouter.use("/", (req, res, next) => {
  let psToken = req.headers['token'];

  if (!!gsTempsTokens) {
    if (gsTempsTokens == psToken && req.method == 'POST') {
      let ltPath = req.path.split("/")

      if (ltPath[ltPath.length - 1] == "user") {
        req.token = psToken;
        gsTempsTokens = null;
        next();
      } else {
        res.json({
          error: goErrorList.badToken
        });
      }
    } else {
      res.json({
        error: goErrorList.badToken
      });
    }
  } else if (psToken) {
    fTestToken(psToken).then(poUser => {
      if (poUser == null) {
        res.json({
          error: goErrorList.badToken
        });
      } else {
        req.user = poUser;
        req.token = psToken;
        next();
      }
    }).catch(err => {
      if (process.env.NODE_ENV === 'production') {
        res.json({
          error: 'error'
        });
      } else {
        res.json({
          error: err.message
        });
      }
    });
  } else {
    if (process.env.NODE_ENV === 'production') {
      res.json({
        error: goErrorList.noAuth
      });
    } else {
      db.User.findOne({
        where: {}
      }).then(user => {
        if (user) {
          req.user = user.id;
          req.psToken = null;
          next();

        } else {
          req.user = '';
          req.psToken = null;
          next();
        }
      })
    }
  }
});

module.exports = goRouter;
