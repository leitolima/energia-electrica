const mysql = require('mysql');

const connection = mysql.createConnection({
    user: 'root',
    password: '',
    host: 'localhost',
    port: '3306',
    database: 'energia_electrica',
    dateStrings: true
});

exports.db = () => {
    return {
        query: (query, params) => {
            return new Promise((resolve, reject) => {
                connection.query(query, params, (err, rows) => {
                    if(err) reject(err);
                    resolve(rows);
                })
            })
        }
    }
}