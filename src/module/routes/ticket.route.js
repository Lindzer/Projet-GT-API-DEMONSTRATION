const express = require('express');
const db = require('../database/index.model');

const loTicketFiltre = require('../function/ticketFiltre.fn');

let loRouter = express.Router();

loRouter.get('/', function(req, res) {
  db.Ticket.findAll({
      include: [
        'Responsible',
        'Creator',
        'Resolver'
      ]
    }).then((poTickets) => {
      poTickets = poTickets.map(loTicketFiltre.ticketFiltre)
      res.json(poTickets);
    })
    .catch(paError => {
      res.status(400)
      res.json(paError);
    })
});

loRouter.get('/:idTicket', function(req, res) {
  db.Ticket.findOne({
      where: {
        idTicket: req.params.idTicket
      },
      include: [
        'Responsible',
        'Creator',
        'Resolver',
        {
          model: db.History,
          include: [
            db.User
          ]
        }
      ]
    }).then((poTicket) => {
      res.json(loTicketFiltre.ticketFiltre(poTicket));
    })
    .catch(paError => {
      res.status(400)
      res.json(paError);
    })
});

loRouter.post('/', function(req, res) {
  db.Ticket.create({
      ticketCreation: req.body.ticketCreation,
      ticketDescription: req.body.ticketDescription,
      ticketHardware: req.body.ticketHardware,
      fkUserCreator: req.user.idUser
    }).then((poNewTicket) => {
      return db.History.create({
          historyModif: req.body.ticketCreation,
          historyDescription: req.body.ticketDescription,
          fkUser: req.user.idUser,
          fkTicket: poNewTicket.idTicket
        })
        .then(() => db.Ticket.findOne({
          where: {
            idTicket: poNewTicket.idTicket
          },
          include: [
            'Responsible',
            'Creator',
            'Resolver',
            {
              model: db.History,
              include: [
                db.User
              ]
            }
          ]
        })).then((poTicket) => {
          res.json(loTicketFiltre.ticketFiltre(poTicket));
        })
    })
    .catch(paError => {
      res.status(400)
      res.json(paError);
    })

});

loRouter.put('/:idTicket', function(req, res) {

  db.Ticket.findOne({
      where: {
        idTicket: req.params.idTicket
      }
    }).then((poTicket) => {

      req.body.modifState = !!req.body.modifState ? req.body.modifState : poTicket.ticketState

      let loPromise = db.History.create({
        historyModif: req.body.modifDate,
        historyDescription: req.body.modifDescription,
        historyState: req.body.modifState,
        fkUser: req.user.idUser,
        fkTicket: req.params.idTicket
      })

      if (poTicket.ticketState != req.body.modifState) {
        loPromise = loPromise.then(() => db.Ticket.update({
          ticketState: req.body.modifState
        }, {
          where: {
            idTicket: req.params.idTicket
          }
        }))

        if (poTicket.ticketState == 3) {
          loPromise = loPromise.then(() => db.Ticket.update({
            ticketResolve: req.body.modifDate,
            fkUserResolver: req.user.idUser
          }, {
            where: {
              idTicket: req.params.idTicket
            }
          }))
        }
      }

      return loPromise.then(() => db.Ticket.findOne({
        where: {
          idTicket: req.params.idTicket
        },
        include: [
          'Responsible',
          'Creator',
          'Resolver',
          {
            model: db.History,
            include: [
              db.User
            ]
          }
        ]
      })).then((poTicket) => {
        res.json(loTicketFiltre.ticketFiltre(poTicket));
      });
    })
    .catch(paError => {
      res.status(400)
      res.json(paError);
    })



  /*db.Ticket.update({
      idTicket: poTicket.idTicket,
      ticketResolve: poTicket.ticketResolve,
      ticketDescription: poTicket.ticketDescription,
      ticketState: poTicket.ticketState,
    })
    .then((poTicket) => {
      res.json({
      });
    });*/
});

loRouter.delete('/:idTicket', function(req, res) {
  db.Ticket.destroy({
      where: {
        idTicket: req.params.idTicket
      }
    })
    .then((result) => {
      if (result)
        res.status(204)
      else
        res.status(404);

      res.json();
    })
    .catch((err) => {
      res.status(400);
      res.json(err);
    });
});

module.exports = loRouter
