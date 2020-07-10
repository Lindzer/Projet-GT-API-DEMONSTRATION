const frisby = require('frisby');

const url = 'http://localhost:3000/API/'

//Get all table
/*
it ('GET All Ticket', function () {
  return frisby
    .get(url + 'ticket')
    .expect('status', 200);
});

it ('GET All User', function () {
  return frisby
    .get(url + 'user')
    .expect('status', 200);
});

it ('GET All History', function () {
  return frisby
    .get(url + 'history')
    .expect('status', 200);
});

//Get element by id

it ('GET By Id Ticket', function () {
  return frisby
    .get(url + 'ticket/921747be-bdc7-4936-b885-45ef2131c6be')
    .expect('status', 200);
});

it ('GET By Id User', function () {
  return frisby
    .get(url + 'user/1')
    .expect('status', 200);
});

it ('GET By Id History', function () {
  return frisby
    .get(url + 'history/6350dc3e-29c1-4508-b99f-7dc4d49a1099')
    .expect('status', 200);
});

// Post by id

it ('POST By Id Ticket', function () {
  return frisby
    .post(url + 'ticket', {
      ticketCreation : '2020-07-15 22:00:00',
      ticketDescription : 'description',
      ticketState : '1',
      ticketHardware : 'hardware'
    })
    .expect('status', 200);
});

it ('POST By Id User', function () {
  return frisby
    .post(url + 'user/1', {
      userLastName  : '',
      userFirstName : '',
      userLogin : '',
      userHash : ''
    })
    .expect('status', 200);
});

it ('POST By Id History', function () {
  return frisby
    .post(url + 'history', {
      historyModif  : '2020-07-15 22:00:00',
      historyDescription : 'description',
      historyState : '1'
    })
    .expect('status', 200);
});

// Put by id

it ('PUT By Id Ticket', function () {
  return frisby
    .put(url + 'ticket/921747be-bdc7-4936-b885-45ef2131c6be', {
      ticketCreation : '2020-07-15 22:00:00',
      ticketResolve : '2020-07-15 23:00:00',
      ticketDescription : 'description',
      ticketState : '2',
      ticketHardware : 'hardware'
    })
    .expect('status', 200);
});

it ('PUT By Id User', function () {
  return frisby
    .put(url + 'user/1', {
      userLastName  : '',
      userFirstName : '',
      userLogin : '',
      userHash : ''
    })
    .expect('status', 200);
});

it ('PUT By Id History', function () {
  return frisby
    .put(url + 'history/6350dc3e-29c1-4508-b99f-7dc4d49a1099', {
      historyModif  : '2020-07-15 23:00:00',
      historyDescription : 'description',
      historyState : '2'
    })
    .expect('status', 200);
});

// Put by id

it ('DELETE By Id Ticket', function () {
  return frisby
    .del(url + 'ticket/f9f34e74-600b-4e14-9eae-9d2bf7763079')
    .expect('status', 204);
});

it ('DELETE By Id User', function () {
  return frisby
    .del(url + 'user/1')
    .expect('status', 204);
});


it ('DELETE By Id History', function () {
  return frisby
    .del(url + 'history/d728bf53-2f34-4301-b64e-b286e3d0ddc7')
    .expect('status', 204);
});*/
