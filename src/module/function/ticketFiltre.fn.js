module.exports = {
  ticketFiltre: (poTicket) => {
    let poTicketResult = {}

    poTicketResult.idTicket = poTicket.idTicket

    poTicketResult.ticketCreation = poTicket.ticketCreation

    poTicketResult.ticketResolve = poTicket.ticketResolve

    poTicketResult.ticketDelete = poTicket.ticketDelete

    poTicketResult.ticketDescription = poTicket.ticketDescription

    poTicketResult.ticketState = poTicket.ticketState

    poTicketResult.ticketHardware = poTicket.ticketHardware

    poTicketResult.ticketHistory = !!poTicket.tableHistories ? poTicket.tableHistories.map(poHistory => {
      return {
        idHistory: poHistory.idHistory,
        historyModif: poHistory.historyModif,
        historyDescription: poHistory.historyDescription,
        historyState: poHistory.historyState,
        historyUser: {
          idUser: poHistory.tableUser.idUser,
          userLastName: poHistory.tableUser.userLastName,
          userFirstName: poHistory.tableUser.userFirstName
        }
      }
    }) : null

    poTicketResult.ticketCreator = {
      idUser: poTicket.Creator.idUser,
      userLastName: poTicket.Creator.userLastName,
      userFirstName: poTicket.Creator.userFirstName
    }

    poTicketResult.ticketResolver = !!poTicket.Resolver ? {
      idUser: poTicket.Resolver.idUser,
      userLastName: poTicket.Resolver.userLastName,
      userFirstName: poTicket.Resolver.userFirstName
    } : null

    poTicketResult.ticketResponsible = !!poTicket.Responsible ? {
      idUser: poTicket.Responsible.idUser,
      userLastName: poTicket.Responsible.userLastName,
      userFirstName: poTicket.Responsible.userFirstName
    } : null

    // {
    //       "idTicket": "02676ef7-ca2d-48cb-a183-33ac55b307ff",
    //       "ticketCreation": "2020-07-09T07:20:37.000Z",
    //       "ticketResolve": null,
    //       "ticketDelete": null,
    //       "ticketDescription": "23dc7d871bad140c83c482f54b20a885",
    //       "ticketState": 0,
    //       "ticketHardware": "58efcf5b7893963f3354ec371ad5b16e",
    //       "Responsible": null,
    //       "Creator": {
    //           "idUser": "a57198af-555a-49fd-8eef-1ac9b5b96fcd",
    //           "userLastName": "test",
    //           "userFirstName": "test"
    //       },
    //       "Resolver": null
    //   }

    return poTicketResult;
  }
}
