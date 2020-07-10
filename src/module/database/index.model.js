const fs = require('fs');
const path = require('path');

const sequelize = require('./database');

let loResult = {};

let loDirectoriPath = path.normalize(__dirname + '/models/');

let ltFileList = fs.readdirSync(loDirectoriPath, {
  withFileTypes: true
});

for (let lsFile of ltFileList) {
  if (lsFile.isFile()) {

    let lsFileName = lsFile.name;

    let ltFileNameSplit = lsFileName.split('.');

    if (ltFileNameSplit.length == 3 && ltFileNameSplit[1] == "model" && ltFileNameSplit[2] == "js") {

      let lsModelName = ltFileNameSplit[0]
        .toLowerCase()
        .split('-')
        .reduce((lsAccumulator, lsCurrentValue) => {
          return lsAccumulator + lsCurrentValue[0].toUpperCase() + lsCurrentValue.substring(1)
        }, "")

      console.log(`load model ${lsModelName} in ${lsFileName}`);

      let loModel = require("./models/" + lsFileName);

      loResult[lsModelName] = sequelize.define('table' + lsModelName, loModel);
    }

  }
}

//relation History-User
loResult.User.hasMany(loResult.History, {
  foreignKey: {
    name: 'fkUser',
    allowNull: false
  }
});
loResult.History.belongsTo(loResult.User, {
  foreignKey: {
    name: 'fkUser',
    allowNull: false
  }
});

//relation History-Ticket
loResult.Ticket.hasMany(loResult.History, {
  foreignKey: {
    name: 'fkTicket',
    allowNull: false
  }
});
loResult.History.belongsTo(loResult.Ticket, {
  foreignKey: {
    name: 'fkTicket',
    allowNull: false
  }
});

//relation Ticket-User Creator
loResult.User.hasMany(loResult.Ticket, {
  foreignKey: {
    name: 'fkUserCreator',
    allowNull: false
  },
  as: 'Creator'
});
loResult.Ticket.belongsTo(loResult.User, {
  foreignKey: {
    name: 'fkUserCreator',
    allowNull: false
  },
  as: 'Creator'
});

//relation Ticket-User Responsible
loResult.User.hasMany(loResult.Ticket, {
  foreignKey: {
    name: 'fkUserResponsible',
    allowNull: true
  },
  as: 'Responsible'
});
loResult.Ticket.belongsTo(loResult.User, {
  foreignKey: {
    name: 'fkUserResponsible',
    allowNull: true
  },
  as: 'Responsible'
});

//relation Ticket-User Resolver
loResult.User.hasMany(loResult.Ticket, {
  foreignKey: {
    name: 'fkUserResolver',
    allowNull: true
  },
  as: 'Resolver'
});
loResult.Ticket.belongsTo(loResult.User, {
  foreignKey: {
    name: 'fkUserResolver',
    allowNull: true
  },
  as: 'Resolver'
});

sequelize.sync({
  alter: process.env.NODE_ENV !== 'production' ? {
    drop: true
  } : false
});

module.exports = loResult;
