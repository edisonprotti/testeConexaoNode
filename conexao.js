const mysql = require('mysql2/promise');

// Configuração otimizada para o MySQL rodando na mesma instância/container do Node.js
const pool = mysql.createPool({
    // Utiliza 127.0.0.1 (IP local) pois o banco está debaixo do mesmo teto da aplicação
    host: process.env.MYSQLHOST || '127.0.0.1',
    
    // Usuário padrão do MySQL
    user: process.env.MYSQLUSER || 'root',
    
    // Lê a senha da memória do container. Substitua o valor padrão se necessário localmente
    password: process.env.MYSQLPASSWORD || 'qvaBoMQcaojxgfFXUzWRkwZqOTvMxurd',
    
    // Nome do banco de dados lógico
    database: process.env.MYSQLDATABASE || 'railway',
    
    // Porta padrão de escuta interna do MySQL
    port: parseInt(process.env.MYSQLPORT) || 3306,
    
    // Configurações de performance para gerenciamento de requisições concorrentes
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    
    // Evita quedas de protocolo em conexões persistentes
    enableKeepAlive: true,
    keepAliveInitialDelay: 10000
});

module.exports = pool;
