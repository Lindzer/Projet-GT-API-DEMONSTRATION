const frisby = require('frisby');
const Joi = frisby.Joi;
const UUID = require('./UUID.Joi')

module.exports = () => Joi.object({
  idUser: UUID().required(),
  userLastName: Joi.string().min(2).max(100).required(),
  userFirstName: Joi.string().min(2).max(100).required(),
  userLogin: Joi.string().min(2).max(100).required(),
  userRight: Joi.number().integer().min(0).max(10).required()
})
