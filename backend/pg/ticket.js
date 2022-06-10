export const SELECT_USER_TICKETS_SQL = (userId) => {
    return `SELECT tc."ticketId", t."transferId", t.from, t.to, t.departure, t.arrival FROM tickets AS tc
    JOIN transfers AS t ON t."transferId" = tc."transferId" 
    WHERE tc."userId" = '${userId}'`
}

export const SELECT_TICKET_BY_ID_SQL = (ticketId) => {
    return `SELECT tc."ticketId", t.departure FROM tickets AS tc 
    JOIN transfers AS t ON t."transferId" = tc."transferId" 
    WHERE tc."ticketId" = '${ticketId}'`
}

export const INSERT_TICKET_SQL = (userId, transferId) => {
    return `INSERT INTO tickets
    ("userId", "transferId")
    VALUES('${userId}', '${transferId}') RETURNING "ticketId"`
}

export const DELETE_TICKET_SQL = (ticketId) => {
    return `DELETE FROM tickets WHERE "ticketId" = '${ticketId}' RETURNING "ticketId"`
}
