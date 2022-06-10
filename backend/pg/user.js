export const SELECT_USER_BY_EMAIL_SQL = (email) => {
    return `SELECT * FROM users AS u WHERE u.email = '${email}' LIMIT 1`
}

export const INSERT_USER_SQL = (name, email, password) => {
    return `INSERT INTO users (name, email, password) VALUES ('${name}', '${email}', '${password}') RETURNING "userId";`
}

export const SELECT_USER_BY_EMAIL_AND_PASSWORD_SQL = (email, password) => {
    return `SELECT * FROM users AS u WHERE u.email = '${email}' AND u.password = '${password}' LIMIT 1`
}
