export const GET_TRANSFERS_SQL = (date, from, to) => {
    let query = "SELECT * FROM transfers AS t WHERE 1 = 1"
    if (queryArr.length === 0) query += " AND 1 = 1"
    if (queryArr.includes("date")) query += ` AND t.departure::date = '${date}'::date`
    if (queryArr.includes("from")) query += ` AND t.from = '${from.toLowerCase()}'`
    if (queryArr.includes("to")) query += ` AND t.to = '${to.toLowerCase()}'`
    return query
}
export const SELECT_TRANSFER_AND_AVAILABLE_SEATS_SQL = (transferId) => {
    return `SELECT t."transferId", 
        (c.pax -(select COUNT(*) from tickets where "transferId" = '${transferId}')) AS "availableSeats" 
        FROM transfers AS t 
        JOIN companies AS c ON c."companyId" = t."companyId"
        WHERE t."transferId" = '${transferId}'`
}
