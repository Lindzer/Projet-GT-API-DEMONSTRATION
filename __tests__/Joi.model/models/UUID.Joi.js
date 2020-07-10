const frisby = require('frisby');
const Joi = frisby.Joi;

module.exports = () => Joi.string().regex(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/)
