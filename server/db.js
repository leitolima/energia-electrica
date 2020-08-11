const mysql = require('mysql');

const connection = mysql.createPool({
    connectionLimit : 10,
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
            console.log('/--------/ DEBUG USE /---------/');
            console.log(query);
            return new Promise((resolve, reject) => {
                connection.query(query, params, (err, rows) => {
                    if(err) reject(err);
                    resolve(rows);
                });
            })
        }
    }
}
/*
    console.log('-------CONNECTION ENDING-------')
                connection.end();
*/