console.log(process.env.NODE_ENV ? process.env.NODE_ENV : "developpement");

const express =  require('express');
const bodyParser = require('body-parser');

//recupération des routes
const goRouting = require('./module/routing');
const goAuthentification = require('./module/authentification/authentification.middelware');

const db = require('./module/database/index.model.js');

// Création d'un serveur web avec express
const goApp = express();

// Gérer le cross-origins
const cors = require('cors');

goApp.use(bodyParser.json());

goApp.use(bodyParser.urlencoded({
  extended: true
}));

goApp.use(cors());

goApp.use('/API', goAuthentification);
goApp.use('/API', goRouting);

if (process.env.NODE_ENV !== 'production') {
  const listEndpoints = require('express-list-endpoints')
  console.log(listEndpoints(goApp));
}

// Lancer le serveur sur le port 3000
module.exports = goApp.listen(3000, function() {
  console.log('#### Server launch on port : 3000')
});
