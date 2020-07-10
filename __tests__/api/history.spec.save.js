const frisby = require('frisby');
const url = 'http://localhost:3000/API/'
const modelJoi = require('../Joi.model/models/history.Joi');


it ('GET All History', function () {
  return frisby
    .get(url + 'history')
    .expect('status', 200).expect('jsonTypes', modelJoi);
});
/*
it ('GET By Id History', function () {
  return frisby
    .get(url + 'history/6350dc3e-29c1-4508-b99f-7dc4d49a1099')
    .expect('status', 200).expect('jsonTypes', modelJoi);
});
*/
it ('POST By Id History', function () {
  return frisby
    .post(url + 'history', {
      historyModif  : '2020-07-15 22:00:00',
      historyDescription : 'description',
      historyState : '1'
    })
    .expect('status', 200).expect('jsonTypes', modelJoi);
});
/*
it ('PUT By Id History', function () {
  return frisby
    .put(url + 'history/6350dc3e-29c1-4508-b99f-7dc4d49a1099', {
      historyModif  : '2020-07-15 23:00:00',
      historyDescription : 'description',
      historyState : '2'
    })
    .expect('status', 200).expect('jsonTypes', modelJoi);
});

it ('DELETE By Id History', function () {
  return frisby
    .del(url + 'history/d728bf53-2f34-4301-b64e-b286e3d0ddc7')
    .expect('status', 200).expect('jsonTypes', modelJoi);
});*/
