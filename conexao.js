const mysql = require('mysql2/promise');

// Configuração direta para a rede interna protegida do Railway
const pool = mysql.createPool({
    host: 'mysql.railway.internal', // O host interno que funcionou no PHP
    user: 'root',
    password: 'qvaBoMQcaojxgfFXUzWRkwZqOTvMxurd', // A senha do seu banco
    database: 'railway', // Nome do banco padrão na nuvem
    port: 3306, // Porta interna padrão do container MySQL
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;
