const frisby = require('frisby');
const Joi = frisby.Joi;
const UUID = require('./UUID.Joi')
const history = require('./history.Joi')

function fUser() {
  return Joi.object({
    idUser: UUID().required(),
    userLastName: Joi.string().min(2).max(100).required(),
    userFirstName: Joi.string().min(2).max(100).required()
  })
}

module.exports = () => Joi.object({
  idTicket: UUID().required(),
  ticketCreation: Joi.date().required(),
  ticketResolve: Joi.date().allow(null),
  ticketDelete: Joi.date().allow(null),
  ticketDescription: Joi.string().required(),
  ticketState: Joi.number().integer().min(0).max(4).required(),
  ticketHardware: Joi.string().min(2).max(100).required(),
  ticketCreator: fUser(),
  ticketResponsible: fUser().allow(null),
  ticketResolver: fUser().allow(null),
  ticketHistory : Joi.array().items(history()).required().allow(null)
})
