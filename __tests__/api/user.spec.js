const frisby = require('frisby');
const modelJoi = require('../Joi.model/index.Joi');
const randomElement = require('../function/randomElement.fn');

it('create User', function() {
  let newUser = randomElement.randomUser();
  let newUserReturn = Object.assign({}, newUser);

  delete newUserReturn.userPassword

  return frisby
    .post(process.env.__baseUrl__ + '/user', newUser)
    .expect('status', 200)
    .expect('jsonTypesStrict', modelJoi.user())
    .expect('json', newUserReturn);
});
