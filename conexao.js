const mysql = require('mysql2/promise');
const mysqlServer = require('mysql-server');

let pool = null;

async function iniciarConexao() {
    if (!pool) {
        try {
            // 1. Inicia o servidor MySQL embutido na porta local 3306
            const server = mysqlServer({
                port: 3306,
                db: 'railway'
            });
            await server.start();
            console.log('✅ Servidor MySQL interno iniciado com sucesso!');

            // 2. Cria o pool de conexões apontando para o próprio container
            pool = mysql.createPool({
                host: '127.0.0.1',
                user: 'root',
                password: '', // Servidores embutidos iniciam sem senha por padrão
                database: 'railway',
                port: 3306,
                waitForConnections: true,
                connectionLimit: 5,
                queueLimit: 0
            });
        } catch (error) {
            console.error('❌ Falha ao subir o motor do MySQL interno:', error.message);
            throw error;
        }
    }
    return pool;
}

// Exportamos uma função que garante que o pool só será usado após o banco estar vivo
module.exports = {
    query: async (sql, params) => {
        const conexaoAtiva = await iniciarConexao();
        return conexaoAtiva.query(sql, params);
    }
};
