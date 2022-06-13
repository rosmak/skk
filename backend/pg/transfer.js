export const GET_TRANSFERS_SQL = (date, from, to) => {
    let WHERE = ""
    if (date) WHERE += ` AND tr.departure::date = '${date}'::date`
    if (from) WHERE += ` AND tr.from = '${from.toLowerCase()}'`
    if (to) WHERE += ` AND tr.to = '${to.toLowerCase()}'`
    let query = `SELECT tr."transferId", tr.from, tr.to, tr.departure, tr.arrival, tr."companyId", 
    (c.pax - (SELECT COUNT(*) FROM tickets AS t WHERE t."transferId" = tr."transferId"))::INTEGER AS "availableSeats",
    (tr.departure::timestamp > NOW()::timestamp)::BOOL as "canBuy"
    FROM transfers AS tr 
    JOIN companies AS c ON c."companyId" = tr."companyId"
    WHERE tr.departure::timestamp > NOW()::timestamp ${WHERE}`

    return query
}
export const SELECT_TRANSFER_AND_AVAILABLE_SEATS_SQL = (transferId) => {
    return `SELECT t."transferId", 
        (c.pax -(select COUNT(*) from tickets where "transferId" = '${transferId}')) AS "availableSeats" 
        FROM transfers AS t 
        JOIN companies AS c ON c."companyId" = t."companyId"
        WHERE t."transferId" = '${transferId}'`
}
