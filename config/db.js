let mysql = require('mysql');

let connection = mysql.createConnection({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASSWD,
    database : process.env.DB_NAME
});

//Test connection MySQl
connection.connect(function(err) {
    if (err) return console.error('error: ' + err.message);
    console.log('Connected to the MySQL server');
});

module.exports = connection;