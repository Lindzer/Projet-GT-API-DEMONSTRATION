const {
  DataTypes,
  Sequelize
} = require("sequelize");

module.exports = {
  idTicket: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4
  },
  ticketCreation: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {}
  },
  ticketResolve: {
    type: DataTypes.DATE,
    allowNull: true,
    validate: {}
  },
  ticketDelete: {
    type: DataTypes.DATE,
    allowNull: true,
    validate: {}
  },
  ticketDescription: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {}
  },
  ticketState: {
    type: DataTypes.TINYINT(1),
    allowNull: false,
    defaultValue: 0,
    validate: {}
  },
  ticketHardware: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      len: [2, 100]
    }
  }
}
