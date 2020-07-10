const frisby = require('frisby');
const Joi = frisby.Joi;
const UUID = require('./UUID.Joi')

function fUser() {
  return Joi.object({
    idUser: UUID().required(),
    userLastName: Joi.string().min(2).max(100).required(),
    userFirstName: Joi.string().min(2).max(100).required()
  })
}

module.exports = () => Joi.object({
  idHistory: UUID().required(),
  historyModif: Joi.date().required(),
  historyDescription: Joi.string().required(),
  historyState: Joi.number().integer().min(0).max(4).required(),
  historyUser: fUser()
})
