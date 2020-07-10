const frisby = require('frisby');
const Joi = frisby.Joi
const modelJoi = require('../Joi.model/index.Joi');
const randomElement = require('../function/randomElement.fn');

let ticket = null

it('create Ticket', function() {
  let newTicket = randomElement.randomTicket();

  return frisby
    .post(process.env.__baseUrl__ + '/ticket', newTicket)
    .expect('status', 200)
    .expect('jsonTypesStrict', modelJoi.ticket())
    // .expect('json', newTicket)
    .then((poRes) => {
      ticket = poRes.json
    })
})


it('update Ticket by ID', function() {
  if (ticket) {
    return frisby
      .put(process.env.__baseUrl__ + '/ticket/' + ticket.idTicket, {
        modifDate: Date.now(),
        modifDescription: randomElement.randomText(),
        modifState: 2
      })
      .expect('status', 200)
      .expect('jsonTypesStrict', modelJoi.ticket())
    // .expect('json', newTicket)
  }
})

it('GET Ticket by ID', function() {
  if (ticket) {
    
    return frisby
      .get(process.env.__baseUrl__ + '/ticket/' + ticket.idTicket)
      .expect('status', 200)
      .expect('jsonTypesStrict', modelJoi.ticket())
  }
});

it('GET All Ticket', function() {
  return frisby
    .get(process.env.__baseUrl__ + '/ticket')
    .expect('status', 200)
    .expect('jsonTypesStrict', Joi.array().items(modelJoi.ticket()))
});
