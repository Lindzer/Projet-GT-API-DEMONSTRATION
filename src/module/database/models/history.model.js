const {
  DataTypes,
  Sequelize
} = require("sequelize");

module.exports = {
  idHistory: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4
  },
  historyModif: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {}
  },
  historyDescription: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {}
  },
  historyState: {
    type: DataTypes.TINYINT(1),
    allowNull: false,
    defaultValue: 0,
    validate: {}
  }
}
