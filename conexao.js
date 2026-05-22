const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'autorack.proxy.rlwy.net', // Ex: autorack.proxy.rlwy.net
    user: 'root',
    password: 'qvaBoMQcaojxgfFXUzWRkwZqOTvMxurd', // Sua senha do banco
    database: 'railway', 
    port: parseInt('12345'), // Ex: 12345
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    // Ajustes cruciais para evitar PROTOCOL_CONNECTION_LOST:
    connectTimeout: 20000, // Dá mais tempo para o Railway responder (20 segundos)
    enableKeepAlive: true, // Mantém a conexão viva em segundo plano
    keepAliveInitialDelay: 10000
});

module.exports = pool;
