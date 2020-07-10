const crypto = require('crypto');

function randomText() {
  return crypto.createHash('md5').update('' + Date.now() + Math.random()).digest('hex');
}

function randomUser() {
  return {
    userLastName: randomText(),
    userFirstName: randomText(),
    userLogin: randomText(),
    userRight: Math.round(Math.random() * 10),
    userPassword: randomText(),
  }
}

function randomTicket() {
  return {
    ticketCreation: Date.now(),
    ticketDescription: randomText(),
    ticketHardware: randomText(),
  }
}

module.exports = {
  randomText: randomText,
  randomUser: randomUser,
  randomTicket: randomTicket
}
