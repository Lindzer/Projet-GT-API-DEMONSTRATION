const {
  DataTypes,
  Sequelize
} = require("sequelize");

module.exports = {
  idUser: {
    type: DataTypes.UUID,
    primaryKey: true
  },
  userLastName: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      len: [2, 100]
    }
  },
  userFirstName: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      len: [2, 100]
    }
  },
  userLogin: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      len: [2, 100]
    }
  },
  userRight: {
    type: DataTypes.TINYINT(1),
    allowNull: false,
    defaultValue: 0,
    validate: {}
  },
  userHash: {
    type: DataTypes.CHAR(128),
    allowNull: false
  }
}
