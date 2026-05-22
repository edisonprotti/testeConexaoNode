const mysql = require('mysql2/promise');

// O Pool precisa ler a porta estritamente da variável de ambiente do Railway
const pool = mysql.createPool({
    host: process.env.MYSQLHOST || 'localhost',
    user: process.env.MYSQLUSER || 'root',
    password: process.env.MYSQLPASSWORD || '',
    database: process.env.MYSQLDATABASE || 'railway', // Nome padrão na nuvem
    port: parseInt(process.env.MYSQLPORT) || 3306, // Converte a string da porta para número
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;
